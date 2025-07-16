// 我的任務畫面 - 支援小怕星和終結者

import { TASK_TAB_OPTIONS } from '@/shared/config/options.config'
import { useAuth, useResponsive } from '@/shared/hooks'
import { getAssignedTasks, mockTasks } from '@/shared/mocks'
import { useTheme } from '@/shared/theme'
import { RootStackParamList, Task, TaskStatus, UserRole } from '@/shared/types'
import { TaskCard } from '@/shared/ui'
import { createStyles } from './TasksScreen.styles'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AlertCircle, Bell, CheckCircle, Clock } from 'lucide-react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type TasksNavigationProp = NativeStackNavigationProp<RootStackParamList>

type TaskTab = 'pending_confirmation' | 'in_progress' | 'completed'

export const TasksScreen = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const { isTablet } = useResponsive()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<TasksNavigationProp>()
  const [activeTab, setActiveTab] = useState<TaskTab>('pending_confirmation')
  const [refreshing, setRefreshing] = useState(false)
  const activeTabRef = useRef<TaskTab>('pending_confirmation')

  // 監聽 activeTab 變化並同步到 ref
  useEffect(() => {
    activeTabRef.current = activeTab
  }, [activeTab])
  // 根據用戶角色獲取任務列表
  const getAllMyTasks = () => {
    if (!user) return []

    if (user.role === UserRole.FEAR_STAR) {
      // 小怕星：查看自己發布的任務
      return mockTasks.filter(task => task.createdBy === user.id)
    } else {
      // 終結者：查看指派給自己的任務
      const assignedTasks = getAssignedTasks(user.id)

      return [...assignedTasks]
    }
  }

  const allMyTasks = getAllMyTasks()

  // 依狀態分類任務
  const getTasksByTab = (tab: TaskTab) => {
    if (!user) return []

    if (user.role === UserRole.FEAR_STAR) {
      // 小怕星的狀態映射
      switch (tab) {
        case 'in_progress':
          return allMyTasks.filter(task => task.status === TaskStatus.IN_PROGRESS)
        case 'pending_confirmation':
          return allMyTasks.filter(task => task.status === TaskStatus.PENDING_CONFIRMATION)
        case 'completed':
          return allMyTasks.filter(task => task.status === TaskStatus.COMPLETED)
        default:
          return []
      }
    } else {
      // 終結者的狀態映射
      switch (tab) {
        case 'in_progress':
          return allMyTasks.filter(task => task.status === TaskStatus.IN_PROGRESS)
        case 'pending_confirmation':
          return allMyTasks.filter(task => task.status === TaskStatus.PENDING_CONFIRMATION)
        case 'completed':
          return allMyTasks.filter(task => task.status === TaskStatus.COMPLETED)
        default:
          return []
      }
    }
  }

  const currentTasks = getTasksByTab(activeTab)


  // 處理任務詳情
  const handleTaskPress = (task: Task) => {
    const currentTab = activeTabRef.current

    // 小怕星在待確認頁面點擊任務時，跳轉到申請者列表
    if (user?.role === UserRole.FEAR_STAR && task.status === TaskStatus.PENDING) {
      navigation.navigate('TaskApplicants', { taskId: task.id })
    } else {
      // 其他情況跳轉到任務詳情，並傳遞當前 tab 資訊
      navigation.navigate('TaskDetail', { taskId: task.id, fromTab: currentTab })
    }
  }

  // 處理重新整理
  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  // 處理通知按鈕點擊
  const handleNotificationPress = () => {
    navigation.navigate('Notifications')
  }

  const tabs = TASK_TAB_OPTIONS.map(tab => ({
    ...tab,
    key: tab.key as TaskTab,
    count: getTasksByTab(tab.key as TaskTab).length,
  }))

  const styles = createStyles(theme, isTablet, insets)

  return (
    <View style={styles.container}>
      {/* 標題和標籤頁 */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={{ width: 40 }} />
          <Text style={styles.title}>任務</Text>
          <TouchableOpacity style={styles.bellButton} onPress={handleNotificationPress}>
            <Bell size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabsContainer}>
          {tabs.map(tab => {
            const IconComponent = tab.icon
            const isActive = activeTab === tab.key

            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => setActiveTab(tab.key)}
              >
                <IconComponent
                  size={16}
                  color={isActive ? theme.colors.primary : theme.colors.textSecondary}
                  style={styles.tabIcon}
                />
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab.title}</Text>
                <Text style={[styles.tabCount, isActive && styles.activeTabCount]}>
                  {tab.count}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      {/* 任務列表 */}
      <View style={styles.content}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.taskListContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[theme.colors.secondary]}
              tintColor={theme.colors.secondary}
            />
          }
        >
          <View style={styles.taskList}>
            {currentTasks.length > 0 ? (
              currentTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onPress={handleTaskPress}
                  variant="default"
                  showContactInfo={user?.role === UserRole.TERMINATOR}
                  currentUserRole={user?.role}
                  style={isTablet ? styles.taskCardTablet : undefined}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                {activeTab === 'in_progress' && (
                  <Clock size={48} color={theme.colors.textSecondary} />
                )}
                {activeTab === 'pending_confirmation' && (
                  <AlertCircle size={48} color={theme.colors.textSecondary} />
                )}
                {activeTab === 'completed' && (
                  <CheckCircle size={48} color={theme.colors.textSecondary} />
                )}
                <Text style={styles.emptyStateText}>
                  {activeTab === 'in_progress' && '目前沒有進行中的任務'}
                  {activeTab === 'pending_confirmation' &&
                    (user?.role === UserRole.FEAR_STAR ? '沒有待處理的任務' : '沒有待確認的任務')}
                  {activeTab === 'completed' && '還沒有完成的任務'}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
