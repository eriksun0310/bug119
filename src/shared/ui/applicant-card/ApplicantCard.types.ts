import { ViewStyle } from 'react-native'
import { TaskAssignment } from '@/shared/types'

export interface ApplicantCardProps {
  assignment: TaskAssignment
  onSelect: (assignment: TaskAssignment) => void
  showSelectButton?: boolean
  style?: ViewStyle
}