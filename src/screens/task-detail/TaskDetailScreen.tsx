// 任務詳細頁面 - 蟲蟲終結者查看任務詳情

import { useAuth, useResponsive } from '@/shared/hooks'
import { getAssignmentsByTaskId, mockTasks } from '@/shared/mocks'
import { mockUsers } from '@/shared/mocks/users.mock'
import { useTheme } from '@/shared/theme'
import { RootStackParamList, TaskAssignment, TaskStatus, UserRole } from '@/shared/types'
import { ApplicantCard, ScreenHeader, TaskSummaryCard } from '@/shared/ui'
import { showAlert } from '@/shared/utils'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'

type TaskDetailRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>
type TaskDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskDetail'>

export const TaskDetailScreen: React.FC = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const { isTablet } = useResponsive()
  const route = useRoute<TaskDetailRouteProp>()
  const navigation = useNavigation<TaskDetailNavigationProp>()

  // 根據 taskId 獲取任務資料
  const { taskId, fromTab } = route.params
  const task = mockTasks.find(t => t.id === taskId) || mockTasks[0]

  // 根據 fromTab 來調整顯示邏輯

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
              console.log('任務狀態更新為已指派')
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
      paddingBottom: isTablet ? theme.spacing.lg : 50, // 手機版添加底部 padding 避免被導航列遮住
      maxWidth: isTablet ? 1200 : undefined,
      width: '100%',
      alignSelf: 'center',
    },

    sectionTitle: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    taskTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    taskDescription: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
      lineHeight: 22,
      marginBottom: theme.spacing.md,
    },
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
    tag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F0F0F0',
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 6,
      borderRadius: theme.borderRadius.sm,
    },
    tagText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.xs,
    },
    urgentTag: {
      backgroundColor: '#FFE4E4',
    },
    urgentTagText: {
      color: theme.colors.error,
      fontWeight: '500',
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    infoText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
      flex: 1,
    },
    infoSubText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.sm,
    },
    budgetContainer: {
      backgroundColor: 'transparent',
      borderRadius: theme.borderRadius.lg,
      paddingTop: theme.spacing.sm,
      alignItems: 'flex-start',
    },
    budgetText: {
      fontSize: theme.fontSize.xl,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
    },
    budgetSubText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.spacing.xs,
    },
    customerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F8F8F8',
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.md,
    },
    customerInfo: {
      flex: 1,
    },
    customerName: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
    },
    customerRating: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing.xs,
    },
    ratingText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.xs,
    },
    contactButton: {
      backgroundColor: theme.colors.secondary,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
    },
    contactHint: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.spacing.sm,
      fontStyle: 'italic',
    },
    contactInfoContainer: {
      backgroundColor: '#F8F8F8',
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      marginTop: theme.spacing.md,
    },
    contactInfoTitle: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    contactInfoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    contactIcon: {
      marginRight: theme.spacing.xs,
    },
    contactInfoLabel: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      width: 80,
    },
    contactInfoValue: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.text,
      flex: 1,
    },
    actionButtons: {
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
    },
    // 申請者列表樣式
    applicantsList: {
      flexDirection: isTablet ? 'row' : 'column',
      flexWrap: isTablet ? 'wrap' : 'nowrap',
      justifyContent: isTablet ? 'flex-start' : 'flex-start',
      alignItems: isTablet ? 'flex-start' : 'stretch',
      gap: theme.spacing.md,
    },
    applicantCardTablet: {
      width: '48%',
    },
    emptyApplicants: {
      textAlign: 'center',
      color: theme.colors.textSecondary,
      fontSize: theme.fontSize.sm,
      fontStyle: 'italic',
      marginTop: theme.spacing.md,
    },
    summaryCard: {
      backgroundColor: '#F0F0F0',
      padding: theme.spacing.md,
    },
  })

  return (
    <View style={styles.container}>
      <ScreenHeader title="任務詳情" showBackButton onBackPress={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        {/* 頂部任務摘要卡片 */}
        <TaskSummaryCard task={task} />

        <Text style={styles.sectionTitle}>{contactTitle}</Text>

        {/* 根據用戶角色和任務狀態顯示不同內容 */}
        {task.status === TaskStatus.PENDING_CONFIRMATION &&
        user?.role === UserRole.FEAR_STAR &&
        task?.applicants?.length > 0 ? (
          // 小怕星在 PENDING_CONFIRMATION 狀態：顯示所有申請者
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
        ) : (
          // 其他情況：顯示對方聯絡人資訊
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
        )}

        {/* 小怕星的待確認任務但沒有申請者 */}
        {user?.role === UserRole.FEAR_STAR &&
          task.status === TaskStatus.PENDING &&
          assignments.length === 0 && (
            <Text style={styles.emptyApplicants}>目前還沒有終結者申請這個任務</Text>
          )}
      </ScrollView>
    </View>
  )
}
