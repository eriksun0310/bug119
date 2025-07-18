// 根路由導航型別定義

export type RootStackParamList = {
  Splash: undefined
  Auth: undefined
  Main: { 
    screen?: string
    params?: { initialTab?: 'pending_confirmation' | 'in_progress' | 'completed' }
  } | undefined
  TaskWall: undefined
  TaskDetail: { taskId: string; fromTab?: 'ongoing' | 'pending' | 'completed' }
  TaskApplicants: { taskId: string }
  EditProfile: undefined
  MessageDetail: { conversationId: string }
  Chat: { conversationId: string }
  Profile: { userId: string }
  Settings: undefined
  Notifications: undefined
  MyTasksList: { fromPublish?: boolean } | undefined
}