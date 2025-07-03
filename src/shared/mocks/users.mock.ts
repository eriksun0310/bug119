// 測試用戶假資料

import { User, UserRole, PestType, ContactMethod } from '@/shared/types'

export const mockUsers: User[] = [
  // 小怕星測試帳號
  {
    id: '1',
    email: 'fearstar@test.com',
    name: '小怕星測試',
    phone: '0912345678',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c9c99ee3?w=150',
    role: UserRole.FEAR_STAR,
    isVerified: true,
    contactInfo: {
      phone: '0912345678',
      line: 'fearstar_line',
      preferredMethod: ContactMethod.LINE
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-07-01'),
  },
  // 蟲蟲終結者測試帳號
  {
    id: '2',
    email: 'terminator@test.com',
    name: '李師傅除蟲專家',
    phone: '0987654321',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    role: UserRole.TERMINATOR,
    isVerified: true,
    contactInfo: {
      phone: '0987654321',
      line: 'master_lee_pest',
      telegram: '@masterlee_pest',
      preferredMethod: ContactMethod.PHONE
    },
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-07-01'),
  },
  // 更多終結者
  {
    id: '3',
    email: 'terminator2@test.com',
    name: '環保除蟲王小明',
    phone: '0956789123',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: UserRole.TERMINATOR,
    isVerified: true,
    contactInfo: {
      phone: '0956789123',
      line: 'eco_pest_ming',
      preferredMethod: ContactMethod.LINE
    },
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2024-07-01'),
  },
  {
    id: '4',
    email: 'terminator3@test.com',
    name: '快速除蟲阿華',
    phone: '0923456789',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    role: UserRole.TERMINATOR,
    isVerified: true,
    contactInfo: {
      phone: '0923456789',
      telegram: '@fast_pest_hua',
      preferredMethod: ContactMethod.PHONE
    },
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-07-01'),
  }
]

// 測試用戶的詳細資料
export const mockUserProfiles = {
  '1': {
    userId: '1',
    bio: '我很怕蟲，需要專業的除蟲服務',
    location: '台北市大安區',
    rating: 4.5,
    totalReviews: 8,
    totalTasks: 12,
    joinDate: new Date('2024-01-01'),
  },
  '2': {
    userId: '2',
    bio: '專業除蟲師傅，15年經驗，服務範圍涵蓋大台北地區',
    location: '新北市板橋區',
    rating: 4.8,
    totalReviews: 156,
    totalTasks: 203,
    joinDate: new Date('2023-06-01'),
    // 蟲蟲終結者專用資料
    specialties: [PestType.COCKROACH, PestType.ANT, PestType.MOSQUITO, PestType.SPIDER],
    serviceArea: {
      center: {
        latitude: 25.0330,
        longitude: 121.5654,
      },
      radius: 20,
      cities: ['台北市', '新北市'],
    },
    isAvailable: true,
    hourlyRate: 800,
    experienceYears: 15,
  },
  '3': {
    userId: '3',
    bio: '專精環保無毒除蟲，家中有小孩寵物也安心',
    location: '台北市信義區',
    rating: 4.6,
    totalReviews: 89,
    totalTasks: 112,
    joinDate: new Date('2023-08-15'),
    specialties: [PestType.COCKROACH, PestType.ANT, PestType.OTHER],
    serviceArea: {
      center: {
        latitude: 25.0330,
        longitude: 121.5654,
      },
      radius: 15,
      cities: ['台北市'],
    },
    isAvailable: true,
    hourlyRate: 900,
    experienceYears: 8,
  },
  '4': {
    userId: '4',
    bio: '快速到場，當天解決蟲害問題，價格實惠',
    location: '新北市中和區',
    rating: 4.3,
    totalReviews: 67,
    totalTasks: 89,
    joinDate: new Date('2023-12-01'),
    specialties: [PestType.SPIDER, PestType.MOSQUITO, PestType.OTHER],
    serviceArea: {
      center: {
        latitude: 25.0078,
        longitude: 121.4626,
      },
      radius: 25,
      cities: ['新北市', '台北市'],
    },
    isAvailable: true,
    hourlyRate: 650,
    experienceYears: 5,
  }
}

// 測試登入憑證
export const testCredentials = {
  fearStar: {
    email: 'fearstar@test.com',
    password: '123456',
    user: mockUsers[0]
  },
  terminator: {
    email: 'terminator@test.com', 
    password: '123456',
    user: mockUsers[1]
  }
}