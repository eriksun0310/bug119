// 編輯個人資料頁面

import React, { useState, useRef } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  Platform
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  Save,
  MessageCircle
} from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { useAuth } from '@/shared/hooks'
import { useFormValidation } from '@/shared/hooks/useFormValidation'
import { Input, SegmentedControl, AddressSelector, KeyboardAvoidingContainer } from '@/shared/ui'
import { showAlert } from '@/shared/utils'
import * as ImagePicker from 'expo-image-picker'
import { ContactMethod } from '@/shared/types'
import { CONTACT_METHOD_OPTIONS } from '@/shared/config/options.config'
import { editProfileValidationRules } from '@/shared/config/validation.config'

const EditProfileScreen = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const [loading, setLoading] = useState(false)
  const [avatarUri, setAvatarUri] = useState<string | null>(user?.avatar || null)
  const scrollViewRef = useRef<ScrollView>(null)
  
  // 取得螢幕寬度
  const screenWidth = Dimensions.get('window').width
  const isTablet = screenWidth >= 768 // 判斷是否為平板或電腦
  
  // 使用 useFormValidation Hook 統一管理表單
  const {
    form,
    errors,
    setForm,
    handleInputChange,
    validateForm
  } = useFormValidation(
    {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.contactInfo?.phone || '',
      line: user?.contactInfo?.line || '',
      telegram: user?.contactInfo?.telegram || '',
      city: user?.location?.city || '',
      district: user?.location?.district || '',
      bio: user?.bio || '',
      preferredMethod: user?.contactInfo?.preferredMethod || ContactMethod.PHONE,
    },
    editProfileValidationRules
  )
  
  // 為 AddressSelector 建立 location 物件
  const locationValue = {
    city: form.city,
    district: form.district
  }
  
  // 自訂驗證函數 - 處理根據偵好聯絡方式的條件式驗證
  const validateFormWithContactMethod = (): boolean => {
    // 先進行基本驗證
    if (!validateForm()) {
      console.log('基本驗證失敗，錯誤：', errors)
      return false
    }
    
    // 根據偵好聯絡方式驗證對應欄位
    if (form.preferredMethod === ContactMethod.PHONE && !form.phone.trim()) {
      console.log('手機號碼驗證失敗')
      return false
    }
    if (form.preferredMethod === ContactMethod.LINE && !form.line.trim()) {
      console.log('LINE ID 驗證失敗')
      return false
    }
    
    console.log('所有驗證通過')
    return true
  }
  
  // 處理自我介紹輸入框的焦點，滾動到底部
  const handleBioFocus = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 300) // 延遲確保鍵盤已完全彈出
  }

  // 處理更換頭像
  const handleChangeAvatar = () => {
    if (Platform.OS === 'web') {
      // Web 平台直接選擇檔案
      pickImageFromWeb()
    } else {
      // 原生平台顯示選項
      Alert.alert(
        '選擇頭像',
        '請選擇頭像來源',
        [
          { text: '取消', style: 'cancel' },
          { text: '從相簿選擇', onPress: pickImageFromLibrary },
          { text: '拍照', onPress: takePhoto }
        ]
      )
    }
  }

  // Web 平台選擇圖片
  const pickImageFromWeb = () => {
    try {
      if (typeof document === 'undefined') {
        Alert.alert('不支援', '此功能不支援當前平台')
        return
      }
      
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.multiple = false
      
      input.onchange = (event: any) => {
        const file = event.target.files?.[0]
        if (file) {
          // 檢查檔案大小（限制為 5MB）
          if (file.size > 5 * 1024 * 1024) {
            Alert.alert('檔案過大', '請選擇小於 5MB 的圖片檔案')
            return
          }
          
          // 檢查檔案類型
          if (!file.type.startsWith('image/')) {
            Alert.alert('檔案類型錯誤', '請選擇圖片檔案')
            return
          }
          
          // 讀取檔案並設定為頭像
          const reader = new FileReader()
          reader.onload = (e) => {
            const result = e.target?.result as string
            if (result) {
              setAvatarUri(result)
            }
          }
          reader.readAsDataURL(file)
        }
      }
      
      input.click()
    } catch (error) {
      Alert.alert('錯誤', '選擇圖片時發生錯誤')
    }
  }

  // 從相簿選擇圖片
  const pickImageFromLibrary = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
      
      if (!permissionResult.granted) {
        Alert.alert('權限不足', '需要相簿存取權限才能選擇照片')
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })

      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri)
      }
    } catch (error) {
      Alert.alert('錯誤', '選擇圖片時發生錯誤')
    }
  }

  // 拍照
  const takePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
      
      if (!permissionResult.granted) {
        Alert.alert('權限不足', '需要相機權限才能拍照')
        return
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })

      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri)
      }
    } catch (error) {
      Alert.alert('錯誤', '拍照時發生錯誤')
    }
  }

  // 處理儲存
  const handleSave = async () => {
    console.log('表單資料：', form)
    console.log('表單錯誤：', errors)
    
    if (!validateFormWithContactMethod()) {
      console.log('驗證失敗，表單資料：', form)
      console.log('驗證失敗，錯誤訊息：', errors)
      showAlert('表單有誤', '請檢查並修正錯誤')
      return
    }
    
    setLoading(true)
    
    try {
      // 模擬 API 呼叫
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // 如果有新的頭像，這裡會上傳到伺服器
      if (avatarUri && avatarUri !== user?.avatar) {
        // 模擬頭像上傳
        console.log('上傳頭像:', avatarUri)
        // 實際實作時會呼叫 API 上傳圖片
      }
      
      showAlert(
        '儲存成功',
        '您的個人資料已更新',
        [
          { 
            text: '確定', 
            onPress: () => navigation.goBack()
          }
        ]
      )
    } catch (error) {
      showAlert('儲存失敗', '請稍後再試')
    } finally {
      setLoading(false)
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.md,
      paddingTop: insets.top + theme.spacing.xs,
      paddingBottom: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      marginRight: theme.spacing.md,
    },
    headerTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      flex: 1,
    },
    saveButton: {
      padding: theme.spacing.xs,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      alignItems: isTablet ? 'center' : 'stretch',
    },
    form: {
      padding: theme.spacing.md,
      gap: theme.spacing.lg,
      width: '100%',
      maxWidth: isTablet ? 600 : undefined,
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
    avatarSection: {
      alignItems: 'center',
      marginBottom: theme.spacing.xl,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.md,
      overflow: 'hidden',
      ...(Platform.OS === 'web' && {
        cursor: 'pointer',
        transition: 'opacity 0.2s ease',
        '&:hover': {
          opacity: 0.8,
        },
      }),
    },
    avatarImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    changeAvatarButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.secondary,
      borderRadius: theme.borderRadius.md,
    },
    changeAvatarText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.primary,
      marginLeft: theme.spacing.xs,
    },
    infoCard: {
      backgroundColor: theme.colors.secondary + '10',
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.md,
    },
    infoText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      flex: 1,
      marginLeft: theme.spacing.sm,
      lineHeight: 20,
    },
    disabledInput: {
      opacity: 0.6,
    },
    genderNotice: {
      fontSize: theme.fontSize.xs,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
      fontStyle: 'italic',
    },
    roleInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: theme.spacing.md,
    },
    roleLabel: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginRight: theme.spacing.sm,
    },
    roleValue: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.secondary,
    },
    contactHint: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.md,
      fontStyle: 'italic',
    },
    preferredMethodContainer: {
      //marginTop: theme.spacing.md,
    },
    preferredMethodLabel: {
      fontSize: theme.fontSize.md,
      fontWeight: '500',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    inputLabel: {
      fontSize: theme.fontSize.sm,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    bottomContainer: {
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      alignItems: isTablet ? 'center' : 'stretch',
    },
    bottomContent: {
      padding: theme.spacing.md,
      width: '100%',
      maxWidth: isTablet ? 600 : undefined,
    },
  })
  
  return (
    <KeyboardAvoidingContainer style={styles.container}>
      {/* 標題列 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>編輯個人資料</Text>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
          disabled={loading}
        >
          <Save size={24} color={loading ? theme.colors.textSecondary : theme.colors.secondary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          {/* 頭像區塊 */}
          <View style={styles.avatarSection}>
            <TouchableOpacity style={styles.avatar} onPress={handleChangeAvatar}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
              ) : (
                <User size={40} color={theme.colors.textSecondary} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.changeAvatarButton} onPress={handleChangeAvatar}>
              <User size={16} color={theme.colors.primary} />
              <Text style={styles.changeAvatarText}>
                {Platform.OS === 'web' ? '選擇頭像' : '更換頭像'}
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* 基本資訊 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>基本資訊</Text>
            
            {/* 角色顯示 */}
            <View style={styles.roleInfo}>
              <Text style={styles.roleLabel}>帳號類型：</Text>
              <Text style={styles.roleValue}>
                {user?.role === 'fear_star' ? '小怕星' : '蟲蟲終結者'}
              </Text>
            </View>
            
            <Input
              label="姓名"
              value={form.name}
              onChangeText={handleInputChange('name')}
              placeholder="請輸入您的姓名"
              error={errors.name}
              leftIcon={<User size={16} color={theme.colors.textSecondary} />}
              required={true}
            />
            
            <Input
              label="電子郵件"
              value={form.email}
              onChangeText={handleInputChange('email')}
              placeholder="請輸入電子郵件"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              leftIcon={<Mail size={16} color={theme.colors.textSecondary} />}
              editable={false}
            />
            
            <AddressSelector
              label="居住地址"
              value={locationValue}
              onChange={(location) => {
                setForm({ ...form, city: location.city, district: location.district })
              }}
              errors={{ city: errors.city, district: errors.district }}
              showQuickSet={false} // 個人資料頁面不顯示快速設定
              required={true}
            />
          </View>
          
          
          {/* 聯絡方式 */}
          <View style={styles.section}>
            <View style={styles.preferredMethodContainer}>
              <Text style={styles.preferredMethodLabel}>
                聯絡方式
                <Text style={{ color: theme.colors.error }}> *</Text>
                ：
              </Text>
              <SegmentedControl
                options={CONTACT_METHOD_OPTIONS}
                value={form.preferredMethod}
                onValueChange={handleInputChange('preferredMethod')}
              />
            </View>
            
            {/* 根據選擇的聯絡方式顯示對應輸入框 */}
            {form.preferredMethod === ContactMethod.PHONE && (
              <Input
                label="手機號碼"
                value={form.phone}
                onChangeText={handleInputChange('phone')}
                placeholder="請輸入手機號碼"
                keyboardType="phone-pad"
                error={errors.phone}
                leftIcon={<Phone size={16} color={theme.colors.textSecondary} />}
              />
            )}
            
            {form.preferredMethod === ContactMethod.LINE && (
              <Input
                label="LINE ID"
                value={form.line}
                onChangeText={handleInputChange('line')}
                placeholder="請輸入 LINE ID"
                error={errors.line}
                leftIcon={<MessageCircle size={16} color="#00B900" />}
              />
            )}
          </View>
          
          {/* 個人簡介 */}
          <View style={styles.section}>
            <Input
              label='自我介紹'
              value={form.bio}
              onChangeText={handleInputChange('bio')}
              onFocus={handleBioFocus}
              placeholder={
                user?.role === 'terminator' 
                  ? '介紹您的除蟲經驗、專長等...'
                  : '簡單介紹自己...'
              }
              multiline
              numberOfLines={4}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingContainer>
  )
}

export { EditProfileScreen }