/**
 * Bug 119 業務規則配置檔案
 * 定義任務狀態管理、權限控制、通知機制等業務邏輯
 */

import { TaskStatus } from '../types/entities/task.types'
import { UserRole } from '../types/entities/user.types'

/**
 * 任務狀態轉換規則
 */
export const TASK_STATE_TRANSITIONS = {
  [TaskStatus.PENDING]: [TaskStatus.PENDING_CONFIRMATION],
  [TaskStatus.PENDING_CONFIRMATION]: [TaskStatus.IN_PROGRESS],
  [TaskStatus.IN_PROGRESS]: [TaskStatus.COMPLETED],
  [TaskStatus.COMPLETED]: [] // 終結狀態，無法再轉換
} as const

/**
 * 任務狀態轉換條件
 */
export const STATE_TRANSITION_CONDITIONS = {
  [TaskStatus.PENDING]: {
    to: TaskStatus.PENDING_CONFIRMATION,
    condition: '至少一位終結者申請任務'
  },
  [TaskStatus.PENDING_CONFIRMATION]: {
    to: TaskStatus.IN_PROGRESS,
    condition: '小怕星選擇委託對象'
  },
  [TaskStatus.IN_PROGRESS]: {
    to: TaskStatus.COMPLETED,
    condition: '雙方都確認任務完成'
  }
} as const

/**
 * 各角色在不同狀態下的權限配置
 */
export const ROLE_PERMISSIONS = {
  [TaskStatus.PENDING]: {
    [UserRole.FEAR_STAR]: {
      canView: ['自己的任務詳情'],
      canEdit: ['任務資訊'],
      canDelete: ['任務'],
      availableActions: ['editTask', 'deleteTask']
    },
    [UserRole.TERMINATOR]: {
      canView: ['所有可申請任務'],
      canEdit: [],
      canDelete: [],
      availableActions: ['applyTask']
    }
  },
  [TaskStatus.PENDING_CONFIRMATION]: {
    [UserRole.FEAR_STAR]: {
      canView: ['所有申請者完整資料', '申請者服務記錄', '評價評分'],
      canEdit: [],
      canDelete: [],
      availableActions: ['selectTerminator', 'cancelTask']
    },
    [UserRole.TERMINATOR]: {
      canView: ['小怕星基本資料', '任務詳情', '申請狀態'],
      canEdit: [],
      canDelete: [],
      availableActions: ['withdrawApplication']
    }
  },
  [TaskStatus.IN_PROGRESS]: {
    [UserRole.FEAR_STAR]: {
      canView: ['終結者完整聯絡資訊', '任務進度', '聊天記錄'],
      canEdit: ['任務進度'],
      canDelete: [],
      availableActions: ['confirmCompletion', 'chat', 'uploadProgress']
    },
    [UserRole.TERMINATOR]: {
      canView: ['小怕星完整聯絡資訊', '任務進度', '聊天記錄'],
      canEdit: ['任務進度'],
      canDelete: [],
      availableActions: ['confirmCompletion', 'chat', 'uploadProgress']
    }
  },
  [TaskStatus.COMPLETED]: {
    [UserRole.FEAR_STAR]: {
      canView: ['任務基本資訊', '完成時間', '評價記錄'],
      canEdit: [],
      canDelete: [],
      availableActions: ['rateTerminator', 'viewHistory']
    },
    [UserRole.TERMINATOR]: {
      canView: ['任務基本資訊', '完成時間', '評價記錄'],
      canEdit: [],
      canDelete: [],
      availableActions: ['rateFearStar', 'viewHistory']
    }
  }
} as const

/**
 * 資訊可見性配置
 */
export const INFORMATION_VISIBILITY = {
  [TaskStatus.PENDING]: {
    [UserRole.FEAR_STAR]: {
      visibleFields: ['taskDetails', 'applicationCount', 'taskStatus'],
      hiddenFields: ['applicantContact']
    },
    [UserRole.TERMINATOR]: {
      visibleFields: ['taskBasicInfo', 'fearStarBasicInfo', 'budget', 'location'],
      hiddenFields: ['fearStarContact']
    }
  },
  [TaskStatus.PENDING_CONFIRMATION]: {
    [UserRole.FEAR_STAR]: {
      visibleFields: ['applicantFullProfile', 'serviceRecord', 'ratings', 'applicationTime'],
      hiddenFields: []
    },
    [UserRole.TERMINATOR]: {
      visibleFields: ['fearStarBasicInfo', 'taskDetails', 'applicationStatus'],
      hiddenFields: ['fearStarContact']
    }
  },
  [TaskStatus.IN_PROGRESS]: {
    [UserRole.FEAR_STAR]: {
      visibleFields: ['terminatorFullContact', 'taskProgress', 'chatHistory'],
      hiddenFields: []
    },
    [UserRole.TERMINATOR]: {
      visibleFields: ['fearStarFullContact', 'taskProgress', 'chatHistory'],
      hiddenFields: []
    }
  },
  [TaskStatus.COMPLETED]: {
    [UserRole.FEAR_STAR]: {
      visibleFields: ['taskBasicInfo', 'completionTime', 'ratings'],
      hiddenFields: ['terminatorContact']
    },
    [UserRole.TERMINATOR]: {
      visibleFields: ['taskBasicInfo', 'completionTime', 'ratings'],
      hiddenFields: ['fearStarContact']
    }
  }
} as const

/**
 * 通知配置
 */
export const NOTIFICATION_CONFIG = {
  stateTransitions: {
    [TaskStatus.PENDING_CONFIRMATION]: {
      [UserRole.FEAR_STAR]: '您的任務收到新的申請',
      [UserRole.TERMINATOR]: '您已成功申請任務'
    },
    [TaskStatus.IN_PROGRESS]: {
      [UserRole.FEAR_STAR]: '您已成功委託任務',
      [UserRole.TERMINATOR]: '恭喜！您被選中執行任務'
    },
    [TaskStatus.COMPLETED]: {
      [UserRole.FEAR_STAR]: '任務已完成，請進行評價',
      [UserRole.TERMINATOR]: '任務已完成，請進行評價'
    }
  },
  rejectionNotification: {
    [UserRole.TERMINATOR]: '很遺憾，此次任務您未被選中'
  }
} as const

/**
 * 任務完成確認配置
 */
export const COMPLETION_CONFIG = {
  requiresBothConfirmation: true,
  timeoutHours: 24, // 24小時內需要確認
  reminderIntervalHours: 6, // 每6小時提醒一次
  messages: {
    waitingForOther: '等待對方確認',
    bothConfirmed: '任務已完成',
    timeout: '任務確認超時，請聯繫客服'
  }
} as const

/**
 * 任務取消規則
 */
export const CANCELLATION_RULES = {
  [TaskStatus.PENDING]: {
    allowedBy: [UserRole.FEAR_STAR],
    notificationRequired: false
  },
  [TaskStatus.PENDING_CONFIRMATION]: {
    allowedBy: [UserRole.FEAR_STAR],
    notificationRequired: true,
    notifyRoles: [UserRole.TERMINATOR]
  },
  [TaskStatus.IN_PROGRESS]: {
    allowedBy: [],
    requiresSupport: true,
    message: '需要客服介入處理'
  },
  [TaskStatus.COMPLETED]: {
    allowedBy: [],
    message: '已完成任務無法取消'
  }
} as const

/**
 * 超時處理配置
 */
export const TIMEOUT_CONFIG = {
  applicationTimeout: {
    hours: 72, // 72小時內選擇終結者
    action: 'autoCancel',
    message: '申請超時自動取消'
  },
  taskExecutionTimeout: {
    hours: 168, // 7天內完成任務
    action: 'sendReminder',
    message: '任務執行超時預警'
  },
  longTermTimeout: {
    hours: 336, // 14天內完成任務
    action: 'requireSupport',
    message: '長時間未完成任務，需要客服介入'
  }
} as const

/**
 * 評價系統配置
 */
export const RATING_CONFIG = {
  enabledAfterCompletion: true,
  mutual: true, // 雙向評價
  required: false,
  scale: {
    min: 1,
    max: 5
  },
  categories: [
    'communication', // 溝通
    'efficiency', // 效率
    'quality', // 品質
    'attitude' // 態度
  ]
} as const

/**
 * 驗證任務狀態轉換是否有效
 */
export const validateStateTransition = (
  currentState: TaskStatus,
  targetState: TaskStatus
): boolean => {
  const allowedTransitions = TASK_STATE_TRANSITIONS[currentState]
  return allowedTransitions.includes(targetState)
}

/**
 * 獲取角色在特定狀態下的權限
 */
export const getRolePermissions = (
  taskStatus: TaskStatus,
  userRole: UserRole
) => {
  return ROLE_PERMISSIONS[taskStatus]?.[userRole] || {
    canView: [],
    canEdit: [],
    canDelete: [],
    availableActions: []
  }
}

/**
 * 獲取資訊可見性配置
 */
export const getInformationVisibility = (
  taskStatus: TaskStatus,
  userRole: UserRole
) => {
  return INFORMATION_VISIBILITY[taskStatus]?.[userRole] || {
    visibleFields: [],
    hiddenFields: []
  }
}

/**
 * 獲取狀態轉換通知訊息
 */
export const getStateTransitionNotification = (
  targetState: TaskStatus,
  userRole: UserRole
) => {
  return NOTIFICATION_CONFIG.stateTransitions[targetState]?.[userRole] || ''
}

/**
 * 檢查角色是否可以執行特定動作
 */
export const canPerformAction = (
  taskStatus: TaskStatus,
  userRole: UserRole,
  action: string
): boolean => {
  const permissions = getRolePermissions(taskStatus, userRole)
  return permissions.availableActions.includes(action)
}

/**
 * 檢查角色是否可以取消任務
 */
export const canCancelTask = (
  taskStatus: TaskStatus,
  userRole: UserRole
): boolean => {
  const rule = CANCELLATION_RULES[taskStatus]
  return rule.allowedBy.includes(userRole)
}

/**
 * 檢查欄位是否對特定角色可見
 */
export const isFieldVisible = (
  taskStatus: TaskStatus,
  userRole: UserRole,
  field: string
): boolean => {
  const visibility = getInformationVisibility(taskStatus, userRole)
  return visibility.visibleFields.includes(field) && 
         !visibility.hiddenFields.includes(field)
}

/**
 * 驗證任務資料是否符合狀態要求
 */
export const validateTaskByStatus = (task: any): boolean => {
  switch (task.status) {
    case TaskStatus.PENDING:
      // PENDING 狀態不應該有 assignedTo, completionStatus, completedAt
      return !task.assignedTo && !task.completionStatus && !task.completedAt
    
    case TaskStatus.PENDING_CONFIRMATION:
      // PENDING_CONFIRMATION 狀態應該有申請者，但沒有 assignedTo, completionStatus, completedAt
      return !task.assignedTo && 
             !task.completionStatus && 
             !task.completedAt && 
             Array.isArray(task.applicants) && 
             task.applicants.length > 0
    
    case TaskStatus.IN_PROGRESS:
      // IN_PROGRESS 狀態應該有 assignedTo, completionStatus，但沒有 completedAt
      return !!task.assignedTo && 
             !!task.completionStatus && 
             !task.completedAt
    
    case TaskStatus.COMPLETED:
      // COMPLETED 狀態應該有 assignedTo, completionStatus, completedAt
      return !!task.assignedTo && 
             !!task.completionStatus && 
             !!task.completedAt
    
    default:
      return false
  }
}

/**
 * 清理任務資料中不符合狀態的欄位
 */
export const sanitizeTaskByStatus = (task: any): any => {
  const sanitized = { ...task }
  
  switch (task.status) {
    case TaskStatus.PENDING:
      // 移除 PENDING 狀態不應該有的欄位
      delete sanitized.assignedTo
      delete sanitized.completionStatus
      delete sanitized.completedAt
      break
    
    case TaskStatus.PENDING_CONFIRMATION:
      // 移除 PENDING_CONFIRMATION 狀態不應該有的欄位
      delete sanitized.assignedTo
      delete sanitized.completionStatus
      delete sanitized.completedAt
      break
    
    case TaskStatus.IN_PROGRESS:
      // 移除 IN_PROGRESS 狀態不應該有的欄位
      delete sanitized.completedAt
      break
    
    case TaskStatus.COMPLETED:
      // COMPLETED 狀態保留所有欄位
      break
  }
  
  return sanitized
}