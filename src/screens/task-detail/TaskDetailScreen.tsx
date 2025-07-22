// 任務詳細頁面 - 蟲蟲終結者查看任務詳情

import { useAuthRedux, useResponsive, useTaskActions, useTaskDetailLogic } from '@/shared/hooks'
import { useTheme } from '@/shared/theme'
import { RootStackParamList } from '@/shared/types'
import { LogoLoading, ScreenHeader, TaskCard, TaskStatusRenderer, TaskActionResult } from '@/shared/ui'
import { taskStatusValidator } from '@/shared/utils'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { createStyles } from './TaskDetailScreen.styles'

type TaskDetailRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>
type TaskDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskDetail'>

export const TaskDetailScreen: React.FC = () => {
  const { theme } = useTheme()
  const { user } = useAuthRedux()
  const { isTablet } = useResponsive()
  const route = useRoute<TaskDetailRouteProp>()
  const navigation = useNavigation<TaskDetailNavigationProp>()

  // 使用 Hook 獲取任務相關資料
  const { taskId } = route.params
  const { task, contactInfo } = useTaskDetailLogic(taskId, user)

  // 使用 Hook 獲取任務操作函數
  const { 
    handleAcceptTask, 
    handleSelectTerminator, 
    handleMarkCompleted,
    loading,
    loadingAction
  } = useTaskActions()

  // 在 TaskDetailScreen 層級管理 showActionResult 狀態
  const [showActionResult, setShowActionResult] = useState(false)
  const [actionType, setActionType] = useState<'accept' | 'select' | 'complete'>('accept')
  const [previousStatusText, setPreviousStatusText] = useState('')

  // 包裝操作函數，在成功後顯示結果
  const wrappedHandleAcceptTask = React.useCallback(async (taskId?: string) => {
    // 保存操作前的狀態文字
    const currentStatusText = taskStatusValidator.getStatusDisplayText(task.status, user?.role)
    
    const success = await handleAcceptTask(taskId, () => {
      setPreviousStatusText(currentStatusText)
      setActionType('accept')
      setShowActionResult(true)
    })
    return success
  }, [handleAcceptTask, task.status, user?.role])

  const wrappedHandleSelectTerminator = React.useCallback(async (application: any) => {
    // 保存操作前的狀態文字
    const currentStatusText = taskStatusValidator.getStatusDisplayText(task.status, user?.role)
    
    const success = await handleSelectTerminator(application, () => {
      setPreviousStatusText(currentStatusText)
      setActionType('select')
      setShowActionResult(true)
    })
    return success
  }, [handleSelectTerminator, task.status, user?.role])

  const wrappedHandleMarkCompleted = React.useCallback(async (taskId: string) => {
    // 保存操作前的狀態文字
    const currentStatusText = taskStatusValidator.getStatusDisplayText(task.status, user?.role)
    
    const success = await handleMarkCompleted(taskId, () => {
      setPreviousStatusText(currentStatusText)
      setActionType('complete')
      setShowActionResult(true)
    })
    return success
  }, [handleMarkCompleted, task.status, user?.role])

  // 處理查看任務按鈕
  const handleViewTask = React.useCallback(() => {
    setShowActionResult(false)
    
    const tabMap = {
      accept: 'pending_confirmation' as const,
      complete: 'pending_completion' as const, 
      select: 'in_progress' as const
    }

    navigation.navigate('Main', {
      screen: 'TaskList',
      params: { initialTab: tabMap[actionType] }
    })
  }, [navigation, actionType])

  const styles = createStyles(theme, isTablet)

  // 如果任務不存在（已被刪除），自動返回上一頁
  React.useEffect(() => {
    if (!task) {
      navigation.goBack()
    }
  }, [task, navigation])

  // 如果任務不存在，顯示載入狀態或錯誤
  if (!task) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="載入中..." showBackButton onBackPress={() => navigation.goBack()} />
        <View style={styles.loadingContainer}>
          <LogoLoading 
            size="md"
            animationType="spin"
          />
        </View>
      </View>
    )
  }

  // 取得任務狀態的中文顯示
  const statusText = taskStatusValidator.getStatusDisplayText(task.status, user?.role)
  const headerTitle = `任務詳情 - ${statusText}`

  // 如果正在處理任務操作，顯示 LogoLoading
  if (loading && loadingAction) {
    return (
      <View style={styles.container}>
        <ScreenHeader title={headerTitle} showBackButton onBackPress={() => navigation.goBack()} />
        <View style={styles.loadingContainer}>
          <LogoLoading 
            size="lg"
            animationType="pulse"
          />
        </View>
      </View>
    )
  }

  // 如果顯示操作結果，渲染 TaskActionResult
  if (showActionResult) {
    const getResultConfig = () => {
      switch (actionType) {
        case 'select':
          return {
            type: 'accept' as const,
            message: '已成功選擇終結者',
            buttonText: '查看任務',
          }
        case 'accept':
          return {
            type: 'accept' as const,
            message: '已成功申請任務',
            buttonText: '查看任務',
          }
        case 'complete':
          return {
            type: 'complete' as const,
            message: '任務已標記完成',
            buttonText: '查看任務',
          }
        default:
          return {
            type: 'accept' as const,
            message: '操作成功',
            buttonText: '查看任務',
          }
      }
    }

    const config = getResultConfig()

    // 使用操作前的狀態標題，保持用戶預期的上下文
    const actionResultTitle = `任務詳情 - ${previousStatusText}`

    return (
      <View style={styles.container}>
        <ScreenHeader title={actionResultTitle} showBackButton onBackPress={() => navigation.goBack()} />
        <TaskActionResult
          type={config.type}
          message={config.message}
          buttonText={config.buttonText}
          onViewTask={handleViewTask}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title={headerTitle} showBackButton onBackPress={() => navigation.goBack()} />

      <ScrollView style={styles.content}>
        {/* 頂部任務摘要卡片 */}
        <View style={styles.taskCardContainer}>
          <TaskCard task={task} />
        </View>

        {/* 使用 TaskStatusRenderer 處理不同狀態的渲染 */}
        <View style={styles.contactSectionContainer}>
          <TaskStatusRenderer
            task={task}
            user={user}
            contactPerson={contactInfo?.person || null}
            contactTitle={contactInfo?.title || ''}
            onAcceptTask={wrappedHandleAcceptTask}
            onSelectTerminator={wrappedHandleSelectTerminator}
            onMarkCompleted={wrappedHandleMarkCompleted}
            isTablet={isTablet}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </View>
  )
}
