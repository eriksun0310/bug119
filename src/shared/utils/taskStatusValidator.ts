import { TaskStatus, UserRole } from '@/shared/types'

/**
 * 任務狀態驗證工具
 * 提供統一的狀態驗證邏輯，語義清晰
 */
export const taskStatusValidator = {
  /**
   * 判斷是否可以接受任務
   */
  canAcceptTask: (taskStatus: TaskStatus, userRole: UserRole): boolean => {
    return taskStatus === TaskStatus.PENDING && userRole === UserRole.TERMINATOR
  },

  /**
   * 判斷是否可以選擇終結者
   */
  canSelectTerminator: (taskStatus: TaskStatus, userRole: UserRole): boolean => {
    return taskStatus === TaskStatus.PENDING_CONFIRMATION && userRole === UserRole.FEAR_STAR
  },

  /**
   * 判斷是否可以標記任務完成
   */
  canMarkCompleted: (taskStatus: TaskStatus): boolean => {
    return taskStatus === TaskStatus.IN_PROGRESS
  },

  /**
   * 判斷是否應該顯示聯絡資訊
   */
  shouldShowContactInfo: (taskStatus: TaskStatus): boolean => {
    return taskStatus === TaskStatus.IN_PROGRESS
  },

  /**
   * 判斷是否應該顯示申請者列表
   */
  shouldShowApplicantsList: (taskStatus: TaskStatus, userRole: UserRole, hasApplicants: boolean): boolean => {
    return taskStatus === TaskStatus.PENDING_CONFIRMATION && 
           userRole === UserRole.FEAR_STAR && 
           hasApplicants
  },

  /**
   * 判斷是否應該顯示聯絡人資訊
   */
  shouldShowContactPerson: (taskStatus: TaskStatus, userRole: UserRole, hasAssignments: boolean): boolean => {
    return taskStatus !== TaskStatus.PENDING || 
           userRole === UserRole.TERMINATOR ||
           (userRole === UserRole.FEAR_STAR && hasAssignments)
  },

  /**
   * 判斷是否應該顯示空狀態
   */
  shouldShowEmptyState: (taskStatus: TaskStatus, userRole: UserRole, hasApplicants: boolean): boolean => {
    return taskStatus === TaskStatus.PENDING && 
           userRole === UserRole.FEAR_STAR && 
           !hasApplicants
  }
}