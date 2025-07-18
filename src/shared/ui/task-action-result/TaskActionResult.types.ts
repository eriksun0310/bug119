export type TaskActionResultType = 'accept' | 'complete' | 'withdraw' | 'delete' | 'cancel'

export interface TaskActionResultProps {
  type: TaskActionResultType
  message: string
  onViewTask?: () => void  // 設為可選，因為有些操作可能不需要跳轉
  buttonText?: string      // 自定義按鈕文字
  showButton?: boolean     // 是否顯示按鈕
}