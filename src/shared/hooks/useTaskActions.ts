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

  /**
   * 處理刪除任務 (PENDING 狀態)
   */
  const handleDeleteTask = useCallback((taskId: string) => {
    showAlert('確認刪除', '確定要刪除這個任務嗎？刪除後無法復原。', [
      { text: '取消', style: 'cancel' },
      {
        text: '確定刪除',
        style: 'destructive',
        onPress: () => {
          try {
            // 從任務列表中移除任務
            const taskIndex = mockTasks.findIndex(t => t.id === taskId)
            if (taskIndex !== -1) {
              mockTasks.splice(taskIndex, 1)
            }

            Alert.alert('刪除成功', '任務已成功刪除。')
          } catch (error) {
            Alert.alert('刪除失敗', '請稍後再試')
          }
        },
      },
    ])
  }, [])

  /**
   * 處理取消任務 (PENDING_CONFIRMATION 狀態)
   */
  const handleCancelTask = useCallback((taskId: string) => {
    showAlert('確認取消', '確定要取消這個任務嗎？將通知所有申請者。', [
      { text: '取消', style: 'cancel' },
      {
        text: '確定取消',
        style: 'destructive',
        onPress: () => {
          try {
            // 更新任務狀態為取消
            const taskIndex = mockTasks.findIndex(t => t.id === taskId)
            if (taskIndex !== -1) {
              mockTasks[taskIndex] = {
                ...mockTasks[taskIndex],
                status: TaskStatus.CANCELLED,
                cancelledAt: new Date(),
                updatedAt: new Date(),
              }

              // 通知所有申請者
              const task = mockTasks[taskIndex]
              const applicantCount = task.applicants?.length || 0
              
              Alert.alert(
                '取消成功', 
                `任務已取消，已通知 ${applicantCount} 位申請者。`
              )
            }
          } catch (error) {
            Alert.alert('取消失敗', '請稍後再試')
          }
        },
      },
    ])
  }, [])

  /**
   * 處理刪除任務記錄 (COMPLETED 狀態)
   */
  const handleDeleteRecord = useCallback((taskId: string) => {
    showAlert('確認刪除', '確定要刪除這個任務記錄嗎？刪除後無法復原。', [
      { text: '取消', style: 'cancel' },
      {
        text: '確定刪除',
        style: 'destructive',
        onPress: () => {
          try {
            // 從任務列表中移除任務記錄
            const taskIndex = mockTasks.findIndex(t => t.id === taskId)
            if (taskIndex !== -1) {
              mockTasks.splice(taskIndex, 1)
            }

            Alert.alert('刪除成功', '任務記錄已成功刪除。')
          } catch (error) {
            Alert.alert('刪除失敗', '請稍後再試')
          }
        },
      },
    ])
  }, [])

  /**
   * 處理撤回申請 (PENDING_CONFIRMATION 狀態)
   */
  const handleWithdrawApplication = useCallback((applicationId: string) => {
    showAlert('確認撤回', '確定要撤回這個申請嗎？', [
      { text: '取消', style: 'cancel' },
      {
        text: '確定撤回',
        style: 'destructive',
        onPress: () => {
          try {
            // 找到包含此申請的任務
            const taskIndex = mockTasks.findIndex(task => 
              task.applicants?.some(app => app.id === applicationId)
            )
            
            if (taskIndex !== -1) {
              const task = mockTasks[taskIndex]
              
              // 移除申請者
              const updatedApplicants = task.applicants?.filter(app => app.id !== applicationId) || []
              
              // 如果沒有其他申請者，將任務狀態改回 PENDING
              const newStatus = updatedApplicants.length === 0 ? TaskStatus.PENDING : TaskStatus.PENDING_CONFIRMATION
              
              mockTasks[taskIndex] = {
                ...task,
                applicants: updatedApplicants,
                status: newStatus,
                updatedAt: new Date(),
              }
              
              Alert.alert('撤回成功', '已成功撤回申請。')
            }
          } catch (error) {
            Alert.alert('撤回失敗', '請稍後再試')
          }
        },
      },
    ])
  }, [])

  return {
    handleAcceptTask,
    handleSelectTerminator,
    handleMarkCompleted,
    handleDeleteTask,
    handleCancelTask,
    handleDeleteRecord,
    handleWithdrawApplication,
  }
}
