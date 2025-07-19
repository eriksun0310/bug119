import { Task, User } from '@/shared/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type ActionType = 'accept' | 'complete' | 'select'

export interface TaskStatusRendererProps {
  task: Task
  user: User | null
  contactPerson: User | null
  contactTitle: string
  onAcceptTask: (taskId?: string, onSuccess?: () => void) => void
  onSelectTerminator: (application: any, onSuccess?: () => void) => void
  onMarkCompleted?: (taskId: string, onSuccess?: () => void) => void
  isTablet: boolean
  navigation?: NativeStackNavigationProp<any>
}

export interface StatusRendererProps extends TaskStatusRendererProps {
  showActionResult?: boolean
  actionType?: ActionType
  setShowActionResult?: (show: boolean) => void
  setActionType?: (type: ActionType) => void
  actionHandlers?: ActionHandlers
}

export interface ActionHandlers {
  handleAcceptWithUI: (taskId?: string) => void
  handleCompleteWithUI: (taskId: string) => void
  handleSelectWithUI: (application: any) => void
}

export interface NavigationHandlers {
  navigateAfterAction: (actionType: ActionType) => void
}