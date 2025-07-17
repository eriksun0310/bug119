import { mockTasks, mockUsers } from '@/shared/mocks'
import { TaskStatus } from '@/shared/types'
import { showAlert } from '@/shared/utils'
import { useCallback } from 'react'
import { Alert } from 'react-native'
import { useAuth } from './useAuth'

/**
 * 任務操作邏輯 Hook
 * 統一處理任務相關的操作
 */
export const useTaskActions = () => {
  const { user } = useAuth()
  /**
   * 處理接受任務
   */
  const handleAcceptTask = useCallback(
    (taskId?: string) => {
      if (!taskId || !user) return false

      showAlert('確認接案', '確定要接受這個任務嗎？', [
        { text: '取消', style: 'cancel' },
        {
          text: '確定接受',
          onPress: async () => {
            try {
              // 更新任務狀態：新增申請者
              const taskIndex = mockTasks.findIndex(t => t.id === taskId)
              if (taskIndex !== -1) {
                const task = mockTasks[taskIndex]

                // 檢查是否已經申請過
                const hasApplied = task.applicants?.some(app => app.terminatorId === user.id)
                if (hasApplied) {
                  Alert.alert('提示', '您已經申請過此任務了')
                  return
                }

                // 新增申請者
                const newApplication = {
                  id: `app_${Date.now()}`,
                  taskId: taskId,
                  terminatorId: user.id,
                  appliedAt: new Date(),
                  status: 'pending' as const,
                }

                mockTasks[taskIndex] = {
                  ...task,
                  applicants: [...(task.applicants || []), newApplication],
                  status: TaskStatus.PENDING_CONFIRMATION,
                  updatedAt: new Date(),
                }

                Alert.alert(
                  '接案成功！',
                  '您已成功接受此任務。請在「我的任務」中查看任務進度，進行中和已完成的任務才會顯示客戶聯絡資訊。'
                )
              }
            } catch (error) {
              Alert.alert('接案失敗', '請稍後再試')
            }
          },
        },
      ])
    },
    [user]
  )

  /**
   * 處理選擇終結者
   */
  const handleSelectTerminator = useCallback((application: any) => {
    const selectedTerminator = mockUsers.find(u => u.id === application.terminatorId)

    showAlert('確認委託', `確定要委託「${selectedTerminator?.name}」處理這個任務嗎？`, [
      { text: '取消', style: 'cancel' },
      {
        text: '確定委託',
        onPress: () => {
          try {
            // 更新任務狀態
            const taskIndex = mockTasks.findIndex(t => t.id === application.taskId)
            if (taskIndex !== -1) {
              mockTasks[taskIndex] = {
                ...mockTasks[taskIndex],
                status: TaskStatus.IN_PROGRESS,
                assignedTo: application.terminatorId,
                updatedAt: new Date(),
              }
            }

            showAlert('委託成功', '已成功委託給終結者，請等待開始處理。')
          } catch (error) {
            showAlert('委託失敗', '請稍後再試')
          }
        },
      },
    ])
  }, [])

  /**
   * 處理標記任務完成
   */
  const handleMarkCompleted = useCallback(async (taskId: string) => {
    showAlert('確認完成', '確定要標記此任務為完成嗎？', [
      { text: '取消', style: 'cancel' },
      {
        text: '確定完成',
        onPress: async () => {
          try {
            // 模擬 API 呼叫
            await new Promise(resolve => setTimeout(resolve, 1000))

            Alert.alert('任務完成', '任務已標記為完成，等待對方確認。', [{ text: '確定' }])
          } catch (error) {
            Alert.alert('操作失敗', '請稍後再試')
          }
        },
      },
    ])
  }, [])

  return {
    handleAcceptTask,
    handleSelectTerminator,
    handleMarkCompleted,
  }
}
