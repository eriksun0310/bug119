// 任務詳細頁面 - 蟲蟲終結者查看任務詳情

import { useAuth, useResponsive } from '@/shared/hooks'
import { getAssignmentsByTaskId, mockTasks } from '@/shared/mocks'
import { mockUsers } from '@/shared/mocks/users.mock'
import { useTheme } from '@/shared/theme'
import { RootStackParamList, TaskAssignment, TaskStatus, UserRole } from '@/shared/types'
import { ApplicantCard, ScreenHeader, TaskCard } from '@/shared/ui'
import { showAlert } from '@/shared/utils'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { createStyles } from './TaskDetailScreen.styles'
import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'

type TaskDetailRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>
type TaskDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskDetail'>

export const TaskDetailScreen: React.FC = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const { isTablet } = useResponsive()
  const route = useRoute<TaskDetailRouteProp>()
  const navigation = useNavigation<TaskDetailNavigationProp>()

  // 根據 taskId 獲取任務資料
  const { taskId } = route.params
  const task = mockTasks.find(t => t.id === taskId) || mockTasks[0]

  // 獲取客戶資料
  const customer = mockUsers.find(u => u.id === task.createdBy)

  // 獲取終結者資訊
  const terminator = task.assignedTo ? mockUsers.find(u => u.id === task.assignedTo) : null

  // 獲取申請者列表（小怕星待確認任務時使用）
  const assignments = getAssignmentsByTaskId(taskId)

  // 根據當前用戶身份決定顯示哪個聯絡資訊
  const contactPerson = user?.role === UserRole.FEAR_STAR ? terminator : customer

  const contactTitle = user?.role === UserRole.FEAR_STAR ? '終結者資訊' : '小怕星資訊'

  // 處理接案
  const handleAcceptTask = async () => {
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
              // 任務狀態更新為已指派
            },
          },
        ]
      )
    } catch (error) {
      Alert.alert('接案失敗', '請稍後再試')
    }
  }

  // 處理選擇終結者（小怕星選擇申請者）
  const handleSelectTerminator = (application: any) => {
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
  }

  const styles = createStyles(theme, isTablet)

  return (
    <View style={styles.container}>
      <ScreenHeader title="任務詳情" showBackButton onBackPress={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        {/* 頂部任務摘要卡片 */}
        <View style={styles.taskCardContainer}>
          <TaskCard task={task} />
        </View>

        {/* 根據用戶角色和任務狀態顯示不同內容 */}
        {task.status === TaskStatus.PENDING_CONFIRMATION &&
        user?.role === UserRole.FEAR_STAR &&
        task?.applicants?.length > 0 ? (
          // 小怕星在 PENDING_CONFIRMATION 狀態：顯示所有申請者
          <View style={styles.contactSectionContainer}>
            <Text style={styles.sectionTitle}>{contactTitle}</Text>
            <View style={styles.applicantsList}>
              {task.applicants.map(application => {
                return (
                  <ApplicantCard
                    key={application.id}
                    application={application}
                    taskStatus={task.status}
                    currentUserRole={user?.role || UserRole.FEAR_STAR}
                    currentUserId={user?.id || '1'}
                    taskCreatedBy={task.createdBy}
                    onSelect={() => handleSelectTerminator(application)}
                    style={isTablet ? styles.applicantCardTablet : {}}
                  />
                )
              })}
            </View>
          </View>
        ) : task.status !== TaskStatus.PENDING || 
            (user?.role === UserRole.TERMINATOR) ||
            (user?.role === UserRole.FEAR_STAR && assignments.length > 0) ? (
          // 其他情況：顯示對方聯絡人資訊（除了小怕星的 PENDING 狀態且沒有申請者）
          <View style={styles.contactSectionContainer}>
            <Text style={styles.sectionTitle}>{contactTitle}</Text>
            <ApplicantCard
              application={{
                id: `contact-${contactPerson?.id}`,
                taskId: task.id,
                terminatorId: contactPerson?.id || '',
                appliedAt: task.createdAt,
                status: 'pending',
              }}
              taskStatus={task.status}
              currentUserRole={user?.role || UserRole.FEAR_STAR}
              currentUserId={user?.id || '1'}
              taskCreatedBy={task.createdBy}
              onSelect={() => {
                if (user?.role === UserRole.TERMINATOR && task.status === TaskStatus.PENDING) {
                  handleAcceptTask()
                }
              }}
            />
          </View>
        ) : (
          // 小怕星的 PENDING 狀態且沒有申請者
          <View style={styles.contactSectionContainer}>
            <Text style={styles.emptyApplicants}>目前還沒有終結者申請這個任務</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}
