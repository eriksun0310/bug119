// 統一的選項配置檔案
// 所有選擇器元件的選項配置都集中在這裡管理

import {
  AlertTriangle,
  Bug,
  Clock,
  MessageCircle,
  Phone,
  Zap,
} from 'lucide-react-native'
import * as React from 'react'
import { ContactMethod, Gender, PestType, TaskPriority, UserRole } from '../types'
import type { SegmentOption } from '../ui'

// ================================
// 性別選項配置
// ================================
export const GENDER_OPTIONS: SegmentOption<Gender>[] = [
  { value: Gender.MALE, label: '男' },
  { value: Gender.FEMALE, label: '女' },
  { value: Gender.ANY, label: '不限' },
] as const

// ================================
// 用戶角色選項配置
// ================================
export const USER_ROLE_OPTIONS: SegmentOption<UserRole>[] = [
  { value: UserRole.FEAR_STAR, label: '小怕星' },
  { value: UserRole.TERMINATOR, label: '蟲蟲終結者' },
  { value: UserRole.ADMIN, label: '管理員' },
] as const

// ================================
// 聯絡方式選項配置
// ================================
export const CONTACT_METHOD_OPTIONS: SegmentOption<ContactMethod>[] = [
  {
    value: ContactMethod.PHONE,
    label: '電話',
    icon: Phone,
  },
  {
    value: ContactMethod.LINE,
    label: 'LINE',
    icon: MessageCircle,
  },
] as const

// ================================
// 害蟲類型選項配置
// ================================
export interface PestTypeOption {
  type: PestType
  name: string
  icon: React.ComponentType<any>
  description: string
}

export const PEST_TYPE_OPTIONS: PestTypeOption[] = [
  {
    type: PestType.COCKROACH,
    name: '蟑螂',
    icon: Bug,
    description: '常見於廚房、浴室等潮濕環境',
  },
  {
    type: PestType.ANT,
    name: '螞蟻',
    icon: Bug,
    description: '成群出現，喜歡甜食和食物殘渣',
  },
  {
    type: PestType.MOSQUITO,
    name: '蚊子',
    icon: Bug,
    description: '吸血昆蟲，傳播疾病風險',
  },
  {
    type: PestType.SPIDER,
    name: '蜘蛛',
    icon: Bug,
    description: '結網捕食，角落常見',
  },
  {
    type: PestType.OTHER,
    name: '其他',
    icon: Bug,
    description: '其他類型害蟲或不確定種類',
  },
] as const

// ================================
// 預算選項配置
// ================================
export interface BudgetOption {
  value: number
  label: string
}


// ================================
// 任務優先程度選項配置
// ================================
export interface PriorityOption {
  type: TaskPriority
  name: string
  icon: React.ComponentType<any>
  description: string
  color: string
}

export const PRIORITY_OPTIONS: PriorityOption[] = [
  {
    type: TaskPriority.NORMAL,
    name: '一般',
    icon: Clock,
    description: '可安排時間處理',
    color: '#666666',
  },
  {
    type: TaskPriority.URGENT,
    name: '緊急',
    icon: AlertTriangle,
    description: '需要盡快處理',
    color: '#FF9500',
  },
  {
    type: TaskPriority.VERY_URGENT,
    name: '非常緊急',
    icon: Zap,
    description: '立即需要處理',
    color: '#FF3B30',
  },
] as const

// ================================
// 任務牆篩選選項配置
// ================================

export interface FilterOption {
  key: string
  label: string
}

// 任務牆害蟲類型篩選選項（簡化版）
export const TASK_WALL_PEST_FILTER_OPTIONS: FilterOption[] = [
  { key: 'cockroach', label: '蟑螂' },
  { key: 'ant', label: '螞蟻' },
  { key: 'termite', label: '白蟻' },
  { key: 'mosquito', label: '蚊子' },
  { key: 'fly', label: '蒼蠅' },
  { key: 'other', label: '其他' },
] as const

// 任務牆優先程度篩選選項（簡化版）
export const TASK_WALL_PRIORITY_FILTER_OPTIONS: FilterOption[] = [
  { key: TaskPriority.VERY_URGENT, label: '非常緊急' },
  { key: TaskPriority.URGENT, label: '緊急' },
  { key: TaskPriority.NORMAL, label: '一般' },
] as const

// ================================
// 任務標籤頁選項配置
// ================================

export interface TaskTabOption {
  key: string
  title: string
}

export const TASK_TAB_OPTIONS: TaskTabOption[] = [
  {
    key: 'pending_confirmation',
    title: '待確認',
  },
  {
    key: 'in_progress',
    title: '進行中',
  },
  {
    key: 'pending_completion',
    title: '待完成',
  },
  {
    key: 'completed',
    title: '已完成',
  },
] as const

// ================================
// 選項配置的輔助函數
// ================================




// ================================
// 縣市和區域選項配置
// ================================
export interface CityOption {
  code: string
  name: string
  districts: string[]
}

export const CITY_OPTIONS: CityOption[] = [
  {
    code: 'TPE',
    name: '台北市',
    districts: [
      '中正區',
      '大同區',
      '中山區',
      '松山區',
      '大安區',
      '萬華區',
      '信義區',
      '士林區',
      '北投區',
      '內湖區',
      '南港區',
      '文山區',
    ],
  },
  {
    code: 'TPH',
    name: '新北市',
    districts: [
      '板橋區',
      '三重區',
      '中和區',
      '永和區',
      '新莊區',
      '新店區',
      '樹林區',
      '鶯歌區',
      '三峽區',
      '淡水區',
      '汐止區',
      '瑞芳區',
      '土城區',
      '蘆洲區',
      '五股區',
      '泰山區',
      '林口區',
      '深坑區',
      '石碇區',
      '坪林區',
      '三芝區',
      '石門區',
      '八里區',
      '平溪區',
      '雙溪區',
      '貢寮區',
      '金山區',
      '萬里區',
      '烏來區',
    ],
  },
  {
    code: 'TAO',
    name: '桃園市',
    districts: [
      '桃園區',
      '中壢區',
      '大溪區',
      '楊梅區',
      '蘆竹區',
      '大園區',
      '龜山區',
      '八德區',
      '龍潭區',
      '平鎮區',
      '新屋區',
      '觀音區',
      '復興區',
    ],
  },
  {
    code: 'TXG',
    name: '台中市',
    districts: [
      '中區',
      '東區',
      '南區',
      '西區',
      '北區',
      '北屯區',
      '西屯區',
      '南屯區',
      '太平區',
      '大里區',
      '霧峰區',
      '烏日區',
      '豐原區',
      '后里區',
      '石岡區',
      '東勢區',
      '和平區',
      '新社區',
      '潭子區',
      '大雅區',
      '神岡區',
      '大肚區',
      '沙鹿區',
      '龍井區',
      '梧棲區',
      '清水區',
      '大甲區',
      '外埔區',
      '大安區',
    ],
  },
  {
    code: 'TXN',
    name: '台南市',
    districts: [
      '中西區',
      '東區',
      '南區',
      '北區',
      '安平區',
      '安南區',
      '永康區',
      '歸仁區',
      '新化區',
      '左鎮區',
      '玉井區',
      '楠西區',
      '南化區',
      '仁德區',
      '關廟區',
      '龍崎區',
      '官田區',
      '麻豆區',
      '佳里區',
      '西港區',
      '七股區',
      '將軍區',
      '學甲區',
      '北門區',
      '新營區',
      '後壁區',
      '白河區',
      '東山區',
      '六甲區',
      '下營區',
      '柳營區',
      '鹽水區',
      '善化區',
      '大內區',
      '山上區',
      '新市區',
      '安定區',
    ],
  },
  {
    code: 'KAO',
    name: '高雄市',
    districts: [
      '新興區',
      '前金區',
      '苓雅區',
      '鹽埕區',
      '鼓山區',
      '旗津區',
      '前鎮區',
      '三民區',
      '楠梓區',
      '小港區',
      '左營區',
      '仁武區',
      '大社區',
      '岡山區',
      '路竹區',
      '阿蓮區',
      '田寮區',
      '燕巢區',
      '橋頭區',
      '梓官區',
      '彌陀區',
      '永安區',
      '湖內區',
      '鳳山區',
      '大寮區',
      '林園區',
      '鳥松區',
      '大樹區',
      '旗山區',
      '美濃區',
      '六龜區',
      '內門區',
      '杉林區',
      '甲仙區',
      '桃源區',
      '那瑪夏區',
      '茂林區',
      '茄萣區',
    ],
  },
] as const


// 根據縣市名稱獲取縣市選項
export const getCityOptionByName = (name: string) => {
  return CITY_OPTIONS.find(city => city.name === name)
}

// 用於 Select 元件的縣市選項
export const CITY_SELECT_OPTIONS = CITY_OPTIONS.map(city => ({
  label: city.name,
  value: city.name,
}))

// 根據縣市名稱獲取該縣市的區域選項
export const getDistrictOptions = (cityName: string) => {
  const city = getCityOptionByName(cityName)
  if (!city) return []

  return city.districts.map(district => ({
    label: district,
    value: district,
  }))
}
