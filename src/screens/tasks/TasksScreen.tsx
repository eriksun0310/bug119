// 我的任務畫面 - 支援小怕星和終結者

import { TASK_TAB_OPTIONS, getTaskTabTitle } from '@/shared/config/options.config'
import { useAuthRedux, useResponsive, useTasksRedux } from '@/shared/hooks'
import { useTheme } from '@/shared/theme'
import { RootStackParamList, Task, TaskStatus, UserRole } from '@/shared/types'
import { TaskCard, Tabs, TabOption, EmptyState } from '@/shared/ui'
import { ScreenHeader } from '@/shared/ui/screen-header'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AlertCircle, Bell, CheckCircle, Clock, Timer } from 'lucide-react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View, Dimensions } from 'react-native'
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

  const tabOptions: TabOption[] = TASK_TAB_OPTIONS.map(tab => ({
    key: tab.key,
    title: getTaskTabTitle(tab, user?.role), // 根據角色獲取對應的標題
    count: getTasksByTab(tab.key as TaskTab).length,
  }))

  const styles = createStyles(theme, isTablet, insets)
  const screenWidth = Dimensions.get('window').width
  const flatListRef = useRef<FlatList>(null)

  // 當 activeTab 改變時，滾動到對應的頁面
  useEffect(() => {
    const tabIndex = TASK_TAB_OPTIONS.findIndex(tab => tab.key === activeTab)
    if (tabIndex >= 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: tabIndex, animated: true })
    }
  }, [activeTab])

  // 處理滑動結束事件
  const handleMomentumScrollEnd = (event: any) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth)
    const newTab = TASK_TAB_OPTIONS[newIndex]?.key as TaskTab
    if (newTab && newTab !== activeTab) {
      setActiveTab(newTab)
    }
  }

  // 渲染每個 tab 的內容
  const renderTabContent = ({ item }: { item: typeof TASK_TAB_OPTIONS[0] }) => {
    const tabKey = item.key as TaskTab
    const tabTasks = getTasksByTab(tabKey)

    return (
      <View style={{ width: screenWidth, flex: 1 }}>
        <FlatList
          style={styles.scrollContainer}
          contentContainerStyle={[
            styles.taskListContainer,
            tabTasks.length === 0 && styles.emptyListContainer,
          ]}
          data={tabTasks}
          keyExtractor={task => task.id}
          renderItem={({ item: task }) => (
            <TaskCard
              task={task}
              onPress={handleTaskPress}
              variant="default"
              showContactInfo={user?.role === UserRole.TERMINATOR}
              currentUserRole={user?.role}
              style={isTablet ? styles.taskCardTablet : undefined}
            />
          )}
          numColumns={isTablet ? 2 : 1}
          columnWrapperStyle={isTablet ? styles.taskRow : undefined}
          refreshControl={
            <RefreshControl
              refreshing={tasksLoading === 'loading'}
              onRefresh={handleRefresh}
              colors={[theme.colors.secondary]}
              tintColor={theme.colors.secondary}
            />
          }
          ListEmptyComponent={() => {
            if (tasksError) {
              return (
                <EmptyState
                  icon={<AlertCircle size={48} color={theme.colors.error} />}
                  title="載入任務失敗"
                  subtitle={tasksError}
                />
              )
            }

            // 根據 tab 類型決定圖示和文字
            const getEmptyStateProps = () => {
              switch (tabKey) {
                case 'pending_confirmation':
                  return {
                    icon: <AlertCircle size={48} color={theme.colors.textSecondary} />,
                    title: user?.role === UserRole.FEAR_STAR
                      ? '沒有需要選擇終結者的任務'
                      : '沒有等待確認的任務'
                  }
                case 'in_progress':
                  return {
                    icon: <Clock size={48} color={theme.colors.textSecondary} />,
                    title: '目前沒有進行中的任務'
                  }
                case 'pending_completion':
                  return {
                    icon: <Timer size={48} color={theme.colors.textSecondary} />,
                    title: user?.role === UserRole.FEAR_STAR
                      ? '沒有需要驗收的任務'
                      : '沒有等待完成確認的任務'
                  }
                case 'completed':
                  return {
                    icon: <CheckCircle size={48} color={theme.colors.textSecondary} />,
                    title: '還沒有完成的任務'
                  }
                default:
                  return {
                    icon: <AlertCircle size={48} color={theme.colors.textSecondary} />,
                    title: '沒有任務'
                  }
              }
            }

            const emptyStateProps = getEmptyStateProps()
            return <EmptyState {...emptyStateProps} />
          }}
        />
      </View>
    )
  }

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
      <Tabs
        options={tabOptions}
        value={activeTab}
        onChange={(value) => setActiveTab(value as TaskTab)}
        showCount
        scrollable
      />

      {/* 可滑動的任務列表容器 */}
      <View style={styles.content}>
        <FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={TASK_TAB_OPTIONS}
          keyExtractor={item => item.key}
          renderItem={renderTabContent}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          initialScrollIndex={TASK_TAB_OPTIONS.findIndex(tab => tab.key === activeTab)}
          getItemLayout={(data, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
        />
      </View>
    </View>
  )
}
