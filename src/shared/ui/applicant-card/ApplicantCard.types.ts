import { TaskAssignment, TaskStatus } from '@/shared/types'
import { ViewStyle } from 'react-native'

export interface ApplicantCardProps {
  assignment: TaskAssignment
  onSelect: (assignment: TaskAssignment) => void
  // showSelectButton?: boolean
  style?: ViewStyle
  taskStatus:
    | TaskStatus.PENDING // 發布中 (接受任務 btn)
    | TaskStatus.IN_PROGRESS // 進行中 (顯示聯絡資訊)
    | TaskStatus.PENDING_CONFIRMATION // 待確認 (選擇委託 btn)
}
