import { useMemo, useState, useEffect } from 'react'
import { mockTasks, mockUsers } from '@/shared/mocks'
import { User, UserRole } from '@/shared/types'

/**
 * 任務詳情邏輯 Hook
 * 負責處理任務資料查找和相關用戶資訊
 */


// TODO:這個改成 RTK Query 的方式
export const useTaskDetailLogic = (taskId: string, currentUser: User | null) => {
  // 使用 state 來強制重新渲染
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  
  // 設定定期檢查任務狀態更新
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTrigger(prev => prev + 1)
    }, 1000) // 每秒檢查一次
    
    return () => clearInterval(interval)
  }, [])
  
  // 查找任務資料（加入 refreshTrigger 依賴）
  const task = useMemo(() => {
    const foundTask = mockTasks.find(t => t.id === taskId)
    // 如果任務不存在（已被刪除），返回 null 而不是預設任務
    return foundTask || null
  }, [taskId, refreshTrigger])

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