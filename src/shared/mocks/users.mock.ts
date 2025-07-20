// 測試用戶假資料

import { ContactMethod, PestType, User, UserRole } from '@/shared/types'

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
      preferredMethod: ContactMethod.LINE,
    },
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-07-01T00:00:00.000Z',
   
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
      preferredMethod: ContactMethod.PHONE,
    },
    createdAt: '2023-06-01T00:00:00.000Z',
    updatedAt: '2024-07-01T00:00:00.000Z',
  },
  // 第三位終結者
  {
    id: '3',
    email: 'terminator3@test.com',
    name: '陳師傅專業除蟲',
    phone: '0956789123',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: UserRole.TERMINATOR,
    isVerified: true,
    contactInfo: {
      phone: '0956789123',
      line: 'chen_pest_expert',
      telegram: '@chen_pest',
      preferredMethod: ContactMethod.LINE,
    },
    createdAt: '2023-08-01T00:00:00.000Z',
    updatedAt: '2024-07-01T00:00:00.000Z',
  },
]

// 測試用戶的詳細資料
export const mockUserProfiles = {
  '1': {
    userId: '1',
    location: '台北市大安區',
    rating: 4.5,
    totalReviews: 8,
    totalTasks: 12,
    joinDate: '2024-01-01T00:00:00.000Z',
  },
  '2': {
    userId: '2',
    location: '新北市板橋區',
    rating: 4.8,
    totalReviews: 156,
    totalTasks: 203,
    joinDate: '2023-06-01T00:00:00.000Z',
    // 蟲蟲終結者專用資料
    specialties: [PestType.COCKROACH, PestType.ANT, PestType.MOSQUITO, PestType.SPIDER],
    serviceArea: {
      center: {
        latitude: 25.033,
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
    location: '台北市信義區',
    rating: 4.6,
    totalReviews: 89,
    totalTasks: 112,
    joinDate: '2023-08-01T00:00:00.000Z',
    specialties: [PestType.ANT, PestType.COCKROACH, PestType.OTHER],
    serviceArea: {
      center: {
        latitude: 25.033,
        longitude: 121.5654,
      },
      radius: 15,
      cities: ['台北市'],
    },
    isAvailable: true,
    hourlyRate: 900,
    experienceYears: 8,
  },
}

// 測試登入憑證
export const testCredentials = {
  fearStar: {
    email: 'fearstar@test.com',
    password: '123456',
    user: mockUsers[0],
  },
  terminator: {
    email: 'terminator@test.com',
    password: '123456',
    user: mockUsers[1],
  },
  // 註冊測試帳號
  registeredUser: {
    email: 'test@example.com',
    password: '123456',
    user: {
      id: '99',
      email: 'test@example.com',
      name: '測試用戶',
      phone: '0912345678',
      avatar: null,
      role: UserRole.FEAR_STAR,
      isVerified: true,
      contactInfo: {
        phone: '0912345678',
        line: '',
        telegram: '',
        preferredMethod: ContactMethod.PHONE,
      },
      location: {
        city: '台北市',
        district: '大安區',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
}
