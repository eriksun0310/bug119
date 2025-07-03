// 任務列表畫面 - 根據用戶角色顯示不同內容

import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@/shared/theme'
import { useAuth } from '@/shared/hooks'
import { Card, SegmentedControl } from '@/shared/ui'
import { 
  mockTasks, 
  getAssignedTasks, 
  getTaskAssignmentCount,
  getPestTypeDisplayName,
  getTaskStatusDisplayName,
  getPriorityDisplayInfo
} from '@/shared/mocks/tasks.mock'
import { TaskStatus, UserRole } from '@/shared/types'

type TaskTabType = 'in_progress' | 'pending' | 'completed'

export const TasksScreen = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const insets = useSafeAreaInsets()
  const [activeTab, setActiveTab] = useState<TaskTabType>('in_progress')
  
  // 根據用戶角色和當前分頁獲取任務
  const getTasks = () => {
    if (!user) return []
    
    if (user.role === UserRole.FEAR_STAR) {
      // 小怕星：查看自己發布的任務
      const myTasks = mockTasks.filter(task => task.createdBy === user.id)
      
      switch (activeTab) {
        case 'in_progress':
          return myTasks.filter(task => 
            task.status === TaskStatus.ASSIGNED || task.status === TaskStatus.IN_PROGRESS
          )
        case 'pending':
          return myTasks.filter(task => task.status === TaskStatus.PENDING)
        case 'completed':
          return myTasks.filter(task => 
            task.status === TaskStatus.COMPLETED || task.status === TaskStatus.REVIEWED
          )
        default:
          return []
      }
    } else if (user.role === UserRole.TERMINATOR) {
      // 終結者：查看指派給自己的任務
      const assignedTasks = getAssignedTasks(user.id)
      
      switch (activeTab) {
        case 'in_progress':
          return assignedTasks.filter(task => 
            task.status === TaskStatus.ASSIGNED || task.status === TaskStatus.IN_PROGRESS
          )
        case 'pending':
          return assignedTasks.filter(task => task.status === TaskStatus.COMPLETED)
        case 'completed':
          return assignedTasks.filter(task => task.status === TaskStatus.REVIEWED)
        default:
          return []
      }
    }
    
    return []
  }
  
  const tasks = getTasks()
  
  // 分頁選項
  const tabOptions = [
    { key: 'in_progress', label: '進行中' },
    { key: 'pending', label: '待確認' },
    { key: 'completed', label: '已完成' },
  ]
  
  const renderTaskCard = (task: any) => {
    const priorityInfo = getPriorityDisplayInfo(task.priority)
    const assignmentCount = user?.role === UserRole.FEAR_STAR && task.status === TaskStatus.PENDING 
      ? getTaskAssignmentCount(task.id) 
      : 0
    
    return (
      <Card key={task.id} style={styles.taskCard}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <View style={[styles.priorityBadge, { backgroundColor: priorityInfo.color + '20' }]}>
            <Text style={[styles.priorityText, { color: priorityInfo.color }]}>
              {priorityInfo.name}
            </Text>
          </View>
        </View>
        
        <Text style={styles.taskDescription} numberOfLines={2}>
          {task.description}
        </Text>
        
        <View style={styles.taskInfo}>
          <Text style={styles.taskMeta}>
            害蟲：{getPestTypeDisplayName(task.pestType)}
          </Text>
          <Text style={styles.taskMeta}>
            狀態：{getTaskStatusDisplayName(task.status)}
          </Text>
        </View>
        
        <View style={styles.taskFooter}>
          <Text style={styles.budgetText}>
            預算：${task.budget.min} - ${task.budget.max}
          </Text>
          
          {/* 小怕星在待確認狀態顯示申請人數 */}
          {user?.role === UserRole.FEAR_STAR && task.status === TaskStatus.PENDING && assignmentCount > 0 && (
            <View style={styles.applicantsBadge}>
              <Text style={styles.applicantsText}>
                {assignmentCount} 位申請
              </Text>
            </View>
          )}
        </View>
      </Card>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingTop: insets.top + theme.spacing.lg,
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.lg,
    },
    title: {
      fontSize: theme.fontSize.xl,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
      textAlign: 'center',
    },
    tabsContainer: {
      marginBottom: theme.spacing.lg,
    },
    taskCard: {
      marginBottom: theme.spacing.md,
    },
    taskHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.sm,
    },
    taskTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      flex: 1,
      marginRight: theme.spacing.sm,
    },
    priorityBadge: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.md,
    },
    priorityText: {
      fontSize: theme.fontSize.xs,
      fontWeight: '600',
    },
    taskDescription: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      lineHeight: 20,
      marginBottom: theme.spacing.sm,
    },
    taskInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.sm,
    },
    taskMeta: {
      fontSize: theme.fontSize.xs,
      color: theme.colors.textSecondary,
    },
    taskFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    budgetText: {
      fontSize: theme.fontSize.sm,
      fontWeight: '600',
      color: theme.colors.text,
    },
    applicantsBadge: {
      backgroundColor: theme.colors.secondary + '20',
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.md,
    },
    applicantsText: {
      fontSize: theme.fontSize.xs,
      fontWeight: '600',
      color: theme.colors.secondary,
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
  })
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>我的任務</Text>
        
        <View style={styles.tabsContainer}>
          <SegmentedControl
            options={tabOptions}
            value={activeTab}
            onChange={(value) => setActiveTab(value as TaskTabType)}
          />
        </View>
        
        {tasks.length > 0 ? (
          tasks.map(renderTaskCard)
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {activeTab === 'in_progress' && '目前沒有進行中的任務'}
              {activeTab === 'pending' && (
                user?.role === UserRole.FEAR_STAR 
                  ? '沒有待選擇終結者的任務' 
                  : '沒有待確認的任務'
              )}
              {activeTab === 'completed' && '還沒有已完成的任務'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}