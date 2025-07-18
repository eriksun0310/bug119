import { mockUsers } from '@/shared/mocks'
import { TaskStatus } from '@/shared/types'
import { showAlert } from '@/shared/utils'
import { useCallback } from 'react'
import { Alert } from 'react-native'
import { useAuthRedux } from './useAuthRedux'
import { useTasksRedux } from './useTasksRedux'

/**
 * 任務操作邏輯 Hook
 * 統一處理任務相關的操作
 */
export const useTaskActions = () => {
  const { user } = useAuthRedux()
  const { 
    applyForTask, 
    acceptTask, 
    selectTerminator, 
    completeTask, 
    cancelTask,
    withdrawApplication,
    removeTaskData 
  } = useTasksRedux()
  /**
   * 處理接受任務（終結者申請任務，需要小怕星確認）
   */
  const handleAcceptTask = useCallback(
    async (taskId?: string, onSuccess?: () => void) => {
      if (!taskId || !user) return false

      const executeAccept = async () => {
        try {
          await applyForTask(taskId, user.id)
          // 操作成功後觸發回調 - 不顯示 Alert，讓 UI 直接顯示成功狀態
          if (onSuccess) {
            onSuccess()
          }
          return true
        } catch (error) {
          Alert.alert('接案失敗', error instanceof Error ? error.message : '請稍後再試')
          return false
        }
      }

      showAlert('確認接案', '確定要接受這個任務嗎？', [
        { text: '取消', style: 'cancel' },
        {
          text: '確定接受',
          onPress: executeAccept,
        },
      ])
      return true // 返回 true 表示開始處理
    },
    [user, applyForTask]
  )

  /**
   * 處理申請任務（終結者申請任務，需要小怕星確認）
   */
  const handleApplyForTask = useCallback(
    async (taskId: string, onSuccess?: () => void) => {
      if (!user) return false

      showAlert('確認申請', '確定要申請這個任務嗎？', [
        { text: '取消', style: 'cancel' },
        {
          text: '確定申請',
          onPress: async () => {
            try {
              await applyForTask(taskId, user.id)
              // 操作成功後觸發回調 - 不顯示 Alert，讓 UI 直接顯示成功狀態
              if (onSuccess) {
                onSuccess()
              }
            } catch (error) {
              Alert.alert('申請失敗', error instanceof Error ? error.message : '請稍後再試')
            }
          },
        },
      ])
    },
    [user, applyForTask]
  )

  /**
   * 處理選擇終結者
   */
  const handleSelectTerminator = useCallback((application: any, onSuccess?: () => void) => {
    const selectedTerminator = mockUsers.find(u => u.id === application.terminatorId)

    showAlert('確認委託', `確定要委託「${selectedTerminator?.name}」處理這個任務嗎？`, [
      { text: '取消', style: 'cancel' },
      {
        text: '確定委託',
        onPress: async () => {
          try {
            await selectTerminator(application.taskId, application.terminatorId)
            // 操作成功後觸發回調 - 不顯示 Alert，讓 UI 直接顯示成功狀態
            if (onSuccess) {
              onSuccess()
            }
          } catch (error) {
            Alert.alert('委託失敗', error instanceof Error ? error.message : '請稍後再試')
          }
        },
      },
    ])
  }, [selectTerminator])

  /**
   * 處理標記任務完成
   */
  const handleMarkCompleted = useCallback(async (taskId: string, onSuccess?: () => void) => {
    if (!user) return

    const completedBy = user.role === 'fear_star' ? 'fear_star' : 'terminator'

    showAlert('確認完成', '確定要標記此任務為完成嗎？', [
      { text: '取消', style: 'cancel' },
      {
        text: '確定完成',
        onPress: async () => {
          try {
            await completeTask(taskId, completedBy)
            // 操作成功後觸發回調 - 不顯示 Alert，讓 UI 直接顯示成功狀態
            if (onSuccess) {
              onSuccess()
            }
          } catch (error) {
            Alert.alert('操作失敗', error instanceof Error ? error.message : '請稍後再試')
          }
        },
      },
    ])
  }, [user, completeTask])

  /**
   * 處理刪除任務 (PENDING 狀態)
   */
  const handleDeleteTask = useCallback((taskId: string, onSuccess?: () => void) => {
    showAlert('確認刪除', '確定要刪除這個任務嗎？此操作無法復原。', [
      { text: '取消', style: 'cancel' },
      {
        text: '確定刪除',
        style: 'destructive',
        onPress: () => {
          try {
            // 操作成功後觸發回調 - 不顯示 Alert，讓 UI 直接顯示成功狀態
            if (onSuccess) {
              onSuccess()
            } else {
              removeTaskData(taskId)
            }
          } catch (error) {
            Alert.alert('刪除失敗', '請稍後再試')
          }
        },
      },
    ])
  }, [removeTaskData])

  /**
   * 處理取消任務 (PENDING_CONFIRMATION 狀態)
   */
  const handleCancelTask = useCallback((taskId: string, onSuccess?: () => void) => {
    showAlert('確認取消', '確定要取消這個任務嗎？將通知所有申請者。', [
      { text: '取消', style: 'cancel' },
      {
        text: '確定取消',
        style: 'destructive',
        onPress: async () => {
          try {
            await cancelTask(taskId)
            // 操作成功後觸發回調 - 不顯示 Alert，讓 UI 直接顯示成功狀態
            if (onSuccess) {
              onSuccess()
            }
          } catch (error) {
            Alert.alert('取消失敗', error instanceof Error ? error.message : '請稍後再試')
          }
        },
      },
    ])
  }, [cancelTask])

  /**
   * 處理刪除任務記錄 (COMPLETED 狀態)
   */
  const handleDeleteRecord = useCallback((taskId: string, onSuccess?: () => void) => {
    showAlert('確認刪除記錄', '確定要刪除這個任務記錄嗎？此操作無法復原。', [
      { text: '取消', style: 'cancel' },
      {
        text: '確定刪除',
        style: 'destructive',
        onPress: () => {
          try {
            // 先觸發回調顯示成功狀態，延遲刪除任務
            if (onSuccess) {
              onSuccess()
            }
            
            // 延遲刪除任務，讓 TaskActionResult 有時間顯示
            setTimeout(() => {
              removeTaskData(taskId)
            }, 100)
          } catch (error) {
            Alert.alert('刪除失敗', '請稍後再試')
          }
        },
      },
    ])
  }, [removeTaskData])

  /**
   * 處理撤回申請 (PENDING_CONFIRMATION 狀態)
   */
  const handleWithdrawApplication = useCallback((taskId: string, applicationId: string, onSuccess?: () => void) => {
    showAlert('確認撤回', '確定要撤回這個申請嗎？', [
      { text: '取消', style: 'cancel' },
      {
        text: '確定撤回',
        style: 'destructive',
        onPress: async () => {
          try {
            await withdrawApplication(taskId, applicationId)
            
            // 操作成功後觸發回調 - 不顯示 Alert，讓 UI 直接顯示成功狀態
            if (onSuccess) {
              onSuccess()
            }
          } catch (error) {
            Alert.alert('撤回失敗', error instanceof Error ? error.message : '請稍後再試')
          }
        },
      },
    ])
  }, [withdrawApplication])

  return {
    handleAcceptTask,
    handleApplyForTask,
    handleSelectTerminator,
    handleMarkCompleted,
    handleDeleteTask,
    handleCancelTask,
    handleDeleteRecord,
    handleWithdrawApplication,
  }
}
