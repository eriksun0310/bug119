import { useCallback, useState } from 'react'
import { ActionType, TaskStatusRendererProps, ActionHandlers } from '../TaskStatusRenderer.types'

/**
 * 任務狀態操作邏輯 Hook
 * 統一處理所有任務操作的UI回調
 */
export const useTaskStatusActions = ({
  onAcceptTask,
  onMarkCompleted,
  onSelectTerminator,
}: Pick<TaskStatusRendererProps, 'onAcceptTask' | 'onMarkCompleted' | 'onSelectTerminator'>): {
  showActionResult: boolean
  actionType: ActionType
  setShowActionResult: (show: boolean) => void
  setActionType: (type: ActionType) => void
  actionHandlers: ActionHandlers
} => {
  const [showActionResult, setShowActionResult] = useState(false)
  const [actionType, setActionType] = useState<ActionType>('accept')

  // 處理接受任務
  const handleAcceptWithUI = useCallback((taskId?: string) => {
    onAcceptTask(taskId, () => {
      setActionType('accept')
      setShowActionResult(true)
    })
  }, [onAcceptTask])

  // 處理標記完成
  const handleCompleteWithUI = useCallback((taskId: string) => {
    if (onMarkCompleted) {
      onMarkCompleted(taskId, () => {
        setActionType('complete')
        setShowActionResult(true)
      })
    }
  }, [onMarkCompleted])

  // 處理選擇終結者
  const handleSelectWithUI = useCallback((application: any) => {
    onSelectTerminator(application, () => {
      setActionType('select')
      setShowActionResult(true)
    })
  }, [onSelectTerminator])

  const actionHandlers: ActionHandlers = {
    handleAcceptWithUI,
    handleCompleteWithUI,
    handleSelectWithUI,
  }

  return {
    showActionResult,
    actionType,
    setShowActionResult,
    setActionType,
    actionHandlers,
  }
}