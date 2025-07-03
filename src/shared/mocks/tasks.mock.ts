// 任務假資料

import { Task, TaskStatus, TaskPriority, PestType, TaskAssignment } from '@/shared/types'

export const mockTasks: Task[] = [
  {
    id: '1',
    title: '客廳蟑螂問題急需處理',
    description: '家中客廳發現大量蟑螂，特別是晚上時間，需要專業除蟲服務。已嘗試市售殺蟲劑但效果不佳。',
    pestType: PestType.COCKROACH,
    location: {
      address: '台北市大安區信義路四段 10 號',
      latitude: 25.0330,
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
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76d7d1b2?w=300',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300',
    ],
    createdBy: '1', // 小怕星 ID
    createdAt: new Date('2024-07-02T10:30:00'),
    updatedAt: new Date('2024-07-02T10:30:00'),
  },
  {
    id: '2',
    title: '廚房螞蟻入侵',
    description: '廚房地板和牆角出現螞蟻行軍，影響食物衛生，希望能徹底清除。',
    pestType: PestType.ANT,
    location: {
      address: '新北市板橋區中山路二段 25 號',
      latitude: 25.0078,
      longitude: 121.4626,
      city: '新北市',
      district: '板橋區',
    },
    status: TaskStatus.PENDING,
    priority: TaskPriority.NORMAL,
    budget: {
      min: 800,
      max: 1500,
    },
    scheduledTime: new Date('2024-07-03T14:00:00'),
    isImmediate: false,
    images: [
      'https://images.unsplash.com/photo-1609205807107-e5d2c18e9a7d?w=300',
    ],
    createdBy: '1',
    createdAt: new Date('2024-07-02T08:15:00'),
    updatedAt: new Date('2024-07-02T08:15:00'),
  },
  {
    id: '3',
    title: '臥室蚊子太多影響睡眠',
    description: '每晚都有蚊子嗡嗡叫，嚴重影響睡眠品質，需要專業處理。',
    pestType: PestType.MOSQUITO,
    location: {
      address: '台北市松山區民生東路四段 88 號',
      latitude: 25.0571,
      longitude: 121.5550,
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
    images: [],
    createdBy: '1',
    assignedTo: '2', // 已指派給蟲蟲終結者
    createdAt: new Date('2024-07-01T16:20:00'),
    updatedAt: new Date('2024-07-02T09:00:00'),
  },
  {
    id: '4',
    title: '陽台蜘蛛網清理',
    description: '陽台角落有多個大型蜘蛛網，需要清理並預防再次出現。',
    pestType: PestType.SPIDER,
    location: {
      address: '台北市中正區羅斯福路一段 15 號',
      latitude: 25.0415,
      longitude: 121.5187,
      city: '台北市',
      district: '中正區',
    },
    status: TaskStatus.PENDING,
    priority: TaskPriority.NORMAL,
    budget: {
      min: 500,
      max: 1000,
    },
    scheduledTime: new Date('2024-07-04T10:00:00'),
    isImmediate: false,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
    ],
    createdBy: '1',
    createdAt: new Date('2024-07-02T11:45:00'),
    updatedAt: new Date('2024-07-02T11:45:00'),
  },
  {
    id: '5',
    title: '辦公室蟑螂防治',
    description: '小型辦公室發現蟑螂，需要在不影響工作的情況下進行防治。',
    pestType: PestType.COCKROACH,
    location: {
      address: '台北市信義區基隆路一段 200 號',
      latitude: 25.0370,
      longitude: 121.5638,
      city: '台北市',
      district: '信義區',
    },
    status: TaskStatus.PENDING,
    priority: TaskPriority.VERY_URGENT,
    budget: {
      min: 1500,
      max: 3000,
    },
    isImmediate: true,
    images: [],
    createdBy: '1',
    createdAt: new Date('2024-07-02T13:20:00'),
    updatedAt: new Date('2024-07-02T13:20:00'),
  },
  {
    id: '6',
    title: '浴室小蟲清除',
    description: '浴室排水孔附近發現不明小蟲，需要專業判斷蟲種並處理。',
    pestType: PestType.OTHER,
    location: {
      address: '新北市新店區中興路三段 50 號',
      latitude: 24.9677,
      longitude: 121.5430,
      city: '新北市',
      district: '新店區',
    },
    status: TaskStatus.PENDING,
    priority: TaskPriority.NORMAL,
    budget: {
      min: 800,
      max: 1600,
    },
    scheduledTime: new Date('2024-07-05T16:00:00'),
    isImmediate: false,
    images: [
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300',
    ],
    createdBy: '1',
    createdAt: new Date('2024-07-02T14:10:00'),
    updatedAt: new Date('2024-07-02T14:10:00'),
  },
  {
    id: '7',
    title: '車庫白蟻防治',
    description: '發現車庫木頭被白蟻蛀蝕，需要專業防治服務。',
    pestType: PestType.OTHER,
    location: {
      address: '桃園市中壢區中央路 100 號',
      latitude: 24.9537,
      longitude: 121.2274,
      city: '桃園市',
      district: '中壢區',
    },
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.URGENT,
    budget: {
      min: 2000,
      max: 4000,
    },
    isImmediate: false,
    scheduledTime: new Date('2024-07-01T14:00:00'),
    images: [],
    createdBy: '3',
    assignedTo: '2', // 終結者已完成，等待小怕星確認
    createdAt: new Date('2024-06-30T10:00:00'),
    updatedAt: new Date('2024-07-01T16:00:00'),
    completedAt: new Date('2024-07-01T16:00:00'),
  },
  {
    id: '8',
    title: '客廳果蠅清除',
    description: '客廳和廚房有很多果蠅，影響居住品質。',
    pestType: PestType.OTHER,
    location: {
      address: '台中市西屯區台灣大道三段 200 號',
      latitude: 24.1611,
      longitude: 120.6447,
      city: '台中市',
      district: '西屯區',
    },
    status: TaskStatus.REVIEWED,
    priority: TaskPriority.NORMAL,
    budget: {
      min: 800,
      max: 1500,
    },
    isImmediate: false,
    scheduledTime: new Date('2024-06-28T10:00:00'),
    images: [],
    createdBy: '4',
    assignedTo: '2', // 終結者已完成並已被評價
    createdAt: new Date('2024-06-27T09:00:00'),
    updatedAt: new Date('2024-06-28T15:00:00'),
    completedAt: new Date('2024-06-28T14:30:00'),
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
  return mockTasks.filter(task => 
    task.status === TaskStatus.PENDING && !task.assignedTo
  )
}

// 取得已指派給特定終結者的任務
export const getAssignedTasks = (terminatorId: string) => {
  return mockTasks.filter(task => task.assignedTo === terminatorId)
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
    case TaskStatus.ASSIGNED:
      return '已接案'
    case TaskStatus.IN_PROGRESS:
      return '進行中0'
    case TaskStatus.COMPLETED:
      return '已完成'
    case TaskStatus.CANCELLED:
      return '已取消'
    case TaskStatus.REVIEWED:
      return '已評價'
    default:
      return '未知狀態'
  }
}

// 任務申請假資料
export const mockTaskAssignments: TaskAssignment[] = [
  {
    taskId: '1', // 客廳蟑螂問題急需處理
    terminatorId: '2',
    proposedPrice: 1500,
    estimatedDuration: 120,
    message: '我有5年蟑螂防治經驗，保證徹底解決問題！',
    status: 'pending',
    createdAt: new Date('2024-07-02T11:00:00'),
  },
  {
    taskId: '1',
    terminatorId: '3',
    proposedPrice: 1800,
    estimatedDuration: 90,
    message: '專業級設備，快速有效處理，無毒環保',
    status: 'pending',
    createdAt: new Date('2024-07-02T11:15:00'),
  },
  {
    taskId: '1',
    terminatorId: '4',
    proposedPrice: 1200,
    estimatedDuration: 150,
    message: '經濟實惠，效果保證，提供一個月保固',
    status: 'pending',
    createdAt: new Date('2024-07-02T11:30:00'),
  },
  {
    taskId: '2', // 廚房螞蟻入侵
    terminatorId: '2',
    proposedPrice: 1000,
    estimatedDuration: 60,
    message: '螞蟻防治專家，使用天然無害藥劑',
    status: 'pending',
    createdAt: new Date('2024-07-02T08:30:00'),
  },
  {
    taskId: '4', // 陽台蜘蛛網清理
    terminatorId: '3',
    proposedPrice: 800,
    estimatedDuration: 45,
    message: '專業清潔蜘蛛網，並做預防處理',
    status: 'pending',
    createdAt: new Date('2024-07-02T12:00:00'),
  },
  {
    taskId: '4',
    terminatorId: '4',
    proposedPrice: 600,
    estimatedDuration: 60,
    message: '仔細清理，價格實惠',
    status: 'pending',
    createdAt: new Date('2024-07-02T12:20:00'),
  },
]

// 依據任務ID取得所有申請
export const getAssignmentsByTaskId = (taskId: string) => {
  return mockTaskAssignments.filter(assignment => assignment.taskId === taskId)
}

// 依據終結者ID取得所有申請
export const getAssignmentsByTerminatorId = (terminatorId: string) => {
  return mockTaskAssignments.filter(assignment => assignment.terminatorId === terminatorId)
}

// 取得特定任務的申請數量
export const getTaskAssignmentCount = (taskId: string) => {
  return mockTaskAssignments.filter(assignment => 
    assignment.taskId === taskId && assignment.status === 'pending'
  ).length
}