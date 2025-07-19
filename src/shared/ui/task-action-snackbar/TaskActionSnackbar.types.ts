export type TaskActionType = 'accept' | 'select' | 'complete'

export type SnackbarActionType = 'view_task' | 'my_tasks' | 'task_wall'

export interface TaskActionSnackbarProps {
  type: TaskActionType
  visible: boolean
  onDismiss: () => void
  onAction: (actionType: SnackbarActionType) => void
  taskTitle?: string
  terminatorName?: string
}

export interface SnackbarConfig {
  icon: string
  title: string
  subtitle: string
  actions: Array<{
    label: string
    type: SnackbarActionType
  }>
  backgroundColor: string
  iconColor: string
}