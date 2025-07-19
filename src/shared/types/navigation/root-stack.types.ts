// 根路由導航型別定義

export type RootStackParamList = {
  Splash: undefined
  Auth: undefined
  Main: { 
    screen?: string
    params?: { initialTab?: 'pending_confirmation' | 'in_progress' | 'pending_completion' | 'completed' }
  } | undefined
  TaskWall: undefined
  TaskDetail: { taskId: string; fromTab?: 'pending_confirmation' | 'in_progress' | 'pending_completion' | 'completed' }
  TaskApplicants: { taskId: string }
  EditProfile: undefined
  MessageDetail: { conversationId: string }
  Chat: { conversationId: string }
  Profile: { userId: string }
  Settings: undefined
  Notifications: undefined
  MyTasksList: { fromPublish?: boolean } | undefined
}