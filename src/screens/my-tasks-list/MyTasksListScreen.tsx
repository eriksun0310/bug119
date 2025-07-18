// 我的任務列表畫面 - 小怕星查看自己發布的 PENDING 狀態任務

import React, { useEffect } from 'react'
import { View, FlatList, Text } from 'react-native'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTheme } from '@/shared/theme'
import { useAuthRedux, useResponsive, useTasksRedux } from '@/shared/hooks'
import { RootStackParamList, TaskStatus, UserRole } from '@/shared/types'
import { ScreenHeader, TaskCard } from '@/shared/ui'
import { createStyles } from './MyTasksListScreen.styles'

type MyTasksListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MyTasksList'>
type MyTasksListRouteProp = RouteProp<RootStackParamList, 'MyTasksList'>

export const MyTasksListScreen: React.FC = () => {
  const { theme } = useTheme()
  const { user } = useAuthRedux()
  const { isTablet } = useResponsive()
  const navigation = useNavigation<MyTasksListNavigationProp>()
  const route = useRoute<MyTasksListRouteProp>()
  const { tasks, tasksLoading, loadTasks } = useTasksRedux()

  // 載入任務資料
  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  // 只顯示小怕星發布的 PENDING 狀態任務
  const pendingTasks = tasks ? tasks.filter(
    task => task.createdBy === user?.id && task.status === TaskStatus.PENDING
  ) : []

  const handleTaskPress = (taskId: string) => {
    navigation.navigate('TaskDetail', { taskId })
  }

  const renderTaskItem = ({ item: task }: { item: typeof tasks[0] }) => (
    <TaskCard
      task={task}
      onPress={() => handleTaskPress(task.id)}
      style={isTablet ? styles.taskCardTablet : {}}
    />
  )

  const styles = createStyles(theme, isTablet)

  // 只有小怕星能訪問此頁面
  if (user?.role !== UserRole.FEAR_STAR) {
    return (
      <View style={styles.container}>
        <ScreenHeader
          title="我的任務列表"
          showBackButton
          onBackPress={() => {
            // 如果來自發布任務，回到主畫面；否則正常返回
            if (route.params?.fromPublish) {
              navigation.navigate('Main')
            } else {
              navigation.goBack()
            }
          }}
        />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>此功能僅限小怕星使用</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="我的任務列表"
        showBackButton
        onBackPress={() => {
          // 如果來自發布任務，回到主畫面；否則正常返回
          if (route.params?.fromPublish) {
            navigation.navigate('Main')
          } else {
            navigation.goBack()
          }
        }}
      />

      <View style={styles.content}>
        {pendingTasks.length > 0 ? (
          <FlatList
            data={pendingTasks}
            keyExtractor={item => item.id}
            renderItem={renderTaskItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>目前沒有發布中的任務</Text>
            <Text style={styles.emptySubText}>
              您可以到任務牆發布新的除蟲任務{'\n'}
              讓附近的蟲蟲終結者來幫助您
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}