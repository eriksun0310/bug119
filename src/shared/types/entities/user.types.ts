// 用戶實體型別定義

export enum UserRole {
  FEAR_STAR = 'fear_star',        // 小怕星
  TERMINATOR = 'terminator',      // 蟲蟲終結者
  ADMIN = 'admin'                 // 管理員
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar?: string
  role: UserRole
  isVerified: boolean
  contactInfo: ContactInfo       // 通訊方式
  createdAt: string             // 建立時間 (ISO 8601 格式)
  updatedAt: string             // 更新時間 (ISO 8601 格式)
}

export interface UserProfile {
  userId: string
  location?: string
  rating: number
  totalReviews: number
  totalTasks: number
  joinDate: string              // 加入時間 (ISO 8601 格式)
}

// 蟲蟲終結者專用資料
export interface TerminatorProfile extends UserProfile {
  specialties: PestType[]         // 專長害蟲類型
  serviceArea: ServiceArea        // 服務範圍
  isAvailable: boolean           // 是否可接案
  hourlyRate: number             // 時薪
  experienceYears: number        // 經驗年數
}

export interface ServiceArea {
  center: {
    latitude: number
    longitude: number
  }
  radius: number                 // 服務半徑（公里）
  cities: string[]              // 服務城市
}

export enum PestType {
  COCKROACH = 'cockroach',      // 蟑螂
  ANT = 'ant',                  // 螞蟻
  MOSQUITO = 'mosquito',        // 蚊子
  SPIDER = 'spider',            // 蜘蛛
  OTHER = 'other'               // 其他
}

// 通訊方式
export interface ContactInfo {
  phone: string                  // 電話號碼（必填）
  line?: string                  // LINE ID
  telegram?: string             // Telegram
  preferredMethod: ContactMethod // 偏好的聯絡方式
}

export enum ContactMethod {
  PHONE = 'phone',
  LINE = 'line',
  TELEGRAM = 'telegram'
}