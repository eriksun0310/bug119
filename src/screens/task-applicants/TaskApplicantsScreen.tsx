// 任務申請者列表畫面 - 小怕星選擇終結者

import { useResponsive } from '@/shared/hooks'
import { getAssignmentsByTaskId, mockTasks } from '@/shared/mocks/tasks.mock'
import { mockUserProfiles, mockUsers } from '@/shared/mocks/users.mock'
import { useTheme } from '@/shared/theme'
import { RootStackParamList, TaskAssignment, TaskStatus } from '@/shared/types'
import { ApplicantCard, ScreenHeader, TaskSummaryCard } from '@/shared/ui'
import { showAlert } from '@/shared/utils'
import { createStyles } from './TaskApplicantsScreen.styles'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

type TaskApplicantsRouteProp = RouteProp<RootStackParamList, 'TaskApplicants'>
type TaskApplicantsNavigationProp = NativeStackNavigationProp<RootStackParamList>

export const TaskApplicantsScreen = () => {
  const { theme } = useTheme()
  const navigation = useNavigation<TaskApplicantsNavigationProp>()
  const route = useRoute<TaskApplicantsRouteProp>()
  const { isTablet } = useResponsive()

  const { taskId } = route.params

  // 獲取任務資訊
  const task = mockTasks.find(t => t.id === taskId)

  // 獲取申請者列表
  const assignments = getAssignmentsByTaskId(taskId)

  // 處理選擇終結者
  const handleSelectTerminator = (assignment: TaskAssignment) => {
    const terminator = mockUsers.find(u => u.id === assignment.id)
    // const terminatorProfile =
    //   mockUserProfiles[assignment.id as keyof typeof mockUserProfiles]

    showAlert(
      '確認委託',
      `確定要委託「${terminator?.name}」處理這個任務嗎？\n\n提議價格：$${assignment.proposedPrice}`,
      [
        { text: '取消', style: 'cancel' },
        {
          text: '確定委託',
          onPress: () => {
            // TODO: 實際的委託邏輯
            showAlert('委託成功', '已成功委託給終結者，請等待開始處理。')
            navigation.goBack()
          },
        },
      ]
    )
  }

  const styles = createStyles(theme, isTablet)

  if (!task) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="任務不存在" showBackButton onBackPress={() => navigation.goBack()} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="選擇終結者12" showBackButton onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        <TaskSummaryCard task={task} />

        <Text style={styles.sectionTitle}>申請者列表 ({assignments.length}位)</Text>

        {assignments.length > 0 ? (
          <View style={styles.applicantsList}>
            {assignments.map(assignment => (
              <ApplicantCard
                key={assignment.id}
                assignment={assignment}
                onSelect={() => handleSelectTerminator(assignment)}
                taskStatus={TaskStatus.PENDING_CONFIRMATION}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>目前還沒有終結者申請這個任務</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}
