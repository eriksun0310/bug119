// 任務卡片元件型別定義

import { Task, UserRole } from '../../types'
import { TouchableOpacityProps } from 'react-native'

export interface TaskCardProps extends Omit<TouchableOpacityProps, 'onPress'> {
  task: Task
  variant?: 'default' | 'compact'
  showDistance?: boolean
  distance?: number
  showContactInfo?: boolean
  currentUserRole?: UserRole
  onPress?: (task: Task) => void
}