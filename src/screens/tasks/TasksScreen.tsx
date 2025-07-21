// 我的任務畫面 - 支援小怕星和終結者

import { TASK_TAB_OPTIONS } from '@/shared/config/options.config'
import { useAuthRedux, useResponsive, useTasksRedux } from '@/shared/hooks'
import { useTheme } from '@/shared/theme'
import { RootStackParamList, Task, TaskStatus, UserRole } from '@/shared/types'
import { LogoLoading, TaskCard } from '@/shared/ui'
import { ScreenHeader } from '@/shared/ui/screen-header'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AlertCircle, Bell, CheckCircle, Clock, Timer } from 'lucide-react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createStyles } from './TasksScreen.styles'

type TasksNavigationProp = NativeStackNavigationProp<RootStackParamList>
type TasksRouteProp = RouteProp<{ Tasks: { initialTab?: TaskTab } }, 'Tasks'>

type TaskTab = 'pending_confirmation' | 'in_progress' | 'pending_completion' | 'completed'

export const TasksScreen = () => {
  const { theme } = useTheme()
  const { user } = useAuthRedux()
  const { tasks, tasksLoading, tasksError, loadTasks } = useTasksRedux()
  const { isTablet } = useResponsive()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<TasksNavigationProp>()
  const route = useRoute<TasksRouteProp>()

  // 從路由參數獲取初始 tab，如果沒有則預設為 pending_confirmation
  const initialTab = route.params?.initialTab || 'pending_confirmation'
  const [activeTab, setActiveTab] = useState<TaskTab>(initialTab)
  const activeTabRef = useRef<TaskTab>(initialTab)

  // 載入任務資料
  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  // 監聽 activeTab 變化並同步到 ref
  useEffect(() => {
    activeTabRef.current = activeTab
  }, [activeTab])

  // 監聽路由參數變化，更新 activeTab
  useEffect(() => {
    if (route.params?.initialTab) {
      setActiveTab(route.params.initialTab)
    }
  }, [route.params?.initialTab])
  // 根據用戶角色獲取任務列表
  const getAllMyTasks = () => {
    if (!user || !tasks) return []

    if (user.role === UserRole.FEAR_STAR) {
      // 小怕星：查看自己發布的任務
      return tasks.filter(task => task.createdBy === user.id)
    } else {
      // 終結者：查看已指派給自己的任務或已申請的任務
      return tasks.filter(
        task =>
          task.assignedTo === user.id ||
          task.applicants.some(applicant => applicant.terminatorId === user.id)
      )
    }
  }

  const allMyTasks = getAllMyTasks()

  // 依狀態分類任務
  const getTasksByTab = (tab: TaskTab) => {
    if (!user) return []

    if (user.role === UserRole.FEAR_STAR) {
      // 小怕星的狀態映射
      switch (tab) {
        case 'pending_confirmation':
          // 包含 PENDING（剛發布）和 PENDING_CONFIRMATION（有人申請）
          return allMyTasks.filter(
            task =>
              task.status === TaskStatus.PENDING || task.status === TaskStatus.PENDING_CONFIRMATION
          )
        case 'in_progress':
          return allMyTasks.filter(task => task.status === TaskStatus.IN_PROGRESS)
        case 'pending_completion':
          return allMyTasks.filter(task => task.status === TaskStatus.PENDING_COMPLETION)
        case 'completed':
          return allMyTasks.filter(task => task.status === TaskStatus.COMPLETED)
        default:
          return []
      }
    } else {
      // 終結者的狀態映射
      switch (tab) {
        case 'pending_confirmation':
          // 終結者只看 PENDING_CONFIRMATION（有人申請待確認的任務）
          return allMyTasks.filter(task => task.status === TaskStatus.PENDING_CONFIRMATION)
        case 'in_progress':
          return allMyTasks.filter(task => task.status === TaskStatus.IN_PROGRESS)
        case 'pending_completion':
          return allMyTasks.filter(task => task.status === TaskStatus.PENDING_COMPLETION)
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
  const handleRefresh = async () => {
    await loadTasks()
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

  // 如果是初始載入（不是下拉刷新），顯示 LogoLoading
  // if (tasksLoading === 'loading' && !tasks) {
  //   return (
  //     <View style={styles.container}>
  //       <ScreenHeader
  //         title="任務"
  //         showBackButton={false}
  //         leftActions={
  //           <Image
  //             source={require('@/assets/images/logo.png')}
  //             style={{ width: 32, height: 32, marginRight: 8 }}
  //             resizeMode="contain"
  //           />
  //         }
  //         rightActions={
  //           <TouchableOpacity onPress={handleNotificationPress}>
  //             <Bell size={24} color={theme.colors.text} />
  //           </TouchableOpacity>
  //         }
  //       />
  //       <View style={styles.loadingContainer}>
  //         <LogoLoading size="md" animationType="spin" />
  //       </View>
  //     </View>
  //   )
  // }

  return (
    <View style={styles.container}>
      {/* 標題和標籤頁 */}
      <ScreenHeader
        title="任務"
        showBackButton={false}
        leftActions={
          <Image
            source={require('../../../assets/images/logo.png')}
            style={{ width: 32, height: 32, marginRight: 8 }}
            resizeMode="contain"
          />
        }
        rightActions={
          <TouchableOpacity onPress={handleNotificationPress}>
            <Bell size={24} color={theme.colors.text} />
          </TouchableOpacity>
        }
      />

      {/* 標籤頁區域 */}
      <View style={styles.tabsHeader}>
        <View style={styles.tabsContainer}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.key

            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => setActiveTab(tab.key)}
              >
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
              refreshing={tasksLoading === 'loading'}
              onRefresh={handleRefresh}
              colors={[theme.colors.secondary]}
              tintColor={theme.colors.secondary}
            />
          }
        >
          <View style={styles.taskList}>
            {tasksError ? (
              <View style={styles.emptyState}>
                <AlertCircle size={48} color={theme.colors.error} />
                <Text style={styles.emptyStateText}>載入任務失敗</Text>
                <Text style={styles.emptyStateSubtext}>{tasksError}</Text>
              </View>
            ) : currentTasks.length > 0 ? (
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
                {activeTab === 'pending_confirmation' && (
                  <AlertCircle size={48} color={theme.colors.textSecondary} />
                )}
                {activeTab === 'in_progress' && (
                  <Clock size={48} color={theme.colors.textSecondary} />
                )}
                {activeTab === 'pending_completion' && (
                  <Timer size={48} color={theme.colors.textSecondary} />
                )}
                {activeTab === 'completed' && (
                  <CheckCircle size={48} color={theme.colors.textSecondary} />
                )}
                <Text style={styles.emptyStateText}>
                  {activeTab === 'pending_confirmation' &&
                    (user?.role === UserRole.FEAR_STAR ? '沒有待處理的任務' : '沒有待確認的任務')}
                  {activeTab === 'in_progress' && '目前沒有進行中的任務'}
                  {activeTab === 'pending_completion' && '沒有等待完成確認的任務'}
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
