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
  // 新增 20 筆假資料用於測試滿屏效果
  {
    id: '7',
    title: '辦公室蟑螂滅除',
    description: '辦公室茶水間發現蟑螂蹤跡，影響員工用餐環境，需要立即處理。',
    pestType: PestType.COCKROACH,
    location: {
      latitude: 25.0330,
      longitude: 121.5654,
      city: '台北市',
      district: '信義區',
    },
    status: TaskStatus.PENDING,
    priority: TaskPriority.URGENT,
    budget: 2000,
    isImmediate: true,
    createdBy: '1',
    applicants: [],
    createdAt: '2024-07-06T09:00:00',
    updatedAt: '2024-07-06T09:00:00',
  },
  {
    id: '8',
    title: '餐廳蒼蠅防治',
    description: '餐廳用餐區蒼蠅過多，影響客人用餐體驗，需要專業防治。',
    pestType: PestType.FLY,
    location: {
      latitude: 25.0478,
      longitude: 121.5175,
      city: '台北市',
      district: '中山區',
    },
    status: TaskStatus.PENDING,
    priority: TaskPriority.VERY_URGENT,
    budget: 1800,
    isImmediate: true,
    createdBy: '1',
    applicants: [],
    createdAt: '2024-07-06T10:30:00',
    updatedAt: '2024-07-06T10:30:00',
  },
  {
    id: '9',
    title: '花園白蟻預防',
    description: '花園木製涼亭發現白蟻蛀蝕痕跡，需要預防性處理。',
    pestType: PestType.TERMITE,
    location: {
      latitude: 25.0120,
      longitude: 121.4650,
      city: '新北市',
      district: '中和區',
    },
    status: TaskStatus.PENDING,
    priority: TaskPriority.NORMAL,
    budget: 2500,
    isImmediate: false,
    createdBy: '1',
    applicants: [],
    createdAt: '2024-07-06T11:00:00',
    updatedAt: '2024-07-06T11:00:00',
  },
  {
    id: '10',
    title: '倉庫老鼠防治',
    description: '倉庫發現老鼠啃咬貨物，需要設置防鼠措施。',
    pestType: PestType.OTHER,
    location: {
      latitude: 25.0200,
      longitude: 121.4800,
      city: '新北市',
      district: '三重區',
    },
    status: TaskStatus.PENDING,
    priority: TaskPriority.URGENT,
    budget: 1500,
    isImmediate: false,
    createdBy: '1',
    applicants: [],
    createdAt: '2024-07-06T12:15:00',
    updatedAt: '2024-07-06T12:15:00',
  },
  {
    id: '11',
    title: '咖啡廳螞蟻問題',
    description: '咖啡廳甜品櫃附近螞蟻聚集，影響食品衛生。',
    pestType: PestType.ANT,
    location: {
      latitude: 25.0415,
      longitude: 121.5650,
      city: '台北市',
      district: '大安區',
    },
    status: TaskStatus.PENDING_CONFIRMATION,
    priority: TaskPriority.NORMAL,
    budget: 1000,
    isImmediate: false,
    createdBy: '1',
    applicants: [
      {
        id: 'app7',
        taskId: '11',
        terminatorId: '2',
        appliedAt: '2024-07-06T13:00:00',
        status: 'pending',
      },
    ],
    createdAt: '2024-07-06T12:30:00',
    updatedAt: '2024-07-06T13:00:00',
  },
  {
    id: '12',
    title: '住宅蚊蟲處理',
    description: '住宅一樓積水處蚊蟲孳生，需要根本性處理。',
    pestType: PestType.MOSQUITO,
    location: {
      latitude: 25.0050,
      longitude: 121.5400,
      city: '台北市',
      district: '文山區',
    },
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.NORMAL,
    budget: 1200,
    isImmediate: false,
    createdBy: '1',
    assignedTo: '3',
    applicants: [
      {
        id: 'app8',
        taskId: '12',
        terminatorId: '3',
        appliedAt: '2024-07-05T16:00:00',
        status: 'selected',
      },
    ],
    createdAt: '2024-07-05T15:30:00',
    updatedAt: '2024-07-06T08:00:00',
  },
  {
    id: '13',
    title: '學校蟑螂清除',
    description: '學校廚房蟑螂問題嚴重，影響學生用餐安全。',
    pestType: PestType.COCKROACH,
    location: {
      latitude: 25.0300,
      longitude: 121.5100,
      city: '台北市',
      district: '萬華區',
    },
    status: TaskStatus.PENDING,
    priority: TaskPriority.VERY_URGENT,
    budget: 3000,
    isImmediate: true,
    createdBy: '1',
    applicants: [],
    createdAt: '2024-07-06T14:00:00',
    updatedAt: '2024-07-06T14:00:00',
  },
  {
    id: '14',
    title: '民宿除蟲服務',
    description: '民宿房間發現小蟲，影響客人住宿體驗。',
    pestType: PestType.OTHER,
    location: {
      latitude: 25.0600,
      longitude: 121.5800,
      city: '台北市',
      district: '內湖區',
    },
    status: TaskStatus.PENDING,
    priority: TaskPriority.URGENT,
    budget: 1600,
    isImmediate: false,
    createdBy: '1',
    applicants: [],
    createdAt: '2024-07-06T15:00:00',
    updatedAt: '2024-07-06T15:00:00',
  },
  {
    id: '15',
    title: '工廠螞蟻防治',
    description: '工廠員工餐廳螞蟻入侵，需要定期防治。',
    pestType: PestType.ANT,
    location: {
      latitude: 25.0100,
      longitude: 121.4500,
      city: '新北市',
      district: '蘆洲區',
    },
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.NORMAL,
    budget: 2200,
    isImmediate: false,
    createdBy: '1',
    assignedTo: '2',
    applicants: [
      {
        id: 'app9',
        taskId: '15',
        terminatorId: '2',
        appliedAt: '2024-07-04T10:00:00',
        status: 'selected',
      },
    ],
    completionStatus: {
      fearStarConfirmed: true,
      terminatorConfirmed: true,
    },
    completedAt: '2024-07-05T16:00:00',
    createdAt: '2024-07-04T09:30:00',
    updatedAt: '2024-07-05T16:00:00',
  },
  {
    id: '16',
    title: '診所消毒除蟲',
    description: '診所候診區需要定期消毒除蟲，確保環境衛生。',
    pestType: PestType.OTHER,
    location: {
      latitude: 25.0520,
      longitude: 121.5430,
      city: '台北市',
      district: '松山區',
    },
    status: TaskStatus.PENDING_COMPLETION,
    priority: TaskPriority.URGENT,
    budget: 1800,
    isImmediate: false,
    createdBy: '1',
    assignedTo: '3',
    applicants: [
      {
        id: 'app10',
        taskId: '16',
        terminatorId: '3',
        appliedAt: '2024-07-05T11:00:00',
        status: 'selected',
      },
    ],
    completionStatus: {
      fearStarConfirmed: false,
      terminatorConfirmed: true,
    },
    createdAt: '2024-07-05T10:30:00',
    updatedAt: '2024-07-06T09:00:00',
  },
  {
    id: '17',
    title: '超市蒼蠅滅除',
    description: '超市生鮮區蒼蠅較多，影響食品品質。',
    pestType: PestType.FLY,
    location: {
      latitude: 25.0350,
      longitude: 121.5200,
      city: '台北市',
      district: '中正區',
    },
    status: TaskStatus.PENDING,
    priority: TaskPriority.URGENT,
    budget: 1400,
    isImmediate: true,
    createdBy: '1',
    applicants: [],
    createdAt: '2024-07-06T16:00:00',
    updatedAt: '2024-07-06T16:00:00',
  },
  {
    id: '18',
    title: '住宅白蟻檢查',
    description: '住宅木地板疑似有白蟻，需要專業檢查。',
    pestType: PestType.TERMITE,
    location: {
      latitude: 25.0080,
      longitude: 121.4700,
      city: '新北市',
      district: '永和區',
    },
    status: TaskStatus.PENDING_CONFIRMATION,
    priority: TaskPriority.NORMAL,
    budget: 1000,
    isImmediate: false,
    createdBy: '1',
    applicants: [
      {
        id: 'app11',
        taskId: '18',
        terminatorId: '2',
        appliedAt: '2024-07-06T17:00:00',
        status: 'pending',
      },
      {
        id: 'app12',
        taskId: '18',
        terminatorId: '3',
        appliedAt: '2024-07-06T17:30:00',
        status: 'pending',
      },
    ],
    createdAt: '2024-07-06T16:30:00',
    updatedAt: '2024-07-06T17:30:00',
  },
  {
    id: '19',
    title: '辦公大樓蚊蟲控制',
    description: '辦公大樓地下停車場蚊蟲問題需要處理。',
    pestType: PestType.MOSQUITO,
    location: {
      latitude: 25.0450,
      longitude: 121.5600,
      city: '台北市',
      district: '信義區',
    },
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.NORMAL,
    budget: 2000,
    isImmediate: false,
    createdBy: '1',
    assignedTo: '2',
    applicants: [
      {
        id: 'app13',
        taskId: '19',
        terminatorId: '2',
        appliedAt: '2024-07-05T14:00:00',
        status: 'selected',
      },
    ],
    createdAt: '2024-07-05T13:30:00',
    updatedAt: '2024-07-06T10:00:00',
  },
  {
    id: '20',
    title: '美容院除蟲服務',
    description: '美容院洗髮區發現小蟲，需要徹底清理。',
    pestType: PestType.OTHER,
    location: {
      latitude: 25.0400,
      longitude: 121.5300,
      city: '台北市',
      district: '大安區',
    },
    status: TaskStatus.PENDING,
    priority: TaskPriority.NORMAL,
    budget: 1200,
    isImmediate: false,
    createdBy: '1',
    applicants: [],
    createdAt: '2024-07-06T18:00:00',
    updatedAt: '2024-07-06T18:00:00',
  },
  {
    id: '21',
    title: '健身房蟑螂處理',
    description: '健身房更衣室發現蟑螂，影響會員使用體驗。',
    pestType: PestType.COCKROACH,
    location: {
      latitude: 25.0500,
      longitude: 121.5500,
      city: '台北市',
      district: '松山區',
    },
    status: TaskStatus.PENDING,
    priority: TaskPriority.URGENT,
    budget: 1600,
    isImmediate: true,
    createdBy: '1',
    applicants: [],
    createdAt: '2024-07-06T19:00:00',
    updatedAt: '2024-07-06T19:00:00',
  },
  {
    id: '22',
    title: '書店除蟲維護',
    description: '書店書架發現書蟲，需要定期維護。',
    pestType: PestType.OTHER,
    location: {
      latitude: 25.0320,
      longitude: 121.5150,
      city: '台北市',
      district: '中正區',
    },
    status: TaskStatus.COMPLETED,
    priority: TaskPriority.NORMAL,
    budget: 800,
    isImmediate: false,
    createdBy: '1',
    assignedTo: '3',
    applicants: [
      {
        id: 'app14',
        taskId: '22',
        terminatorId: '3',
        appliedAt: '2024-07-04T15:00:00',
        status: 'selected',
      },
    ],
    completionStatus: {
      fearStarConfirmed: true,
      terminatorConfirmed: true,
    },
    completedAt: '2024-07-05T12:00:00',
    createdAt: '2024-07-04T14:30:00',
    updatedAt: '2024-07-05T12:00:00',
  },
  {
    id: '23',
    title: '飯店房間除蚊',
    description: '飯店客房蚊子問題，影響客人休息。',
    pestType: PestType.MOSQUITO,
    location: {
      latitude: 25.0380,
      longitude: 121.5120,
      city: '台北市',
      district: '萬華區',
    },
    status: TaskStatus.PENDING_CONFIRMATION,
    priority: TaskPriority.URGENT,
    budget: 1100,
    isImmediate: true,
    createdBy: '1',
    applicants: [
      {
        id: 'app15',
        taskId: '23',
        terminatorId: '2',
        appliedAt: '2024-07-06T20:00:00',
        status: 'pending',
      },
    ],
    createdAt: '2024-07-06T19:30:00',
    updatedAt: '2024-07-06T20:00:00',
  },
  {
    id: '24',
    title: '藥局螞蟻防治',
    description: '藥局藥品存放區螞蟻入侵，需要專業處理。',
    pestType: PestType.ANT,
    location: {
      latitude: 25.0250,
      longitude: 121.4900,
      city: '新北市',
      district: '新莊區',
    },
    status: TaskStatus.IN_PROGRESS,
    priority: TaskPriority.NORMAL,
    budget: 1300,
    isImmediate: false,
    createdBy: '1',
    assignedTo: '3',
    applicants: [
      {
        id: 'app16',
        taskId: '24',
        terminatorId: '3',
        appliedAt: '2024-07-05T18:00:00',
        status: 'selected',
      },
    ],
    createdAt: '2024-07-05T17:30:00',
    updatedAt: '2024-07-06T11:00:00',
  },
  {
    id: '25',
    title: '社區大樓蟑螂處理',
    description: '社區大樓垃圾間蟑螂問題嚴重，需要定期處理。',
    pestType: PestType.COCKROACH,
    location: {
      latitude: 25.0600,
      longitude: 121.5200,
      city: '台北市',
      district: '中山區',
    },
    status: TaskStatus.PENDING,
    priority: TaskPriority.VERY_URGENT,
    budget: 2500,
    isImmediate: true,
    createdBy: '1',
    applicants: [],
    createdAt: '2024-07-07T08:00:00',
    updatedAt: '2024-07-07T08:00:00',
  },
  {
    id: '26',
    title: '幼稚園安全除蟲',
    description: '幼稚園遊戲區需要安全無毒的除蟲服務。',
    pestType: PestType.OTHER,
    location: {
      latitude: 25.0180,
      longitude: 121.4600,
      city: '新北市',
      district: '板橋區',
    },
    status: TaskStatus.PENDING_COMPLETION,
    priority: TaskPriority.URGENT,
    budget: 1800,
    isImmediate: false,
    createdBy: '1',
    assignedTo: '2',
    applicants: [
      {
        id: 'app17',
        taskId: '26',
        terminatorId: '2',
        appliedAt: '2024-07-05T19:00:00',
        status: 'selected',
      },
    ],
    completionStatus: {
      fearStarConfirmed: true,
      terminatorConfirmed: false,
    },
    createdAt: '2024-07-05T18:30:00',
    updatedAt: '2024-07-06T14:30:00',
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

