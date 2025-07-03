// 根路由導航型別定義

export type RootStackParamList = {
  Splash: undefined
  Auth: undefined
  Main: undefined
  TaskDetail: { taskId: string }
  TaskApplicants: { taskId: string }
  EditProfile: undefined
  MessageDetail: { conversationId: string }
  Chat: { conversationId: string }
  Profile: { userId: string }
  Settings: undefined
  Notifications: undefined
}