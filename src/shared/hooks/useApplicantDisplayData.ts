import { useMemo } from 'react'
import { mockUsers, mockUserProfiles } from '@/shared/mocks'
import { TaskStatus, UserRole, TaskAssignment } from '@/shared/types'

interface UseApplicantDisplayDataProps {
  application?: any
  assignment?: TaskAssignment
  taskStatus: TaskStatus
  currentUserRole: UserRole
  currentUserId: string
  taskCreatedBy: string
}

/**
 * 申請者顯示資料邏輯 Hook
 * 負責根據任務狀態和用戶角色決定顯示哪個用戶的資料
 */
export const useApplicantDisplayData = ({
  application,
  assignment,
  taskStatus,
  currentUserRole,
  currentUserId,
  taskCreatedBy
}: UseApplicantDisplayDataProps) => {
  // 決定要顯示的用戶
  const displayUser = useMemo(() => {
    if (application) {
      // 根據狀態和角色決定顯示誰的資料
      if (taskStatus === TaskStatus.IN_PROGRESS || taskStatus === TaskStatus.COMPLETED) {
        // IN_PROGRESS 或 COMPLETED 狀態：顯示對方的資料
        if (currentUserRole === UserRole.FEAR_STAR) {
          // 小怕星看終結者
          return mockUsers.find(u => u.id === application.terminatorId)
        } else {
          // 終結者看小怕星
          return mockUsers.find(u => u.id === taskCreatedBy)
        }
      } else if (taskStatus === TaskStatus.PENDING_CONFIRMATION) {
        // PENDING_CONFIRMATION 狀態：雙方都看對方的資料
        if (currentUserRole === UserRole.FEAR_STAR) {
          // 小怕星看終結者
          return mockUsers.find(u => u.id === application.terminatorId)
        } else {
          // 終結者看小怕星
          return mockUsers.find(u => u.id === taskCreatedBy)
        }
      } else {
        // PENDING 狀態：顯示終結者資料
        return mockUsers.find(u => u.id === application.terminatorId)
      }
    }
    
    if (assignment) {
      // IN_PROGRESS 狀態：顯示對方的資料
      if (currentUserRole === UserRole.FEAR_STAR) {
        return mockUsers.find(u => u.id === assignment.terminatorId)
      } else {
        return mockUsers.find(u => u.id === currentUserId)
      }
    }
    
    return null
  }, [application, assignment, taskStatus, currentUserRole, currentUserId, taskCreatedBy])

  // 獲取用戶詳細資料
  const userProfile = useMemo(() => 
    displayUser ? mockUserProfiles[displayUser.id as keyof typeof mockUserProfiles] : null,
    [displayUser]
  )

  // 決定是否顯示聯絡資訊
  const shouldShowContactInfo = useMemo(() => 
    taskStatus === TaskStatus.IN_PROGRESS,
    [taskStatus]
  )

  return {
    displayUser,
    userProfile,
    shouldShowContactInfo
  }
}