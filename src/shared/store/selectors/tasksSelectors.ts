// Tasks Selectors - 任務狀態選擇器

import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../index'
import { TaskFilter, TaskSort } from '../slices/tasksSlice'
import { Task, TaskStatus, TaskPriority, PestType } from '@/shared/types'

// ===== 基礎選擇器 =====

// 任務列表狀態
export const selectTasks = (state: RootState) => state.tasks.tasks.data
export const selectTasksLoading = (state: RootState) => state.tasks.tasks.loading
export const selectTasksError = (state: RootState) => state.tasks.tasks.error

// 當前任務詳情狀態
export const selectCurrentTask = (state: RootState) => state.tasks.currentTask.data
export const selectCurrentTaskLoading = (state: RootState) => state.tasks.currentTask.loading
export const selectCurrentTaskError = (state: RootState) => state.tasks.currentTask.error

// 篩選與排序狀態
export const selectTaskFilter = (state: RootState) => state.tasks.filter
export const selectTaskSort = (state: RootState) => state.tasks.sort

// 創建任務狀態
export const selectCreateTaskLoading = (state: RootState) => state.tasks.createTask.loading
export const selectCreateTaskError = (state: RootState) => state.tasks.createTask.error

// 任務操作狀態
export const selectTaskOperations = (state: RootState) => state.tasks.operations

// ===== 計算型選擇器 =====

// 可用任務（狀態為 PENDING 的任務）
export const selectAvailableTasks = createSelector(
  [selectTasks],
  (tasks) => {
    if (!tasks) return []
    return tasks.filter(task => task.status === TaskStatus.PENDING)
  }
)

// 根據篩選條件和排序設定過濾並排序任務
export const selectFilteredAndSortedTasks = createSelector(
  [selectTasks, selectTaskFilter, selectTaskSort],
  (tasks, filter, sort) => {
    if (!tasks) return []

    // 篩選任務
    let filteredTasks = tasks.filter(task => {
      // 狀態篩選
      if (filter.status && filter.status.length > 0) {
        if (!filter.status.includes(task.status)) return false
      }

      // 優先程度篩選
      if (filter.priority && filter.priority.length > 0) {
        if (!filter.priority.includes(task.priority)) return false
      }

      // 害蟲類型篩選
      if (filter.pestType && filter.pestType.length > 0) {
        if (!filter.pestType.includes(task.pestType)) return false
      }

      // 城市篩選
      if (filter.city && task.location.city !== filter.city) {
        return false
      }

      // 區域篩選
      if (filter.district && task.location.district !== filter.district) {
        return false
      }

      // 預算範圍篩選
      if (filter.minBudget && task.budget < filter.minBudget) {
        return false
      }
      if (filter.maxBudget && task.budget > filter.maxBudget) {
        return false
      }

      // 是否緊急篩選
      if (filter.isImmediate !== undefined && task.isImmediate !== filter.isImmediate) {
        return false
      }

      // 創建者篩選
      if (filter.createdBy && task.createdBy !== filter.createdBy) {
        return false
      }

      // 指派對象篩選
      if (filter.assignedTo && task.assignedTo !== filter.assignedTo) {
        return false
      }

      return true
    })

    // 排序任務
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
          // 優先程度排序：VERY_URGENT > URGENT > NORMAL
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

// 任務統計資料
export const selectTaskStats = createSelector(
  [selectTasks],
  (tasks) => {
    if (!tasks) {
      return {
        total: 0,
        pending: 0,
        pendingConfirmation: 0,
        inProgress: 0,
        pendingCompletion: 0,
        completed: 0,
        byPriority: {
          normal: 0,
          urgent: 0,
          veryUrgent: 0,
        },
        byPestType: {} as Record<PestType, number>,
      }
    }

    const stats = {
      total: tasks.length,
      pending: 0,
      pendingConfirmation: 0,
      inProgress: 0,
      pendingCompletion: 0,
      completed: 0,
      byPriority: {
        normal: 0,
        urgent: 0,
        veryUrgent: 0,
      },
      byPestType: {} as Record<PestType, number>,
    }

    // 初始化害蟲類型統計
    Object.values(PestType).forEach(pestType => {
      stats.byPestType[pestType] = 0
    })

    tasks.forEach(task => {
      // 按狀態統計
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
        case TaskStatus.PENDING_COMPLETION:
          stats.pendingCompletion++
          break
        case TaskStatus.COMPLETED:
          stats.completed++
          break
      }

      // 按優先程度統計
      switch (task.priority) {
        case TaskPriority.NORMAL:
          stats.byPriority.normal++
          break
        case TaskPriority.URGENT:
          stats.byPriority.urgent++
          break
        case TaskPriority.VERY_URGENT:
          stats.byPriority.veryUrgent++
          break
      }

      // 按害蟲類型統計
      stats.byPestType[task.pestType]++
    })

    return stats
  }
)

// 根據用戶角色獲取相關任務
export const selectTasksByUserRole = createSelector(
  [selectTasks, (_: RootState, userId: string, userRole: string) => ({ userId, userRole })],
  (tasks, { userId, userRole }) => {
    if (!tasks) return []

    if (userRole === 'fear_star') {
      // 小怕星：顯示自己創建的任務
      return tasks.filter(task => task.createdBy === userId)
    } else if (userRole === 'terminator') {
      // 蟲蟲終結者：顯示自己申請或被指派的任務
      return tasks.filter(task => 
        task.assignedTo === userId || 
        task.applicants.some(app => app.terminatorId === userId)
      )
    }

    return []
  }
)

// 根據任務狀態分組任務
export const selectTasksByStatus = createSelector(
  [selectTasks],
  (tasks) => {
    if (!tasks) return {}

    const grouped: Record<TaskStatus, Task[]> = {
      [TaskStatus.PENDING]: [],
      [TaskStatus.PENDING_CONFIRMATION]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.PENDING_COMPLETION]: [],
      [TaskStatus.COMPLETED]: [],
      [TaskStatus.CANCELLED]: [],
    }

    tasks.forEach(task => {
      grouped[task.status].push(task)
    })

    return grouped
  }
)

// 根據ID獲取特定任務
export const selectTaskById = createSelector(
  [selectTasks, (_: RootState, taskId: string) => taskId],
  (tasks, taskId) => {
    if (!tasks) return null
    return tasks.find(task => task.id === taskId) || null
  }
)