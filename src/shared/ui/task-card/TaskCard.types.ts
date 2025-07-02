// 任務卡片元件型別定義

import { Task } from '@/shared/types'
import { TouchableOpacityProps } from 'react-native'

export interface TaskCardProps extends Omit<TouchableOpacityProps, 'onPress'> {
  task: Task
  variant?: 'default' | 'compact'
  showDistance?: boolean
  distance?: number
  onPress?: (task: Task) => void
  onAccept?: (task: Task) => void
}