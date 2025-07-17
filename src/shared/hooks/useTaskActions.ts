import { useCallback } from 'react'
import { Alert } from 'react-native'
import { mockUsers } from '@/shared/mocks'
import { showAlert } from '@/shared/utils'

/**
 * 任務操作邏輯 Hook
 * 統一處理任務相關的操作
 */
export const useTaskActions = () => {
  /**
   * 處理接受任務
   */
  const handleAcceptTask = useCallback(async () => {
    try {
      // 模擬 API 呼叫
      await new Promise(resolve => setTimeout(resolve, 1500))

      Alert.alert(
        '接案成功！',
        '您已成功接受此任務。請在「我的任務」中查看任務進度，進行中和已完成的任務才會顯示客戶聯絡資訊。',
        [
          {
            text: '確定',
            onPress: () => {
              // 更新任務狀態為已指派
              // 這裡實際會呼叫 API 更新狀態
            },
          },
        ]
      )
    } catch (error) {
      Alert.alert('接案失敗', '請稍後再試')
    }
  }, [])

  /**
   * 處理選擇終結者
   */
  const handleSelectTerminator = useCallback((application: any) => {
    const selectedTerminator = mockUsers.find(u => u.id === application.terminatorId)

    showAlert(
      '確認委託',
      `確定要委託「${selectedTerminator?.name}」處理這個任務嗎？`,
      [
        { text: '取消', style: 'cancel' },
        {
          text: '確定委託',
          onPress: () => {
            // TODO: 實際的委託邏輯
            showAlert('委託成功', '已成功委託給終結者，請等待開始處理。')
          },
        },
      ]
    )
  }, [])

  /**
   * 處理標記任務完成
   */
  const handleMarkCompleted = useCallback(async (taskId: string) => {
    try {
      // 模擬 API 呼叫
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      Alert.alert(
        '任務完成',
        '任務已標記為完成，等待對方確認。',
        [{ text: '確定' }]
      )
    } catch (error) {
      Alert.alert('操作失敗', '請稍後再試')
    }
  }, [])

  return {
    handleAcceptTask,
    handleSelectTerminator,
    handleMarkCompleted
  }
}