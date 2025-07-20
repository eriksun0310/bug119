import { mockUsers } from '@/shared/mocks'
import { showAlert } from '@/shared/utils'
import { useCallback, useState } from 'react'
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
  
  // 加入 loading 狀態管理
  const [loading, setLoading] = useState(false)
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  /**
   * 處理接受任務（終結者申請任務，需要小怕星確認）
   */
  const handleAcceptTask = useCallback(
    async (taskId?: string, onSuccess?: () => void) => {
      if (!taskId || !user) return false

      const executeAccept = async () => {
        setLoading(true)
        setLoadingAction('接受任務')
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
        } finally {
          setLoading(false)
          setLoadingAction(null)
        }
      }

      // 重要修復：等待用戶確認再決定是否執行操作
      return new Promise<boolean>((resolve) => {
        showAlert('確認接案', '確定要接受這個任務嗎？', [
          { 
            text: '取消', 
            style: 'cancel',
            onPress: () => resolve(false)
          },
          {
            text: '確定接受',
            onPress: async () => {
              const success = await executeAccept()
              resolve(success)
            },
          },
        ])
      })
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

    // 重要修復：返回 Promise 等待用戶確認
    return new Promise<boolean>((resolve) => {
      showAlert('確認委託', `確定要委託「${selectedTerminator?.name}」處理這個任務嗎？`, [
        { 
          text: '取消', 
          style: 'cancel',
          onPress: () => resolve(false)
        },
        {
          text: '確定委託',
          onPress: async () => {
            setLoading(true)
            setLoadingAction('選擇終結者')
            try {
              await selectTerminator(application.taskId, application.terminatorId)
              
              // 重要：先觸發回調設置 showActionResult，再 resolve Promise
              if (onSuccess) {
                onSuccess()
              }
              
              // 給一個微小的延遲確保 UI 狀態更新
              setTimeout(() => resolve(true), 10)
            } catch (error) {
              Alert.alert('委託失敗', error instanceof Error ? error.message : '請稍後再試')
              resolve(false)
            } finally {
              setLoading(false)
              setLoadingAction(null)
            }
          },
        },
      ])
    })
  }, [selectTerminator])

  /**
   * 處理標記任務完成（依據新業務邏輯）
   */
  const handleMarkCompleted = useCallback(async (taskId: string, onSuccess?: () => void) => {
    if (!user) return false

    const completedBy = user.role === 'fear_star' ? 'fear_star' : 'terminator'
    const actionText = user.role === 'fear_star' ? '確認任務完成' : '確認任務完成'

    // 重要修復：返回 Promise 等待用戶確認
    return new Promise<boolean>((resolve) => {
      showAlert('確認完成', `確定要${actionText}嗎？`, [
        { 
          text: '取消', 
          style: 'cancel',
          onPress: () => resolve(false)
        },
        {
          text: '確定完成',
          onPress: async () => {
            setLoading(true)
            setLoadingAction('標記完成')
            try {
              await completeTask(taskId, completedBy)
              // 操作成功後觸發回調 - 不顯示 Alert，讓 UI 直接顯示成功狀態
              if (onSuccess) {
                onSuccess()
              }
              resolve(true)
            } catch (error) {
              Alert.alert('操作失敗', error instanceof Error ? error.message : '請稍後再試')
              resolve(false)
            } finally {
              setLoading(false)
              setLoadingAction(null)
            }
          },
        },
      ])
    })
  }, [user, completeTask])


  return {
    handleAcceptTask,
    handleApplyForTask,
    handleSelectTerminator,
    handleMarkCompleted,
    loading,
    loadingAction,
  }
}
