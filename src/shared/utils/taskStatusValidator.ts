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
    return taskStatus === TaskStatus.IN_PROGRESS || taskStatus === TaskStatus.PENDING_COMPLETION
  },

  /**
   * 判斷是否應該顯示聯絡資訊（依據新業務邏輯）
   * 只有在 IN_PROGRESS 狀態下才能看到對方完整聯絡資訊
   */
  shouldShowContactInfo: (taskStatus: TaskStatus): boolean => {
    return taskStatus === TaskStatus.IN_PROGRESS
  },

  /**
   * 判斷是否可以查看對方個人資料
   * 依據業務邏輯：
   * - PENDING: 終結者只能看到小怕星基本資料
   * - PENDING_CONFIRMATION: 小怕星可查看申請者完整個人資料
   * - IN_PROGRESS: 雙方都能查看對方完整聯絡資訊
   * - COMPLETED: 恢復基本資料可見性
   */
  canViewFullProfile: (taskStatus: TaskStatus, userRole: UserRole, isViewingApplicant: boolean = false): boolean => {
    switch (taskStatus) {
      case TaskStatus.PENDING:
        // PENDING 狀態：終結者只能看到小怕星基本資料（不含聯絡方式）
        return false
      case TaskStatus.PENDING_CONFIRMATION:
        // PENDING_CONFIRMATION 狀態：小怕星可查看申請者完整個人資料
        return userRole === UserRole.FEAR_STAR && isViewingApplicant
      case TaskStatus.IN_PROGRESS:
        // IN_PROGRESS 狀態：雙方都能查看對方完整聯絡資訊
        return true
      case TaskStatus.PENDING_COMPLETION:
        // PENDING_COMPLETION 狀態：維持 IN_PROGRESS 的權限
        return true
      case TaskStatus.COMPLETED:
        // COMPLETED 狀態：恢復基本資料可見性
        return false
      case TaskStatus.CANCELLED:
        // CANCELLED 狀態：恢復基本資料可見性
        return false
      default:
        return false
    }
  },

  /**
   * 判斷是否應該顯示完成確認狀態
   */
  shouldShowCompletionStatus: (taskStatus: TaskStatus): boolean => {
    return taskStatus === TaskStatus.PENDING_COMPLETION
  },

  /**
   * 判斷當前用戶是否已確認完成
   */
  isUserConfirmed: (
    taskStatus: TaskStatus, 
    userRole: UserRole, 
    completionStatus?: { fearStarConfirmed: boolean; terminatorConfirmed: boolean }
  ): boolean => {
    if (taskStatus !== TaskStatus.PENDING_COMPLETION || !completionStatus) {
      return false
    }
    
    if (userRole === UserRole.FEAR_STAR) {
      return completionStatus.fearStarConfirmed
    } else {
      return completionStatus.terminatorConfirmed
    }
  },

  /**
   * 判斷對方是否已確認完成
   */
  isOtherPartyConfirmed: (
    taskStatus: TaskStatus, 
    userRole: UserRole, 
    completionStatus?: { fearStarConfirmed: boolean; terminatorConfirmed: boolean }
  ): boolean => {
    if (taskStatus !== TaskStatus.PENDING_COMPLETION || !completionStatus) {
      return false
    }
    
    if (userRole === UserRole.FEAR_STAR) {
      return completionStatus.terminatorConfirmed
    } else {
      return completionStatus.fearStarConfirmed
    }
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
  },

  /**
   * 取得任務狀態的中文顯示文字
   * @param taskStatus 任務狀態
   * @param userRole 使用者角色（可選）
   * @returns 狀態顯示文字
   */
  getStatusDisplayText: (taskStatus: TaskStatus, userRole?: UserRole): string => {
    switch (taskStatus) {
      case TaskStatus.PENDING:
        return '待接案'
      case TaskStatus.PENDING_CONFIRMATION:
        // 根據角色顯示不同文字
        if (userRole === UserRole.FEAR_STAR) {
          return '待選擇' // 小怕星需要選擇終結者
        } else if (userRole === UserRole.TERMINATOR) {
          return '等待確認' // 終結者等待被選中
        }
        return '待確認'
      case TaskStatus.IN_PROGRESS:
        return '進行中'
      case TaskStatus.PENDING_COMPLETION:
        // 根據角色顯示不同文字
        if (userRole === UserRole.FEAR_STAR) {
          return '待驗收' // 小怕星需要驗收確認
        } else if (userRole === UserRole.TERMINATOR) {
          return '待確認完成' // 終結者等待完成確認
        }
        return '待完成確認'
      case TaskStatus.COMPLETED:
        return '已完成'
      case TaskStatus.CANCELLED:
        return '已取消'
      default:
        return '未知狀態'
    }
  }
}