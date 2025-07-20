// 任務假資料

import { PestType, Task, TaskApplication, TaskAssignment, TaskPriority, TaskStatus } from '@/shared/types'

// export const mockTasks: Task[] = [
//   {
//     id: '1',
//     title: '客廳蟑螂問題急需處理',
//     description:
//       '家中客廳發現大量蟑螂，特別是晚上時間，需要專業除蟲服務。已嘗試市售殺蟲劑但效果不佳。',
//     pestType: PestType.COCKROACH,
//     location: {
//       latitude: 25.033,
//       longitude: 121.5654,
//       city: '台北市',
//       district: '大安區',
//     },
//     status: TaskStatus.PENDING,
//     priority: TaskPriority.URGENT,
//     budget: 1500,
//     isImmediate: true,
//     createdBy: '1', // 小怕星 ID
//     applicants: [],
//     createdAt: '2024-07-02T10:30:00',
//     updatedAt: '2024-07-02T10:30:00',
//   },
//   {
//     id: '2',
//     title: '廚房螞蟻入侵',
//     description: '廚房地板和牆角出現螞蟻行軍，影響食物衛生，希望能徹底清除。',
//     pestType: PestType.ANT,
//     location: {
//       latitude: 25.0078,
//       longitude: 121.4626,
//       city: '新北市',
//       district: '板橋區',
//     },
//     status: TaskStatus.PENDING_CONFIRMATION,
//     priority: TaskPriority.NORMAL,
//     budget: 1200,
//     scheduledTime: '2024-07-03T14:00:00',
//     isImmediate: false,
//     createdBy: '1', // 小怕星測試
//     applicants: [
//       {
//         id: 'app1',
//         taskId: '2',
//         terminatorId: '2', // 李師傅除蟲專家申請
//         appliedAt: '2024-07-02T09:00:00',
//         status: 'pending',
//       },
//       {
//         id: 'app2',
//         taskId: '2',
//         terminatorId: '3', // 陳師傅專業除蟲申請
//         appliedAt: '2024-07-02T09:15:00',
//         status: 'pending',
//       },
//     ],
//     createdAt: '2024-07-02T08:15:00',
//     updatedAt: '2024-07-02T08:15:00',
//   },
//   {
//     id: '3',
//     title: '臥室蚊子太多影響睡眠',
//     description: '每晚都有蚊子嗡嗡叫，嚴重影響睡眠品質，需要專業處理。',
//     pestType: PestType.MOSQUITO,
//     location: {
//       latitude: 25.0571,
//       longitude: 121.555,
//       city: '台北市',
//       district: '松山區',
//     },
//     status: TaskStatus.IN_PROGRESS,
//     priority: TaskPriority.NORMAL,
//     budget: 900,
//     scheduledTime: '2024-07-02T19:00:00',
//     isImmediate: false,
//     createdBy: '1',
//     assignedTo: '2', // 已指派給蟲蟲終結者
//     applicants: [
//       {
//         id: 'app3',
//         taskId: '3',
//         terminatorId: '2',
//         appliedAt: '2024-07-01T17:00:00',
//         status: 'selected',
//       },
//     ],
//     completionStatus: {
//       fearStarConfirmed: false,
//       terminatorConfirmed: false,
//     },
//     createdAt: '2024-07-01T16:20:00',
//     updatedAt: '2024-07-02T09:00:00',
//   },
//   {
//     id: '4',
//     title: '陽台蜘蛛網清理',
//     description: '陽台角落有多個大型蜘蛛網，需要清理並預防再次出現。',
//     pestType: PestType.SPIDER,
//     location: {
//       latitude: 25.0415,
//       longitude: 121.5187,
//       city: '台北市',
//       district: '中正區',
//     },
//     status: TaskStatus.COMPLETED,
//     priority: TaskPriority.NORMAL,
//     budget: 750,
//     scheduledTime: '2024-07-04T10:00:00',
//     isImmediate: false,
//     createdBy: '1',
//     assignedTo: '2', // 李師傅除蟲專家
//     applicants: [
//       {
//         id: 'app4',
//         taskId: '4',
//         terminatorId: '2', // 李師傅除蟲專家
//         appliedAt: '2024-07-02T12:00:00',
//         status: 'selected',
//       },
//     ],
//     completionStatus: {
//       fearStarConfirmed: true,
//       terminatorConfirmed: true,
//     },
//     completedAt: '2024-07-04T12:00:00',
//     createdAt: '2024-07-02T11:45:00',
//     updatedAt: '2024-07-04T12:00:00',
//   },
// ]

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
    budget: 1500,
    isImmediate: true,
    createdBy: '1', // 小怕星 ID
    applicants: [],
    createdAt: '2024-07-02T10:30:00',
    updatedAt: '2024-07-02T10:30:00',
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
    budget: 1200,
    scheduledTime: '2024-07-03T14:00:00',
    isImmediate: false,
    createdBy: '1', // 小怕星測試
    applicants: [
      {
        id: 'app1',
        taskId: '2',
        terminatorId: '2', // 李師傅除蟲專家申請
        appliedAt: '2024-07-02T09:00:00',
        status: 'pending',
      },
      {
        id: 'app2',
        taskId: '2',
        terminatorId: '3', // 陳師傅專業除蟲申請
        appliedAt: '2024-07-02T09:15:00',
        status: 'pending',
      },
    ],
    createdAt: '2024-07-02T08:15:00',
    updatedAt: '2024-07-02T08:15:00',
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
    budget: 900,
    scheduledTime: '2024-07-02T19:00:00',
    isImmediate: false,
    createdBy: '1',
    assignedTo: '2', // 已指派給蟲蟲終結者
    applicants: [
      {
        id: 'app3',
        taskId: '3',
        terminatorId: '2',
        appliedAt: '2024-07-01T17:00:00',
        status: 'selected',
      },
    ],
    completionStatus: {
      fearStarConfirmed: false,
      terminatorConfirmed: false,
    },
    createdAt: '2024-07-01T16:20:00',
    updatedAt: '2024-07-02T09:00:00',
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
    budget: 750,
    scheduledTime: '2024-07-04T10:00:00',
    isImmediate: false,
    createdBy: '1',
    assignedTo: '2', // 李師傅除蟲專家
    applicants: [
      {
        id: 'app4',
        taskId: '4',
        terminatorId: '2', // 李師傅除蟲專家
        appliedAt: '2024-07-02T12:00:00',
        status: 'selected',
      },
    ],
    completionStatus: {
      fearStarConfirmed: true,
      terminatorConfirmed: true,
    },
    completedAt: '2024-07-04T12:00:00',
    createdAt: '2024-07-02T11:45:00',
    updatedAt: '2024-07-04T12:00:00',
  },
  // 新增：PENDING_COMPLETION 狀態測試任務（小怕星已確認，等待終結者確認）
  {
    id: '5',
    title: '浴室除霉處理',
    description: '浴室牆角發霉嚴重，需要專業清理和防霉處理。',
    pestType: PestType.OTHER,
    location: {
      latitude: 25.0425,
      longitude: 121.5010,
      city: '台北市',
      district: '萬華區',
    },
    status: TaskStatus.PENDING_COMPLETION,
    priority: TaskPriority.NORMAL,
    budget: 1000,
    scheduledTime: '2024-07-05T09:00:00',
    isImmediate: false,
    createdBy: '1',
    assignedTo: '3', // 陳師傅專業除蟲
    applicants: [
      {
        id: 'app5',
        taskId: '5',
        terminatorId: '3',
        appliedAt: '2024-07-03T10:00:00',
        status: 'selected',
      },
    ],
    completionStatus: {
      fearStarConfirmed: true,   // 小怕星已確認
      terminatorConfirmed: false, // 終結者未確認
    },
    createdAt: '2024-07-03T09:30:00',
    updatedAt: '2024-07-05T10:30:00',
  },
  // 新增：PENDING_COMPLETION 狀態測試任務（終結者已確認，等待小怕星確認）
  {
    id: '6',
    title: '書房書蟲清理',
    description: '書籍被書蟲蛀蝕，需要專業清理和預防。',
    pestType: PestType.OTHER,
    location: {
      latitude: 25.0478,
      longitude: 121.5312,
      city: '台北市',
      district: '信義區',
    },
    status: TaskStatus.PENDING_COMPLETION,
    priority: TaskPriority.URGENT,
    budget: 800,
    isImmediate: true,
    createdBy: '1',
    assignedTo: '2', // 李師傅除蟲專家
    applicants: [
      {
        id: 'app6',
        taskId: '6',
        terminatorId: '2',
        appliedAt: '2024-07-04T14:00:00',
        status: 'selected',
      },
    ],
    completionStatus: {
      fearStarConfirmed: false,  // 小怕星未確認
      terminatorConfirmed: true, // 終結者已確認
    },
    createdAt: '2024-07-04T13:45:00',
    updatedAt: '2024-07-05T16:20:00',
  },
] 


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

// 任務申請假資料（TaskApplication）
export const mockTaskApplications: TaskApplication[] = [
  {
    id: 'app1',
    taskId: '2',
    terminatorId: '2', // 李師傅除蟲專家
    appliedAt: '2024-07-02T09:00:00',
    status: 'pending',
  },
  {
    id: 'app2',
    taskId: '2',
    terminatorId: '3', // 陳師傅專業除蟲
    appliedAt: '2024-07-02T09:15:00',
    status: 'pending',
  },
  {
    id: 'app3',
    taskId: '3',
    terminatorId: '2',
    appliedAt: '2024-07-01T17:00:00',
    status: 'selected',
  },
  {
    id: 'app4',
    taskId: '4',
    terminatorId: '2', // 李師傅除蟲專家
    appliedAt: '2024-07-02T12:00:00',
    status: 'selected',
  },
  {
    id: 'app5',
    taskId: '5',
    terminatorId: '3', // 陳師傅專業除蟲
    appliedAt: '2024-07-03T10:00:00',
    status: 'selected',
  },
  {
    id: 'app6',
    taskId: '6',
    terminatorId: '2', // 李師傅除蟲專家
    appliedAt: '2024-07-04T14:00:00',
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
    createdAt: '2024-07-01T17:30:00',
  },
  {
    taskId: '4', // 陽台蜘蛛網清理
    terminatorId: '2', // 李師傅除蟲專家
    proposedPrice: 600,
    estimatedDuration: 60,
    message: '專業清理蜘蛛網，預防再次出現',
    status: 'accepted',
    createdAt: '2024-07-02T12:30:00',
  },
  {
    taskId: '5', // 浴室除霉處理
    terminatorId: '3', // 陳師傅專業除蟲
    proposedPrice: 900,
    estimatedDuration: 120,
    message: '專業除霉處理，使用環保清潔劑',
    status: 'accepted',
    createdAt: '2024-07-03T10:30:00',
  },
  {
    taskId: '6', // 書房書蟲清理
    terminatorId: '2', // 李師傅除蟲專家
    proposedPrice: 750,
    estimatedDuration: 90,
    message: '專業書蟲清理，提供預防建議',
    status: 'accepted',
    createdAt: '2024-07-04T14:30:00',
  },
]


// 依據任務ID取得指派資訊（TaskAssignment）
export const getAssignmentsByTaskId = (taskId: string) => {
  return mockTaskAssignments.filter(assignment => assignment.taskId === taskId)
}

