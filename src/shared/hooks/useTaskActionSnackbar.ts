import { useState, useCallback } from 'react'
import { TaskActionType, SnackbarActionType } from '@/shared/ui/task-action-snackbar'

interface SnackbarState {
  visible: boolean
  type: TaskActionType | null
  taskTitle?: string
  terminatorName?: string
}

/**
 * 任務操作 Snackbar 狀態管理 Hook
 * 統一管理 Snackbar 的顯示、隱藏和動作處理
 */
export const useTaskActionSnackbar = () => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    visible: false,
    type: null,
  })

  /**
   * 顯示 Snackbar
   */
  const showSnackbar = useCallback((
    type: TaskActionType,
    options?: {
      taskTitle?: string
      terminatorName?: string
    }
  ) => {
    setSnackbarState({
      visible: true,
      type,
      taskTitle: options?.taskTitle,
      terminatorName: options?.terminatorName,
    })
  }, [])

  /**
   * 隱藏 Snackbar
   */
  const hideSnackbar = useCallback(() => {
    setSnackbarState(prev => ({
      ...prev,
      visible: false,
    }))
  }, [])

  /**
   * 處理 Snackbar 動作點擊
   * 返回動作類型供外部處理導航
   */
  const handleSnackbarAction = useCallback((actionType: SnackbarActionType) => {
    hideSnackbar()
    return actionType
  }, [hideSnackbar])

  return {
    snackbarState,
    showSnackbar,
    hideSnackbar,
    handleSnackbarAction,
  }
}