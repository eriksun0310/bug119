import { useCallback, useState, useRef, useEffect } from 'react'
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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 清理定時器
  const clearActionResultTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // 設置顯示結果並自動清除（現在不再使用，保留作為備用）
  const setShowActionResultWithTimeout = useCallback((show: boolean, type?: ActionType) => {
    clearActionResultTimeout()
    
    if (show && type) {
      setActionType(type)
      setShowActionResult(true)
      
      // 3秒後自動隱藏結果頁面（防止卡住）
      timeoutRef.current = setTimeout(() => {
        setShowActionResult(false)
      }, 3000)
    } else {
      setShowActionResult(false)
    }
  }, [clearActionResultTimeout])

  // 手動關閉結果頁面
  const hideActionResult = useCallback(() => {
    clearActionResultTimeout()
    setShowActionResult(false)
  }, [clearActionResultTimeout])

  // 處理接受任務
  const handleAcceptWithUI = useCallback(async (taskId?: string) => {
    const success = await onAcceptTask(taskId, () => {
      setShowActionResultWithTimeout(true, 'accept')
    })
    // 如果用戶取消操作，不需要做任何事
    return success
  }, [onAcceptTask, setShowActionResultWithTimeout])

  // 處理標記完成
  const handleCompleteWithUI = useCallback(async (taskId: string) => {
    if (onMarkCompleted) {
      const success = await onMarkCompleted(taskId, () => {
        setShowActionResultWithTimeout(true, 'complete')
      })
      return success
    }
    return false
  }, [onMarkCompleted, setShowActionResultWithTimeout])

  // 處理選擇終結者
  const handleSelectWithUI = useCallback(async (application: any) => {
    const success = await onSelectTerminator(application, () => {
      setShowActionResultWithTimeout(true, 'select')
    })
    return success
  }, [onSelectTerminator, setShowActionResultWithTimeout])

  const actionHandlers: ActionHandlers = {
    handleAcceptWithUI,
    handleCompleteWithUI,
    handleSelectWithUI,
  }

  // 清理定時器
  useEffect(() => {
    return () => {
      clearActionResultTimeout()
    }
  }, [clearActionResultTimeout])

  return {
    showActionResult,
    actionType,
    setShowActionResult: hideActionResult,
    setActionType,
    actionHandlers,
  }
}