// 我的任務列表畫面 - 小怕星查看自己發布的 PENDING 狀態任務

import React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTheme } from '@/shared/theme'
import { useAuth, useResponsive } from '@/shared/hooks'
import { mockTasks } from '@/shared/mocks'
import { RootStackParamList, TaskStatus, UserRole } from '@/shared/types'
import { ScreenHeader, TaskCard } from '@/shared/ui'

type MyTasksListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MyTasksList'>

export const MyTasksListScreen: React.FC = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const { isTablet } = useResponsive()
  const navigation = useNavigation<MyTasksListNavigationProp>()

  // 只顯示小怕星發布的 PENDING 狀態任務
  const pendingTasks = mockTasks.filter(
    task => task.createdBy === user?.id && task.status === TaskStatus.PENDING
  )

  const handleTaskPress = (taskId: string) => {
    navigation.navigate('TaskDetail', { taskId })
  }

  const renderTaskItem = ({ item: task }: { item: typeof mockTasks[0] }) => (
    <TaskCard
      task={task}
      onPress={() => handleTaskPress(task.id)}
      style={isTablet ? styles.taskCardTablet : {}}
    />
  )

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
      maxWidth: isTablet ? 1200 : undefined,
      width: '100%',
      alignSelf: 'center',
    },
    listContainer: {
      paddingBottom: theme.spacing.xl,
    },
    taskCardTablet: {
      marginBottom: theme.spacing.md,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing.xl,
    },
    emptyText: {
      fontSize: theme.fontSize.lg,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
    },
    emptySubText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },
  })

  // 只有小怕星能訪問此頁面
  if (user?.role !== UserRole.FEAR_STAR) {
    return (
      <View style={styles.container}>
        <ScreenHeader
          title="我的任務列表"
          showBackButton
          onBackPress={() => navigation.goBack()}
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
        onBackPress={() => navigation.goBack()}
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