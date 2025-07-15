// 任務申請者列表畫面 - 小怕星選擇終結者

import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView
} from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTheme } from '@/shared/theme'
import { useResponsive } from '@/shared/hooks'
import { ApplicantCard, ScreenHeader, Card } from '@/shared/ui'
import { showAlert } from '@/shared/utils'
import { 
  getAssignmentsByTaskId,
  mockTasks,
  getPestTypeDisplayName
} from '@/shared/mocks/tasks.mock'
import { mockUsers, mockUserProfiles } from '@/shared/mocks/users.mock'
import { RootStackParamList, TaskAssignment } from '@/shared/types'

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
    const terminator = mockUsers.find(u => u.id === assignment.terminatorId)
    const terminatorProfile = mockUserProfiles[assignment.terminatorId as keyof typeof mockUserProfiles]
    
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
          }
        }
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
    taskInfo: {
      marginBottom: theme.spacing.lg,
    },
    taskTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    taskMeta: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    sectionTitle: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing.xl,
    },
    emptyText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    applicantsList: {
      flexDirection: isTablet ? 'row' : 'column',
      flexWrap: isTablet ? 'wrap' : 'nowrap',
      justifyContent: isTablet ? 'flex-start' : 'stretch',
      alignItems: isTablet ? 'flex-start' : 'stretch',
      gap: theme.spacing.md,
    },
    applicantCardTablet: {
      width: '48%', // 每行顯示兩個卡片
    },
  })
  
  if (!task) {
    return (
      <View style={styles.container}>
        <ScreenHeader 
          title="任務不存在"
          showBackButton
          onBackPress={() => navigation.goBack()}
        />
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <ScreenHeader 
        title="選擇終結者"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.taskInfo}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskMeta}>
            害蟲類型：{getPestTypeDisplayName(task.pestType)}
          </Text>
          <Text style={styles.taskMeta}>
            預算範圍：${task.budget.min} - ${task.budget.max}
          </Text>
          <Text style={styles.taskMeta}>
            地點：{task.location.district}, {task.location.city}
          </Text>
        </Card>
        
        <Text style={styles.sectionTitle}>
          申請者列表 ({assignments.length}位)
        </Text>
        
        {assignments.length > 0 ? (
          <View style={styles.applicantsList}>
            {assignments.map(assignment => {
              const terminator = mockUsers.find(u => u.id === assignment.terminatorId)
              const profile = mockUserProfiles[assignment.terminatorId as keyof typeof mockUserProfiles]
              
              if (!terminator || !profile) return null
              
              return (
                <View key={assignment.terminatorId} style={isTablet ? styles.applicantCardTablet : undefined}>
                  <ApplicantCard
                    user={terminator}
                    profile={profile}
                    assignment={assignment}
                    onSelect={() => handleSelectTerminator(assignment)}
                  />
                </View>
              )
            })}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              目前還沒有終結者申請這個任務
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}