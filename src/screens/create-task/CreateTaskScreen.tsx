// 發布任務畫面 - 小怕星專用

import React, { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Switch,
} from 'react-native'
import { 
  Send,
  Bell
} from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTheme } from '@/shared/theme'
import { showAlert } from '@/shared/utils'
import { 
  Button, 
  Input, 
  PestSelector,
  PrioritySelector,
  BudgetSelector,
  GenderSelector,
  AddressSelector,
  KeyboardAvoidingContainer
} from '@/shared/ui'
import { PestType, TaskPriority, RootStackParamList, Gender } from '@/shared/types'

type CreateTaskNavigationProp = NativeStackNavigationProp<RootStackParamList>

interface CreateTaskForm {
  title: string
  description: string
  pestType?: PestType
  priority: TaskPriority
  budget?: BudgetRange
  location: {
    city: string
    district: string
  }
  preferredGender?: Gender
  isImmediate: boolean
  scheduledDate?: string
  scheduledTime?: string
}

export const CreateTaskScreen = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<CreateTaskNavigationProp>()
  const [loading, setLoading] = useState(false)
  
  const [form, setForm] = useState<CreateTaskForm>({
    title: '',
    description: '',
    priority: TaskPriority.NORMAL,
    location: {
      city: '',
      district: ''
    },
    preferredGender: Gender.ANY,
    isImmediate: true,
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
    
    if (!form.budget || form.budget.min <= 0 || form.budget.max <= 0) {
      newErrors.budget = '請設定預算範圍'
    }
    
    if (!form.isImmediate) {
      if (!form.scheduledDate) {
        newErrors.scheduledDate = '請選擇預約日期'
      }
      if (!form.scheduledTime) {
        newErrors.scheduledTime = '請選擇預約時間'
      }
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
    
    setLoading(true)
    
    try {
      // 模擬 API 呼叫
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      showAlert(
        '發布成功！',
        '您的除蟲任務已發布，我們會盡快為您媒合合適的蟲蟲終結者。',
        [
          { 
            text: '確定', 
            onPress: () => {
              // 重置表單
              setForm({
                title: '',
                description: '',
                priority: TaskPriority.NORMAL,
                location: {
                  city: '',
                  district: ''
                },
                preferredGender: Gender.ANY,
                isImmediate: true,
              })
            }
          }
        ]
      )
    } catch (error) {
      showAlert('發布失敗', '請稍後再試')
    } finally {
      setLoading(false)
    }
  }
  
  // 獲取當前位置
  
  // 處理通知按鈕點擊
  const handleNotificationPress = () => {
    navigation.navigate('Notifications')
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.md,
      paddingTop: insets.top > 0 ? insets.top + theme.spacing.xs : theme.spacing.sm,
      paddingBottom: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontSize: theme.fontSize.xl,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
    },
    bellButton: {
      padding: theme.spacing.xs,
    },
    subtitle: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.spacing.xs,
    },
    content: {
      flex: 1,
    },
    form: {
      padding: theme.spacing.md,
      gap: theme.spacing.lg,
      maxWidth: 600,
      width: '100%',
      alignSelf: 'center',
    },
    section: {
      gap: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    timeOptionContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    timeOptionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    timeOptionTitle: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
    },
    timeOptionDescription: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.md,
    },
    scheduledInputs: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },
    scheduledInput: {
      flex: 1,
    },
    errorText: {
      fontSize: theme.fontSize.xs,
      color: theme.colors.error,
      marginTop: theme.spacing.xs,
    },
    submitSection: {
      padding: theme.spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      // backgroundColor: theme.colors.surface,
      maxWidth: 600,
      width: '100%',
      alignSelf: 'center',
    },
    submitButton: {
      marginBottom: theme.spacing.sm,
    },
    helpText: {
      fontSize: theme.fontSize.xs,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 16,
    },
  })
  
  return (
    <KeyboardAvoidingContainer style={styles.container}>
      {/* 標題區 */}
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>發布除蟲任務</Text>
          <Text style={styles.subtitle}>詳細描述問題，讓專家更好為您服務</Text>
        </View>
        <TouchableOpacity style={styles.bellButton} onPress={handleNotificationPress}>
          <Bell size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.form}>
          {/* 基本資訊 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>基本資訊</Text>
            
            <Input
              label="任務標題"
              value={form.title}
              onChangeText={(title) => setForm({ ...form, title })}
              placeholder="例：客廳蟑螂問題急需處理"
              error={errors.title}
            />
            
            <Input
              label="問題描述"
              value={form.description}
              onChangeText={(description) => setForm({ ...form, description })}
              placeholder="詳細描述害蟲問題，包括發現位置、數量、影響等..."
              multiline
              numberOfLines={4}
              error={errors.description}
            />
          </View>
          
          {/* 害蟲類型 */}
          <View style={styles.section}>
            <PestSelector
              value={form.pestType}
              onChange={(pestType) => setForm({ ...form, pestType })}
              error={errors.pestType}
            />
          </View>
          
          {/* 專家性別偏好 */}
          <View style={styles.section}>
            <GenderSelector
              value={form.preferredGender}
              onChange={(preferredGender) => setForm({ ...form, preferredGender })}
            />
          </View>
          
          {/* 地點資訊 */}
          <AddressSelector
            value={form.location}
            onChange={(location) => setForm({ ...form, location })}
            errors={typeof errors.location === 'string' ? { city: errors.location } : undefined}
            showQuickSet={true} // 發布任務頁面顯示快速設定
          />
          
          {/* 時間安排 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>時間安排</Text>
            
            <View style={styles.timeOptionContainer}>
              <View style={styles.timeOptionHeader}>
                <View>
                  <Text style={styles.timeOptionTitle}>
                    {form.isImmediate ? '立即處理' : '預約時間'}
                  </Text>
                </View>
                <Switch
                  value={form.isImmediate}
                  onValueChange={(isImmediate) => setForm({ ...form, isImmediate })}
                  trackColor={{ false: theme.colors.border, true: theme.colors.secondary }}
                  thumbColor={theme.colors.primary}
                />
              </View>
              
              <Text style={styles.timeOptionDescription}>
                {form.isImmediate 
                  ? '我需要專家立即處理這個問題'
                  : '我希望在特定時間安排處理'
                }
              </Text>
            </View>
          </View>
          
          {/* 緊急程度 */}
          <View style={styles.section}>
            <PrioritySelector
              value={form.priority}
              onChange={(priority) => setForm({ ...form, priority })}
              error={errors.priority}
            />
          </View>
          
          {/* 預算範圍 */}
          <View style={styles.section}>
            <BudgetSelector
              value={form.budget}
              onChange={(budget) => setForm({ ...form, budget })}
              error={errors.budget}
            />
          </View>
          
        </View>
      </ScrollView>
      
      {/* 提交按鈕 */}
      <View style={styles.submitSection}>
        <Button
          variant="primary"
          loading={loading}
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