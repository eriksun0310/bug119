import { useMemo, useEffect } from 'react'
import { useTasksRedux } from './useTasksRedux'
import { mockUsers } from '@/shared/mocks'
import { User, UserRole } from '@/shared/types'
import { useSelector } from 'react-redux'
import { RootState } from '@/shared/store'
import { selectTaskById, selectCurrentTask } from '@/shared/store/selectors/tasksSelectors'

/**
 * 任務詳情邏輯 Hook
 * 負責處理任務資料查找和相關用戶資訊
 */
export const useTaskDetailLogic = (taskId: string, currentUser: User | null) => {
  const { loadTaskDetail, loadTasks } = useTasksRedux()
  
  // 首先嘗試從任務列表中獲取，如果沒有則從 currentTask 獲取
  const taskFromList = useSelector((state: RootState) => selectTaskById(state, taskId))
  const currentTask = useSelector(selectCurrentTask)
  
  // 優先使用任務列表中的資料，如果沒有則使用 currentTask
  const task = taskFromList || (currentTask?.id === taskId ? currentTask : null)
  
  // 載入任務詳情
  useEffect(() => {
    // 確保有載入所有任務
    loadTasks()
    
    if (taskId && !task) {
      loadTaskDetail(taskId)
    }
  }, [taskId, task, loadTaskDetail, loadTasks])

  // 調試：記錄任務資料狀態
  useEffect(() => {
    if (__DEV__) {
      console.log('useTaskDetailLogic - taskId:', taskId)
      console.log('useTaskDetailLogic - task:', task)
      console.log('useTaskDetailLogic - taskFromList:', taskFromList)
      console.log('useTaskDetailLogic - currentTask:', currentTask)
    }
  }, [taskId, task, taskFromList, currentTask])

  // 查找客戶資料
  const customer = useMemo(() => 
    task ? mockUsers.find(u => u.id === task.createdBy) : null, 
    [task?.createdBy]
  )

  // 查找終結者資料
  const terminator = useMemo(() => 
    task?.assignedTo ? mockUsers.find(u => u.id === task.assignedTo) : null, 
    [task?.assignedTo]
  )

  // 決定聯絡人資訊
  const contactInfo = useMemo(() => {
    if (!currentUser || !task) return null

    const contactPerson = currentUser.role === UserRole.FEAR_STAR ? terminator : customer
    const contactTitle = currentUser.role === UserRole.FEAR_STAR ? '終結者資訊' : '小怕星資訊'

    return {
      person: contactPerson,
      title: contactTitle
    }
  }, [currentUser, terminator, customer, task])

  return {
    task,
    customer,
    terminator,
    contactInfo
  }
}