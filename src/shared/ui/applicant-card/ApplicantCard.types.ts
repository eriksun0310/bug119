import { TaskApplication, TaskAssignment, TaskStatus, UserRole } from '@/shared/types'
import { ViewStyle } from 'react-native'

export interface ApplicantCardProps {
  application?: TaskApplication // 申請記錄（用於 PENDING_CONFIRMATION 狀態）
  assignment?: TaskAssignment // 指派記錄（用於 IN_PROGRESS 狀態）
  onSelect: (data: TaskApplication | TaskAssignment) => void
  style?: ViewStyle
  taskStatus: TaskStatus
  currentUserRole: UserRole // 當前使用者角色
  currentUserId: string // 當前使用者 ID
  taskCreatedBy?: string // 任務創建者ID（小怕星ID）
}
