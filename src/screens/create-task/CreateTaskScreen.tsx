// 發布任務畫面 - 小怕星專用

import { useAuthRedux, useTasksRedux } from '@/shared/hooks'
import { useTheme } from '@/shared/theme'
import { Gender, PestType, RootStackParamList, TaskPriority, TaskStatus } from '@/shared/types'
import {
  AddressSelector,
  BudgetSelector,
  Button,
  GenderSelector,
  Input,
  KeyboardAvoidingContainer,
  PestSelector,
  PrioritySelector,
  TaskActionResult,
  LogoLoading,
} from '@/shared/ui'
import { ScreenHeader } from '@/shared/ui/screen-header'
import { showAlert } from '@/shared/utils'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Bell, Send } from 'lucide-react-native'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createStyles } from './CreateTaskScreen.styles'

type CreateTaskNavigationProp = NativeStackNavigationProp<RootStackParamList>

interface CreateTaskForm {
  title: string
  description: string
  pestType?: PestType
  priority: TaskPriority
  budget?: number
  location: {
    city: string
    district: string
  }
  preferredGender?: Gender
}

export const CreateTaskScreen = () => {
  const { theme } = useTheme()
  const { user } = useAuthRedux()
  const { createTask, createTaskLoading, createTaskError, resetCreateState } = useTasksRedux()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<CreateTaskNavigationProp>()
  const [showActionResult, setShowActionResult] = useState(false)

  const [form, setForm] = useState<CreateTaskForm>({
    title: '',
    description: '',
    priority: TaskPriority.NORMAL,
    location: {
      city: '',
      district: '',
    },
    preferredGender: Gender.ANY,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof CreateTaskForm, string>>>({})

  // 表單驗證
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateTaskForm, string>> = {}

    if (!form.title.trim()) {
      newErrors.title = '請輸入任務標題'
    }

    if (!form.description.trim()) {
      newErrors.description = '請描述害蟲問題'
    }

    if (!form.pestType) {
      newErrors.pestType = '請選擇害蟲類型'
    }

    if (!form.location.city.trim()) {
      newErrors.location = '請選擇縣市'
    }

    if (!form.location.district.trim()) {
      newErrors.location = '請選擇區域'
    }

    if (!form.budget || form.budget <= 0) {
      newErrors.budget = '請設定預算'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 提交任務
  const handleSubmit = async () => {
    if (!validateForm()) {
      showAlert('表單有誤', '請檢查並填寫所有必填欄位')
      return
    }

    if (!user?.id) {
      showAlert('請先登入', '您需要先登入才能發布任務')
      return
    }

    try {
      // 使用 Redux 創建任務
      const taskData = {
        title: form.title.trim(),
        description: form.description.trim(),
        pestType: form.pestType!,
        location: {
          latitude: 25.033, // 暫時使用固定座標，未來整合地圖服務
          longitude: 121.5654,
          city: form.location.city,
          district: form.location.district,
        },
        status: TaskStatus.PENDING,
        priority: form.priority,
        budget: form.budget!,
        isImmediate: form.priority === TaskPriority.VERY_URGENT,
        createdBy: user.id,
      }

      await createTask(taskData)
      
      // 顯示成功結果 UI
      setShowActionResult(true)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '發布任務失敗'
      showAlert('發布失敗', errorMessage)
    }
  }

  // 處理查看任務按鈕點擊
  const handleViewTask = () => {
    // 重置表單
    setForm({
      title: '',
      description: '',
      priority: TaskPriority.NORMAL,
      location: {
        city: '',
        district: '',
      },
      preferredGender: Gender.ANY,
    })
    
    // 重置 Redux 創建任務狀態
    resetCreateState()
    
    // 重置 ActionResult 狀態
    setShowActionResult(false)
    
    // 跳轉到我的任務列表，標記來自發布任務
    navigation.navigate('MyTasksList', { fromPublish: true })
  }

  // 獲取當前位置

  // 處理通知按鈕點擊
  const handleNotificationPress = () => {
    navigation.navigate('Notifications')
  }

  const styles = createStyles(theme, insets)

  // 如果正在創建任務，顯示 loading
  if (createTaskLoading === ('loading' as any)) {
    return (
      <View style={styles.container}>
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
    return (
      <View style={styles.container}>
        <TaskActionResult
          type="publish"
          message="任務已成功發布"
          buttonText="查看任務"
          onViewTask={handleViewTask}
        />
      </View>
    )
  }

  return (
    <KeyboardAvoidingContainer style={styles.container}>
      {/* 標題區 */}
      <ScreenHeader
        title="發布除蟲任務"
        subtitle="詳細描述問題，讓專家更好為您服務"
        showBackButton={false}
        rightActions={
          <TouchableOpacity onPress={handleNotificationPress}>
            <Bell size={24} color={theme.colors.text} />
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          {/* 基本資訊 */}
          <View style={styles.section}>
            <Input
              label="任務標題"
              value={form.title}
              onChangeText={title => setForm({ ...form, title })}
              placeholder="例：客廳蟑螂問題急需處理"
              error={errors.title}
              required
            />

            <Input
              label="問題描述"
              value={form.description}
              onChangeText={description => setForm({ ...form, description })}
              placeholder="詳細描述害蟲問題，包括發現位置、數量、影響等..."
              multiline
              numberOfLines={4}
              error={errors.description}
              required
            />
          </View>

          {/* 害蟲類型 */}
          <View style={styles.section}>
            <PestSelector
              value={form.pestType}
              onChange={pestType => setForm({ ...form, pestType })}
              error={errors.pestType}
              required
            />
          </View>

          {/* 專家性別偏好 */}
          <View style={styles.section}>
            <GenderSelector
              value={form.preferredGender}
              onChange={preferredGender => setForm({ ...form, preferredGender })}
            />
          </View>

          {/* 地點資訊 */}
          <AddressSelector
            value={form.location}
            onChange={location => setForm({ ...form, location })}
            errors={typeof errors.location === 'string' ? { city: errors.location } : undefined}
            showQuickSet={true} // 發布任務頁面顯示快速設定
            required
          />

          {/* 緊急程度 */}
          <View style={styles.section}>
            <PrioritySelector
              value={form.priority}
              onChange={priority => setForm({ ...form, priority })}
              error={errors.priority}
            />
          </View>

          {/* 預算範圍 */}
          <View style={styles.section}>
            <BudgetSelector
              value={form.budget}
              onChange={budget => setForm({ ...form, budget })}
              error={errors.budget}
              required
            />
          </View>
        </View>
      </ScrollView>

      {/* 提交按鈕 */}
      <View style={styles.submitSection}>
        <Button
          variant="primary"
          loading={createTaskLoading === 'loading'}
          onPress={handleSubmit}
          style={styles.submitButton}
          fullWidth
        >
          <Send size={16} color={theme.colors.primary} />
          <Text> 發布任務</Text>
        </Button>

        <Text style={styles.helpText}>
          發布後，系統會自動為您媒合附近的蟲蟲終結者{'\n'}
          預計 5-10 分鐘內會有專家與您聯繫
        </Text>
      </View>
    </KeyboardAvoidingContainer>
  )
}
