// 任務假資料

import { PestType, Task, TaskApplication, TaskAssignment, TaskPriority, TaskStatus } from '@/shared/types'

export const mockTasks: Task[] = [
  {
    id: '1',
    title: '客廳蟑螂問題急需處理',
    description:
      '家中客廳發現大量蟑螂，特別是晚上時間，需要專業除蟲服務。已嘗試市售殺蟲劑但效果不佳。',
    pestType: PestType.COCKROACH,
    location: {
      latitude: 25.033,
      longitude: 121.5654,
      city: '台北市',
      district: '大安區',
    },
    status: TaskStatus.PENDING,
    priority: TaskPriority.URGENT,
    budget: {
      min: 1000,
      max: 2000,
    },
    isImmediate: true,
    createdBy: '1', // 小怕星 ID
    applicants: [],
    createdAt: new Date('2024-07-02T10:30:00'),
    updatedAt: new Date('2024-07-02T10:30:00'),
  },
  {
    id: '2',
    title: '廚房螞蟻入侵',
    description: '廚房地板和牆角出現螞蟻行軍，影響食物衛生，希望能徹底清除。',
    pestType: PestType.ANT,
    location: {
      latitude: 25.0078,
      longitude: 121.4626,
      city: '新北市',
      district: '板橋區',
    },
    status: TaskStatus.PENDING_CONFIRMATION,
    priority: TaskPriority.NORMAL,
    budget: {
      min: 800,
      max: 1500,
    },
    scheduledTime: new Date('2024-07-03T14:00:00'),
    isImmediate: false,
    createdBy: '1', // 小怕星測試
    applicants: [
      {
        id: 'app1',
        taskId: '2',
        terminatorId: '2', // 李師傅除蟲專家申請
        appliedAt: new Date('2024-07-02T09:00:00'),
        status: 'pending',
      },
      {
        id: 'app2',
        taskId: '2',
        terminatorId: '3', // 陳師傅專業除蟲申請
        appliedAt: new Date('2024-07-02T09:15:00'),
        status: 'pending',
      },
    ],
    createdAt: new Date('2024-07-02T08:15:00'),
    updatedAt: new Date('2024-07-02T08:15:00'),
  },
  {
    id: '3',
    title: '臥室蚊子太多影響睡眠',
    description: '每晚都有蚊子嗡嗡叫，嚴重影響睡眠品質，需要專業處理。',
    pestType: PestType.MOSQUITO,
    location: {
      latitude: 25.0571,
      longitude: 121.555,
      city: '台北市',
      district: '松山區',
    },
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.NORMAL,
    budget: {
      min: 600,
      max: 1200,
    },
    scheduledTime: new Date('2024-07-02T19:00:00'),
    isImmediate: false,
    createdBy: '1',
    assignedTo: '2', // 已指派給蟲蟲終結者
    applicants: [
      {
        id: 'app3',
        taskId: '3',
        terminatorId: '2',
        appliedAt: new Date('2024-07-01T17:00:00'),
        status: 'selected',
      },
    ],
    completionStatus: {
      fearStarConfirmed: false,
      terminatorConfirmed: false,
    },
    createdAt: new Date('2024-07-01T16:20:00'),
    updatedAt: new Date('2024-07-02T09:00:00'),
  },
  {
    id: '4',
    title: '陽台蜘蛛網清理',
    description: '陽台角落有多個大型蜘蛛網，需要清理並預防再次出現。',
    pestType: PestType.SPIDER,
    location: {
      latitude: 25.0415,
      longitude: 121.5187,
      city: '台北市',
      district: '中正區',
    },
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.NORMAL,
    budget: {
      min: 500,
      max: 1000,
    },
    scheduledTime: new Date('2024-07-04T10:00:00'),
    isImmediate: false,
    createdBy: '1',
    assignedTo: '2', // 李師傅除蟲專家
    applicants: [
      {
        id: 'app4',
        taskId: '4',
        terminatorId: '2', // 李師傅除蟲專家
        appliedAt: new Date('2024-07-02T12:00:00'),
        status: 'selected',
      },
    ],
    completionStatus: {
      fearStarConfirmed: true,
      terminatorConfirmed: true,
    },
    completedAt: new Date('2024-07-04T12:00:00'),
    createdAt: new Date('2024-07-02T11:45:00'),
    updatedAt: new Date('2024-07-04T12:00:00'),
  },
]

// 依據狀態篩選任務
export const getTasksByStatus = (status: TaskStatus) => {
  return mockTasks.filter(task => task.status === status)
}

// 依據害蟲類型篩選任務
export const getTasksByPestType = (pestType: PestType) => {
  return mockTasks.filter(task => task.pestType === pestType)
}

// 依據優先程度篩選任務
export const getTasksByPriority = (priority: TaskPriority) => {
  return mockTasks.filter(task => task.priority === priority)
}

// 取得可接的任務（未指派且狀態為 PENDING）
export const getAvailableTasks = () => {
  return mockTasks.filter(task => task.status === TaskStatus.PENDING && !task.assignedTo)
}

// 取得已指派給特定終結者的任務
export const getAssignedTasks = (terminatorId: string) => {
  return mockTasks.filter(task => {
    // 已指派的任務 (IN_PROGRESS, COMPLETED)
    if (task.assignedTo === terminatorId) {
      return true
    }
    
    // PENDING_CONFIRMATION 狀態下，終結者已申請的任務
    if (task.status === TaskStatus.PENDING_CONFIRMATION && task.applicants) {
      return task.applicants.some(applicant => applicant.terminatorId === terminatorId)
    }
    
    return false
  })
}

// 害蟲類型顯示名稱
export const getPestTypeDisplayName = (pestType: PestType): string => {
  switch (pestType) {
    case PestType.COCKROACH:
      return '蟑螂'
    case PestType.ANT:
      return '螞蟻'
    case PestType.MOSQUITO:
      return '蚊子'
    case PestType.SPIDER:
      return '蜘蛛'
    case PestType.OTHER:
      return '其他'
    default:
      return '未知'
  }
}

// 優先程度顯示名稱和顏色
export const getPriorityDisplayInfo = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.NORMAL:
      return { name: '一般', color: '#666666' }
    case TaskPriority.URGENT:
      return { name: '緊急', color: '#FF9500' }
    case TaskPriority.VERY_URGENT:
      return { name: '非常緊急', color: '#FF3B30' }
    default:
      return { name: '一般', color: '#666666' }
  }
}

// 任務狀態顯示名稱
export const getTaskStatusDisplayName = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.PENDING:
      return '待接案'
    case TaskStatus.IN_PROGRESS:
      return '進行中'
    case TaskStatus.COMPLETED:
      return '已完成'
    case TaskStatus.PENDING_CONFIRMATION:
      return '待確認'
    default:
      return '未知狀態'
  }
}

// 任務申請假資料（TaskApplication）
export const mockTaskApplications: TaskApplication[] = [
  {
    id: 'app1',
    taskId: '2',
    terminatorId: '2', // 李師傅除蟲專家
    appliedAt: new Date('2024-07-02T09:00:00'),
    status: 'pending',
  },
  {
    id: 'app2',
    taskId: '2',
    terminatorId: '3', // 陳師傅專業除蟲
    appliedAt: new Date('2024-07-02T09:15:00'),
    status: 'pending',
  },
  {
    id: 'app3',
    taskId: '3',
    terminatorId: '2',
    appliedAt: new Date('2024-07-01T17:00:00'),
    status: 'selected',
  },
  {
    id: 'app4',
    taskId: '4',
    terminatorId: '2', // 李師傅除蟲專家
    appliedAt: new Date('2024-07-02T12:00:00'),
    status: 'selected',
  },
]

// 任務指派假資料（TaskAssignment - 用於進行中的任務詳細資訊）
export const mockTaskAssignments: TaskAssignment[] = [
  {
    taskId: '3', // 臥室蚊子太多影響睡眠
    terminatorId: '2',
    proposedPrice: 800,
    estimatedDuration: 90,
    message: '專業除蚊服務，使用環保藥劑',
    status: 'accepted',
    createdAt: new Date('2024-07-01T17:30:00'),
  },
  {
    taskId: '4', // 陽台蜘蛛網清理
    terminatorId: '2', // 李師傅除蟲專家
    proposedPrice: 600,
    estimatedDuration: 60,
    message: '專業清理蜘蛛網，預防再次出現',
    status: 'accepted',
    createdAt: new Date('2024-07-02T12:30:00'),
  },
]

// 依據任務ID取得所有申請（TaskApplication）
export const getApplicationsByTaskId = (taskId: string) => {
  return mockTaskApplications.filter(application => application.taskId === taskId)
}

// 依據終結者ID取得所有申請（TaskApplication）
export const getApplicationsByTerminatorId = (terminatorId: string) => {
  return mockTaskApplications.filter(application => application.terminatorId === terminatorId)
}

// 取得特定任務的申請數量
export const getTaskApplicationCount = (taskId: string) => {
  return mockTaskApplications.filter(
    application => application.taskId === taskId && application.status === 'pending'
  ).length
}

// 依據任務ID取得指派資訊（TaskAssignment）
export const getAssignmentsByTaskId = (taskId: string) => {
  return mockTaskAssignments.filter(assignment => assignment.taskId === taskId)
}

// 依據終結者ID取得所有指派（TaskAssignment）
export const getAssignmentsByTerminatorId = (terminatorId: string) => {
  return mockTaskAssignments.filter(assignment => assignment.terminatorId === terminatorId)
}
