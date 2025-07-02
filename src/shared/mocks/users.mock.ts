// 測試用戶假資料

import { User, UserRole, PestType } from '@/shared/types'

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
    createdAt: new Date('2023-06-01'),
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