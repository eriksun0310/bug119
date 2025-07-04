// 發布任務畫面 - 小怕星專用

import React, { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Switch,
  Image
} from 'react-native'
import { 
  MapPin, 
  Clock, 
  Calendar,
  Camera,
  Send,
  Timer,
  X,
  Bell
} from 'lucide-react-native'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTheme } from '@/shared/theme'
import { useAuth } from '@/shared/hooks'
import { getCurrentLocationAddress, showAlert } from '@/shared/utils'
import { 
  Button, 
  Input, 
  Card,
  PestSelector,
  PrioritySelector,
  BudgetSelector,
  BudgetRange,
  GenderSelector
} from '@/shared/ui'
import { PestType, TaskPriority, RootStackParamList, Gender } from '@/shared/types'
import { CITY_OPTIONS, getCityOptionByName } from '@/shared/config/options.config'

type CreateTaskNavigationProp = NativeStackNavigationProp<RootStackParamList>

interface CreateTaskForm {
  title: string
  description: string
  pestType?: PestType
  priority: TaskPriority
  budget?: BudgetRange
  city: string
  district: string
  preferredGender?: Gender
  isImmediate: boolean
  scheduledDate?: string
  scheduledTime?: string
  images: string[]
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
    city: '',
    district: '',
    preferredGender: Gender.ANY,
    isImmediate: true,
    images: [],
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
    
    if (!form.city.trim()) {
      newErrors.city = '請選擇縣市'
    }
    
    if (!form.district.trim()) {
      newErrors.district = '請選擇區域'
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
                city: '',
                district: '',
                preferredGender: Gender.ANY,
                isImmediate: true,
                images: [],
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

  // 添加照片
  const handleAddPhoto = () => {
    if (Platform.OS === 'web') {
      // 網頁環境直接打開文件選擇器
      openWebImagePicker()
    } else {
      showAlert(
        '新增照片',
        '選擇照片來源',
        [
          { text: '相機', onPress: () => openCamera() },
          { text: '相簿', onPress: () => openImagePicker() },
          { text: '取消', style: 'cancel' }
        ]
      )
    }
  }

  // 網頁環境的圖片選擇器
  const openWebImagePicker = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = true
    input.onchange = (event: any) => {
      const files = event.target.files
      if (files && files.length > 0) {
        Array.from(files).forEach((file: any) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            if (e.target?.result) {
              setForm(prevForm => ({ 
                ...prevForm, 
                images: [...prevForm.images, e.target?.result as string] 
              }))
            }
          }
          reader.readAsDataURL(file)
        })
      }
    }
    input.click()
  }

  // 開啟相機
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      showAlert('需要相機權限', '請允許應用程式存取相機')
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    })

    if (!result.canceled && result.assets[0]) {
      setForm({ 
        ...form, 
        images: [...form.images, result.assets[0].uri] 
      })
    }
  }

  // 開啟相簿
  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      showAlert('需要相簿權限', '請允許應用程式存取相簿')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    })

    if (!result.canceled && result.assets[0]) {
      setForm({ 
        ...form, 
        images: [...form.images, result.assets[0].uri] 
      })
    }
  }

  // 移除照片
  const removeImage = (index: number) => {
    const newImages = form.images.filter((_, i) => i !== index)
    setForm({ ...form, images: newImages })
  }
  
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
    locationRow: {
      flexDirection: 'row',
      gap: theme.spacing.md,
    },
    citySelect: {
      flex: 1,
    },
    districtSelect: {
      flex: 1,
    },
    inputLabel: {
      fontSize: theme.fontSize.sm,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    selectButton: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      height: 48,
      justifyContent: 'center',
    },
    selectButtonText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
    },
    disabledButton: {
      opacity: 0.5,
    },
    disabledText: {
      color: theme.colors.textSecondary,
    },
    errorText: {
      fontSize: theme.fontSize.xs,
      color: theme.colors.error,
      marginTop: theme.spacing.xs,
    },
    quickSetRow: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.sm,
    },
    quickSetButton: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    quickSetText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.text,
      textAlign: 'center',
    },
    photoSection: {
      gap: theme.spacing.sm,
    },
    addPhotoButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      borderWidth: 2,
      borderColor: theme.colors.border,
      borderStyle: 'dashed',
    },
    addPhotoText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.sm,
    },
    submitSection: {
      padding: theme.spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
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
    imageGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.sm,
    },
    imageContainer: {
      position: 'relative',
      width: 80,
      height: 80,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: theme.borderRadius.md,
    },
    removeImageButton: {
      position: 'absolute',
      top: -5,
      right: -5,
      backgroundColor: theme.colors.error,
      borderRadius: 12,
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
  
  return (
    <View style={styles.container}>
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>地點資訊</Text>
            
            <View style={styles.locationRow}>
              <View style={styles.citySelect}>
                <Text style={styles.inputLabel}>縣市</Text>
                <TouchableOpacity 
                  style={styles.selectButton}
                  onPress={() => {
                    // 這裡可以開啟一個模態視窗選擇縣市，或使用簡單的 Alert
                    showAlert('選擇縣市', '請在這裡實作縣市選擇器')
                  }}
                >
                  <Text style={styles.selectButtonText}>
                    {form.city || '請選擇縣市'}
                  </Text>
                </TouchableOpacity>
                {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
              </View>
              
              <View style={styles.districtSelect}>
                <Text style={styles.inputLabel}>區域</Text>
                <TouchableOpacity 
                  style={[styles.selectButton, !form.city && styles.disabledButton]}
                  disabled={!form.city}
                  onPress={() => {
                    if (form.city) {
                      showAlert('選擇區域', '請在這裡實作區域選擇器')
                    }
                  }}
                >
                  <Text style={[styles.selectButtonText, !form.city && styles.disabledText]}>
                    {form.district || '請選擇區域'}
                  </Text>
                </TouchableOpacity>
                {errors.district && <Text style={styles.errorText}>{errors.district}</Text>}
              </View>
            </View>
            
            {/* 暫時手動設定預設值供測試 */}
            <View style={styles.quickSetRow}>
              <TouchableOpacity 
                style={styles.quickSetButton}
                onPress={() => setForm({ ...form, city: '台北市', district: '大安區' })}
              >
                <Text style={styles.quickSetText}>台北市 大安區</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.quickSetButton}
                onPress={() => setForm({ ...form, city: '新北市', district: '板橋區' })}
              >
                <Text style={styles.quickSetText}>新北市 板橋區</Text>
              </TouchableOpacity>
            </View>
          </View>
          
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
              
              {!form.isImmediate && (
                <View style={styles.scheduledInputs}>
                  <View style={styles.scheduledInput}>
                    <Input
                      label="預約日期"
                      value={form.scheduledDate || ''}
                      onChangeText={(scheduledDate) => setForm({ ...form, scheduledDate })}
                      placeholder="選擇日期"
                      error={errors.scheduledDate}
                      leftIcon={<Calendar size={16} color={theme.colors.textSecondary} />}
                    />
                  </View>
                  <View style={styles.scheduledInput}>
                    <Input
                      label="預約時間"
                      value={form.scheduledTime || ''}
                      onChangeText={(scheduledTime) => setForm({ ...form, scheduledTime })}
                      placeholder="選擇時間"
                      error={errors.scheduledTime}
                      leftIcon={<Clock size={16} color={theme.colors.textSecondary} />}
                    />
                  </View>
                </View>
              )}
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
          
          {/* 照片上傳 */}
          <View style={styles.section}>
            <View style={styles.photoSection}>
              <Text style={styles.sectionTitle}>照片上傳（選擇性）</Text>
              
              <TouchableOpacity 
                style={styles.addPhotoButton}
                onPress={handleAddPhoto}
              >
                <Camera size={24} color={theme.colors.textSecondary} />
                <Text style={styles.addPhotoText}>
                  新增害蟲照片或現場照片
                </Text>
              </TouchableOpacity>

              {form.images.length > 0 && (
                <View style={styles.imageGrid}>
                  {form.images.map((imageUri, index) => (
                    <View key={index} style={styles.imageContainer}>
                      <Image 
                        source={{ uri: imageUri }} 
                        style={styles.image}
                        resizeMode="cover"
                      />
                      <TouchableOpacity 
                        style={styles.removeImageButton}
                        onPress={() => removeImage(index)}
                      >
                        <X size={12} color={theme.colors.primary} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
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
    </View>
  )
}