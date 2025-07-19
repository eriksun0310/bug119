import { mockUsers } from '@/shared/mocks'
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
    selectTerminator, 
    completeTask
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
   * 處理標記任務完成（依據新業務邏輯）
   */
  const handleMarkCompleted = useCallback(async (taskId: string, onSuccess?: () => void) => {
    if (!user) return

    const completedBy = user.role === 'fear_star' ? 'fear_star' : 'terminator'
    const actionText = user.role === 'fear_star' ? '確認任務完成' : '確認任務完成'

    showAlert('確認完成', `確定要${actionText}嗎？`, [
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


  return {
    handleAcceptTask,
    handleApplyForTask,
    handleSelectTerminator,
    handleMarkCompleted,
  }
}
