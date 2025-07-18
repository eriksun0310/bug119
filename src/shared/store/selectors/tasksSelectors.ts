// Tasks Selectors - 任務狀態選擇器

import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../index'
import { Task, TaskStatus, TaskPriority, PestType, UserRole } from '@/shared/types'
import { TaskFilter, TaskSort } from '../slices/tasksSlice'

// ===== 基礎選擇器 =====

// 取得任務狀態
export const selectTasksState = (state: RootState) => state.tasks

// 取得任務列表
export const selectTasks = (state: RootState) => state.tasks.tasks.data || []
export const selectTasksLoading = (state: RootState) => state.tasks.tasks.loading
export const selectTasksError = (state: RootState) => state.tasks.tasks.error

// 取得當前任務詳情
export const selectCurrentTask = (state: RootState) => state.tasks.currentTask.data
export const selectCurrentTaskLoading = (state: RootState) => state.tasks.currentTask.loading
export const selectCurrentTaskError = (state: RootState) => state.tasks.currentTask.error

// 取得篩選條件
export const selectTaskFilter = (state: RootState) => state.tasks.filter
export const selectTaskSort = (state: RootState) => state.tasks.sort

// 取得創建任務狀態
export const selectCreateTaskLoading = (state: RootState) => state.tasks.createTask.loading
export const selectCreateTaskError = (state: RootState) => state.tasks.createTask.error

// 取得任務操作狀態
export const selectTaskOperations = (state: RootState) => state.tasks.operations

// ===== 組合選擇器 =====

// 依據 ID 取得特定任務
export const selectTaskById = createSelector(
  [selectTasks, (_: RootState, taskId: string) => taskId],
  (tasks, taskId) => tasks.find(task => task.id === taskId)
)

// 依據狀態篩選任務
export const selectTasksByStatus = createSelector(
  [selectTasks, (_: RootState, status: TaskStatus) => status],
  (tasks, status) => tasks.filter(task => task.status === status)
)

// 依據用戶角色和 ID 篩選任務
export const selectUserTasks = createSelector(
  [selectTasks, (_: RootState, userId: string, userRole: UserRole) => ({ userId, userRole })],
  (tasks, { userId, userRole }) => {
    if (userRole === UserRole.FEAR_STAR) {
      // 小怕星：返回自己創建的任務
      return tasks.filter(task => task.createdBy === userId)
    } else if (userRole === UserRole.TERMINATOR) {
      // 終結者：返回已指派給自己的任務或已申請的任務
      return tasks.filter(task => 
        task.assignedTo === userId || 
        task.applicants.some(applicant => applicant.terminatorId === userId)
      )
    }
    return []
  }
)

// 取得可用任務（終結者可申請的任務）
export const selectAvailableTasks = createSelector(
  [selectTasks],
  (tasks) => tasks.filter(task => 
    task.status === TaskStatus.PENDING && 
    !task.assignedTo
  )
)

// 取得待確認任務（小怕星需要選擇終結者的任務）
export const selectPendingConfirmationTasks = createSelector(
  [selectTasks, (_: RootState, fearStarId: string) => fearStarId],
  (tasks, fearStarId) => tasks.filter(task => 
    task.status === TaskStatus.PENDING_CONFIRMATION && 
    task.createdBy === fearStarId &&
    task.applicants.length > 0
  )
)

// 取得進行中的任務
export const selectActiveTasksForUser = createSelector(
  [selectTasks, (_: RootState, userId: string, userRole: UserRole) => ({ userId, userRole })],
  (tasks, { userId, userRole }) => {
    if (userRole === UserRole.FEAR_STAR) {
      return tasks.filter(task => 
        task.createdBy === userId && 
        task.status === TaskStatus.IN_PROGRESS
      )
    } else if (userRole === UserRole.TERMINATOR) {
      return tasks.filter(task => 
        task.assignedTo === userId && 
        task.status === TaskStatus.IN_PROGRESS
      )
    }
    return []
  }
)

// 取得已完成的任務
export const selectCompletedTasksForUser = createSelector(
  [selectTasks, (_: RootState, userId: string, userRole: UserRole) => ({ userId, userRole })],
  (tasks, { userId, userRole }) => {
    if (userRole === UserRole.FEAR_STAR) {
      return tasks.filter(task => 
        task.createdBy === userId && 
        task.status === TaskStatus.COMPLETED
      )
    } else if (userRole === UserRole.TERMINATOR) {
      return tasks.filter(task => 
        task.assignedTo === userId && 
        task.status === TaskStatus.COMPLETED
      )
    }
    return []
  }
)

// 依據篩選條件和排序篩選任務
export const selectFilteredAndSortedTasks = createSelector(
  [selectTasks, selectTaskFilter, selectTaskSort],
  (tasks, filter, sort) => {
    let filteredTasks = [...tasks]

    // 應用篩選條件
    if (filter.status && filter.status.length > 0) {
      filteredTasks = filteredTasks.filter(task => 
        filter.status!.includes(task.status)
      )
    }

    if (filter.priority && filter.priority.length > 0) {
      filteredTasks = filteredTasks.filter(task => 
        filter.priority!.includes(task.priority)
      )
    }

    if (filter.pestType && filter.pestType.length > 0) {
      filteredTasks = filteredTasks.filter(task => 
        filter.pestType!.includes(task.pestType)
      )
    }

    if (filter.city) {
      filteredTasks = filteredTasks.filter(task => 
        task.location.city === filter.city
      )
    }

    if (filter.district) {
      filteredTasks = filteredTasks.filter(task => 
        task.location.district === filter.district
      )
    }

    if (filter.minBudget !== undefined) {
      filteredTasks = filteredTasks.filter(task => 
        task.budget >= filter.minBudget!
      )
    }

    if (filter.maxBudget !== undefined) {
      filteredTasks = filteredTasks.filter(task => 
        task.budget <= filter.maxBudget!
      )
    }

    if (filter.isImmediate !== undefined) {
      filteredTasks = filteredTasks.filter(task => 
        task.isImmediate === filter.isImmediate
      )
    }

    if (filter.createdBy) {
      filteredTasks = filteredTasks.filter(task => 
        task.createdBy === filter.createdBy
      )
    }

    if (filter.assignedTo) {
      filteredTasks = filteredTasks.filter(task => 
        task.assignedTo === filter.assignedTo
      )
    }

    // 應用排序
    filteredTasks.sort((a, b) => {
      let comparison = 0

      switch (sort.field) {
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        case 'updatedAt':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          break
        case 'budget':
          comparison = a.budget - b.budget
          break
        case 'priority':
          // 優先程度排序：very_urgent > urgent > normal
          const priorityOrder = {
            [TaskPriority.VERY_URGENT]: 3,
            [TaskPriority.URGENT]: 2,
            [TaskPriority.NORMAL]: 1,
          }
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority]
          break
        default:
          comparison = 0
      }

      return sort.order === 'asc' ? comparison : -comparison
    })

    return filteredTasks
  }
)

// 取得任務統計資訊
export const selectTaskStats = createSelector(
  [selectTasks],
  (tasks) => {
    const stats = {
      total: tasks.length,
      pending: 0,
      pendingConfirmation: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0,
      byPriority: {
        [TaskPriority.NORMAL]: 0,
        [TaskPriority.URGENT]: 0,
        [TaskPriority.VERY_URGENT]: 0,
      },
      byPestType: {
        [PestType.COCKROACH]: 0,
        [PestType.ANT]: 0,
        [PestType.MOSQUITO]: 0,
        [PestType.SPIDER]: 0,
        [PestType.OTHER]: 0,
      },
    }

    tasks.forEach(task => {
      // 統計狀態
      switch (task.status) {
        case TaskStatus.PENDING:
          stats.pending++
          break
        case TaskStatus.PENDING_CONFIRMATION:
          stats.pendingConfirmation++
          break
        case TaskStatus.IN_PROGRESS:
          stats.inProgress++
          break
        case TaskStatus.COMPLETED:
          stats.completed++
          break
        case TaskStatus.CANCELLED:
          stats.cancelled++
          break
      }

      // 統計優先程度
      stats.byPriority[task.priority]++

      // 統計害蟲類型
      stats.byPestType[task.pestType]++
    })

    return stats
  }
)

// 取得用戶的任務統計
export const selectUserTaskStats = createSelector(
  [selectTasks, (_: RootState, userId: string, userRole: UserRole) => ({ userId, userRole })],
  (tasks, { userId, userRole }) => {
    let userTasks: Task[] = []

    if (userRole === UserRole.FEAR_STAR) {
      userTasks = tasks.filter(task => task.createdBy === userId)
    } else if (userRole === UserRole.TERMINATOR) {
      userTasks = tasks.filter(task => 
        task.assignedTo === userId || 
        task.applicants.some(applicant => applicant.terminatorId === userId)
      )
    }

    const stats = {
      total: userTasks.length,
      pending: 0,
      pendingConfirmation: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0,
      totalEarnings: 0, // 只對終結者有意義
      totalSpent: 0, // 只對小怕星有意義
    }

    userTasks.forEach(task => {
      switch (task.status) {
        case TaskStatus.PENDING:
          stats.pending++
          break
        case TaskStatus.PENDING_CONFIRMATION:
          stats.pendingConfirmation++
          break
        case TaskStatus.IN_PROGRESS:
          stats.inProgress++
          break
        case TaskStatus.COMPLETED:
          stats.completed++
          if (userRole === UserRole.TERMINATOR && task.assignedTo === userId) {
            stats.totalEarnings += task.budget
          } else if (userRole === UserRole.FEAR_STAR && task.createdBy === userId) {
            stats.totalSpent += task.budget
          }
          break
        case TaskStatus.CANCELLED:
          stats.cancelled++
          break
      }
    })

    return stats
  }
)

// 檢查用戶是否可以對任務執行特定操作
export const selectCanUserPerformTaskAction = createSelector(
  [
    (_: RootState, taskId: string, userId: string, userRole: UserRole, action: string) => 
      ({ taskId, userId, userRole, action }),
    selectTasks
  ],
  ({ taskId, userId, userRole, action }, tasks) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return false

    switch (action) {
      case 'accept':
        // 終結者可以接受狀態為 PENDING 的任務
        return userRole === UserRole.TERMINATOR && 
               task.status === TaskStatus.PENDING && 
               !task.assignedTo

      case 'apply':
        // 終結者可以申請狀態為 PENDING 的任務（如果還沒申請過）
        return userRole === UserRole.TERMINATOR && 
               task.status === TaskStatus.PENDING && 
               !task.applicants.some(applicant => applicant.terminatorId === userId)

      case 'selectTerminator':
        // 小怕星可以為自己創建的待確認任務選擇終結者
        return userRole === UserRole.FEAR_STAR && 
               task.createdBy === userId && 
               task.status === TaskStatus.PENDING_CONFIRMATION && 
               task.applicants.length > 0

      case 'markCompleted':
        // 小怕星和終結者都可以標記自己相關的進行中任務為完成
        if (task.status !== TaskStatus.IN_PROGRESS) return false
        
        if (userRole === UserRole.FEAR_STAR) {
          return task.createdBy === userId && 
                 (!task.completionStatus?.fearStarConfirmed)
        } else if (userRole === UserRole.TERMINATOR) {
          return task.assignedTo === userId && 
                 (!task.completionStatus?.terminatorConfirmed)
        }
        return false

      case 'cancel':
        // 小怕星可以取消自己創建的未完成任務
        return userRole === UserRole.FEAR_STAR && 
               task.createdBy === userId && 
               task.status !== TaskStatus.COMPLETED && 
               task.status !== TaskStatus.CANCELLED

      case 'edit':
        // 小怕星可以編輯自己創建的 PENDING 狀態任務
        return userRole === UserRole.FEAR_STAR && 
               task.createdBy === userId && 
               task.status === TaskStatus.PENDING

      default:
        return false
    }
  }
)