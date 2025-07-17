import { useMemo } from 'react'
import { mockTasks, mockUsers } from '@/shared/mocks'
import { User, UserRole } from '@/shared/types'

/**
 * 任務詳情邏輯 Hook
 * 負責處理任務資料查找和相關用戶資訊
 */
export const useTaskDetailLogic = (taskId: string, currentUser: User | null) => {
  // 查找任務資料
  const task = useMemo(() => 
    mockTasks.find(t => t.id === taskId) || mockTasks[0], 
    [taskId]
  )

  // 查找客戶資料
  const customer = useMemo(() => 
    mockUsers.find(u => u.id === task.createdBy), 
    [task.createdBy]
  )

  // 查找終結者資料
  const terminator = useMemo(() => 
    task.assignedTo ? mockUsers.find(u => u.id === task.assignedTo) : null, 
    [task.assignedTo]
  )

  // 決定聯絡人資訊
  const contactInfo = useMemo(() => {
    if (!currentUser) return null

    const contactPerson = currentUser.role === UserRole.FEAR_STAR ? terminator : customer
    const contactTitle = currentUser.role === UserRole.FEAR_STAR ? '終結者資訊' : '小怕星資訊'

    return {
      person: contactPerson,
      title: contactTitle
    }
  }, [currentUser, terminator, customer])

  return {
    task,
    customer,
    terminator,
    contactInfo
  }
}