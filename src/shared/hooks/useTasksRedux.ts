// useTasksRedux Hook - 任務 Redux 狀態管理 Hook

import { mockTasks } from '@/shared/mocks'
import { AppDispatch } from '@/shared/store'
import {
  selectAvailableTasks,
  selectCreateTaskError,
  selectCreateTaskLoading,
  selectCurrentTask,
  selectCurrentTaskError,
  selectCurrentTaskLoading,
  selectFilteredAndSortedTasks,
  selectTaskFilter,
  selectTaskOperations,
  // Selectors
  selectTasks,
  selectTasksError,
  selectTasksLoading,
  selectTaskSort,
  selectTaskStats,
} from '@/shared/store/selectors/tasksSelectors'
import {
  acceptTaskError,
  acceptTaskStart,
  acceptTaskSuccess,
  applyForTaskError,
  applyForTaskStart,
  applyForTaskSuccess,
  cancelTaskError,
  cancelTaskStart,
  cancelTaskSuccess,
  clearTaskFilter,
  completeTaskError,
  completeTaskStart,
  completeTaskSuccess,
  createTaskStart,
  createTaskSuccess,
  fetchTaskDetailError,
  fetchTaskDetailStart,
  fetchTaskDetailSuccess,
  fetchTasksError,
  // Actions
  fetchTasksStart,
  fetchTasksSuccess,
  removeTask,
  resetCreateTaskState,
  resetTaskOperations,
  resetTasksState,
  selectTerminatorError,
  selectTerminatorStart,
  selectTerminatorSuccess,
  setTaskFilter,
  setTaskSort,
  TaskFilter,
  TaskSort,
  updateTask,
  withdrawApplicationError,
  withdrawApplicationStart,
  withdrawApplicationSuccess,
} from '@/shared/store/slices/tasksSlice'
import { Task, TaskApplication } from '@/shared/types'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/**
 * 任務 Redux 管理 Hook
 * 提供任務相關的狀態管理和操作函數
 */
export const useTasksRedux = () => {
  const dispatch = useDispatch<AppDispatch>()

  // ===== 基礎狀態選擇器 =====
  const tasks = useSelector(selectTasks)
  const tasksLoading = useSelector(selectTasksLoading)
  const tasksError = useSelector(selectTasksError)

  const currentTask = useSelector(selectCurrentTask)
  const currentTaskLoading = useSelector(selectCurrentTaskLoading)
  const currentTaskError = useSelector(selectCurrentTaskError)

  const filter = useSelector(selectTaskFilter)
  const sort = useSelector(selectTaskSort)

  const createTaskLoading = useSelector(selectCreateTaskLoading)
  const createTaskError = useSelector(selectCreateTaskError)

  const operations = useSelector(selectTaskOperations)

  // ===== 任務載入函數 =====
  const loadTasks = useCallback(async () => {
    try {
      // 如果已經有任務資料，就不重新載入假資料（避免覆蓋新發布的任務）
      if (tasks && tasks.length > 0) {
        return
      }

      dispatch(fetchTasksStart())

      // 模擬 API 呼叫 - 目前使用假資料
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 添加測試用的 pending 任務供終結者測試
      const testPendingTask = {
        id: `test_pending_${Date.now()}`,
        title: '測試任務 - 家中蟑螂問題',
        description: '廚房發現蟑螂，需要專業除蟲服務，希望盡快處理',
        pestType: 'cockroach' as const,
        location: {
          latitude: 25.0330,
          longitude: 121.5654,
          city: '台北市',
          district: '大安區',
        },
        status: 'pending' as const,
        priority: 'urgent' as const,
        budget: 1500,
        isImmediate: false,
        createdBy: '1', // 小怕星發布
        applicants: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
      // 合併假資料和測試任務
      const allTasks = [...mockTasks, testPendingTask]
      dispatch(fetchTasksSuccess(allTasks))
    } catch (error) {
      dispatch(fetchTasksError(error instanceof Error ? error.message : '載入任務失敗'))
    }
  }, [dispatch, tasks])

  const loadTaskDetail = useCallback(
    async (taskId: string) => {
      try {
        dispatch(fetchTaskDetailStart())

        // 模擬 API 呼叫
        await new Promise(resolve => setTimeout(resolve, 300))
        const task = mockTasks.find(t => t.id === taskId)

        if (task) {
          dispatch(fetchTaskDetailSuccess(task))
        } else {
          dispatch(fetchTaskDetailError('找不到指定的任務'))
        }
      } catch (error) {
        dispatch(fetchTaskDetailError(error instanceof Error ? error.message : '載入任務詳情失敗'))
      }
    },
    [dispatch]
  )

  // ===== 任務創建函數 =====
  const createTask = useCallback(
    async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'applicants'>) => {
      try {
        dispatch(createTaskStart())

        // 模擬 API 呼叫
        await new Promise(resolve => setTimeout(resolve, 800))

        const taskId = `task_${Date.now()}`
        const now = new Date()

        // 為測試目的，自動添加兩個終結者的申請
        const testApplicants = [
          {
            id: `app_${Date.now()}_1`,
            taskId: taskId,
            terminatorId: '2', // 李師傅除蟲專家
            appliedAt: now,
            status: 'pending' as const
          },
          {
            id: `app_${Date.now()}_2`,
            taskId: taskId,
            terminatorId: '3', // 陳師傅專業除蟲
            appliedAt: new Date(now.getTime() + 5000), // 5秒後申請
            status: 'pending' as const
          }
        ]

        // 創建新任務
        const newTask: Task = {
          ...taskData,
          id: taskId,
          status: 'pending_confirmation', // 有申請者時設為待確認狀態
          applicants: testApplicants,
          createdAt: now,
          updatedAt: now,
        }
        console.log('newTask', newTask)
        dispatch(createTaskSuccess(newTask))
        return newTask
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '創建任務失敗'
        dispatch(createTaskError(errorMessage))
        throw error
      }
    },
    [dispatch]
  )

  // ===== 任務操作函數 =====
  const acceptTask = useCallback(
    async (taskId: string, terminatorId: string) => {
      try {
        dispatch(acceptTaskStart())

        // 模擬 API 呼叫
        await new Promise(resolve => setTimeout(resolve, 500))

        dispatch(acceptTaskSuccess({ taskId, terminatorId }))
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '接受任務失敗'
        dispatch(acceptTaskError(errorMessage))
        throw new Error(errorMessage)
      }
    },
    [dispatch]
  )

  const selectTerminator = useCallback(
    async (taskId: string, terminatorId: string) => {
      try {
        dispatch(selectTerminatorStart())

        // 模擬 API 呼叫
        await new Promise(resolve => setTimeout(resolve, 500))

        dispatch(selectTerminatorSuccess({ taskId, terminatorId }))
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '選擇終結者失敗'
        dispatch(selectTerminatorError(errorMessage))
        throw new Error(errorMessage)
      }
    },
    [dispatch]
  )

  const completeTask = useCallback(
    async (taskId: string, completedBy: 'fear_star' | 'terminator') => {
      try {
        dispatch(completeTaskStart())

        // 模擬 API 呼叫
        await new Promise(resolve => setTimeout(resolve, 500))

        // 第一次確認完成
        dispatch(completeTaskSuccess({ taskId, completedBy }))

        // 為測試目的，自動讓另一方也確認完成
        setTimeout(async () => {
          const otherParty = completedBy === 'fear_star' ? 'terminator' : 'fear_star'
          console.log(`自動觸發 ${otherParty} 確認完成`)
          
          // 模擬另一方確認完成
          await new Promise(resolve => setTimeout(resolve, 1000))
          dispatch(completeTaskSuccess({ taskId, completedBy: otherParty }))
        }, 2000) // 2秒後自動觸發另一方確認
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '標記完成失敗'
        dispatch(completeTaskError(errorMessage))
        throw new Error(errorMessage)
      }
    },
    [dispatch]
  )

  const cancelTask = useCallback(
    async (taskId: string) => {
      try {
        dispatch(cancelTaskStart())

        // 模擬 API 呼叫
        await new Promise(resolve => setTimeout(resolve, 500))

        dispatch(cancelTaskSuccess(taskId))
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '取消任務失敗'
        dispatch(cancelTaskError(errorMessage))
        throw new Error(errorMessage)
      }
    },
    [dispatch]
  )

  const applyForTask = useCallback(
    async (taskId: string, terminatorId: string) => {
      try {
        dispatch(applyForTaskStart())

        // 模擬 API 呼叫
        await new Promise(resolve => setTimeout(resolve, 500))

        // 創建新申請
        const newApplication: TaskApplication = {
          id: `app_${Date.now()}`,
          taskId,
          terminatorId,
          appliedAt: new Date(),
          status: 'pending',
        }

        dispatch(applyForTaskSuccess({ taskId, application: newApplication }))

        // 為測試目的，自動讓小怕星選擇該終結者
        setTimeout(async () => {
          console.log('自動觸發小怕星選擇終結者')
          
          // 模擬小怕星選擇終結者
          await new Promise(resolve => setTimeout(resolve, 1000))
          dispatch(selectTerminatorStart())
          
          await new Promise(resolve => setTimeout(resolve, 500))
          dispatch(selectTerminatorSuccess({ taskId, terminatorId }))
        }, 2000) // 2秒後自動選擇終結者
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '申請任務失敗'
        dispatch(applyForTaskError(errorMessage))
        throw new Error(errorMessage)
      }
    },
    [dispatch]
  )

  const withdrawApplication = useCallback(
    async (taskId: string, applicationId: string) => {
      try {
        dispatch(withdrawApplicationStart())

        // 模擬 API 呼叫
        await new Promise(resolve => setTimeout(resolve, 500))

        dispatch(withdrawApplicationSuccess({ taskId, applicationId }))
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '撤回申請失敗'
        dispatch(withdrawApplicationError(errorMessage))
        throw new Error(errorMessage)
      }
    },
    [dispatch]
  )

  // ===== 篩選與排序函數 =====
  const setFilter = useCallback(
    (newFilter: Partial<TaskFilter>) => {
      dispatch(setTaskFilter(newFilter))
    },
    [dispatch]
  )

  const clearFilter = useCallback(() => {
    dispatch(clearTaskFilter())
  }, [dispatch])

  const setSortOrder = useCallback(
    (newSort: TaskSort) => {
      dispatch(setTaskSort(newSort))
    },
    [dispatch]
  )

  // ===== 重置函數 =====
  const resetState = useCallback(() => {
    dispatch(resetTasksState())
  }, [dispatch])

  const resetOperations = useCallback(() => {
    dispatch(resetTaskOperations())
  }, [dispatch])

  const resetCreateState = useCallback(() => {
    dispatch(resetCreateTaskState())
  }, [dispatch])

  // ===== 更新與移除函數 =====
  const updateTaskData = useCallback(
    (task: Task) => {
      dispatch(updateTask(task))
    },
    [dispatch]
  )

  const removeTaskData = useCallback(
    (taskId: string) => {
      dispatch(removeTask(taskId))
    },
    [dispatch]
  )

  // ===== 便捷選擇器 =====
  const availableTasks = useSelector(selectAvailableTasks)
  const filteredAndSortedTasks = useSelector(selectFilteredAndSortedTasks)
  const taskStats = useSelector(selectTaskStats)

  return {
    // 基礎狀態
    tasks,
    tasksLoading,
    tasksError,
    currentTask,
    currentTaskLoading,
    currentTaskError,
    filter,
    sort,
    createTaskLoading,
    createTaskError,
    operations,

    // 載入函數
    loadTasks,
    loadTaskDetail,

    // 創建函數
    createTask,

    // 操作函數
    acceptTask,
    selectTerminator,
    completeTask,
    cancelTask,
    applyForTask,
    withdrawApplication,

    // 篩選與排序
    setFilter,
    clearFilter,
    setSortOrder,

    // 重置函數
    resetState,
    resetOperations,
    resetCreateState,

    // 更新與移除
    updateTaskData,
    removeTaskData,

    // 便捷選擇器
    availableTasks,
    filteredAndSortedTasks,
    taskStats,
  }
}

export default useTasksRedux
