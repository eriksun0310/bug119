// 編輯個人資料頁面

import { CONTACT_METHOD_OPTIONS } from '@/shared/config/options.config'
import { editProfileValidationRules } from '@/shared/config/validation.config'
import { useAuthRedux, useResponsive } from '@/shared/hooks'
import { useFormValidation } from '@/shared/hooks/useFormValidation'
import { useTheme } from '@/shared/theme'
import { ContactMethod } from '@/shared/types'
import { AddressSelector, AvatarPicker, Input, KeyboardAvoidingContainer, LogoLoading, SegmentedControl } from '@/shared/ui'
import { ScreenHeader } from '@/shared/ui/screen-header'
import { showAlert } from '@/shared/utils'
import { useNavigation } from '@react-navigation/native'
import {
  Mail,
  MessageCircle,
  Phone,
  Save,
  User
} from 'lucide-react-native'
import React, { useRef, useState } from 'react'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createStyles } from './EditProfileScreen.styles'

const EditProfileScreen = () => {
  const { theme } = useTheme()
  const { user } = useAuthRedux()
  const { isTablet } = useResponsive()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const [loading, setLoading] = useState(false)
  const [avatarUri, setAvatarUri] = useState<string | null>(user?.avatar || null)
  const scrollViewRef = useRef<ScrollView>(null)
  
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
      return false
    }
    
    // 驗證頭像是否已選擇
    if (!avatarUri) {
      showAlert('請選擇頭像', '請上傳您的個人頭像')
      return false
    }
    
    // 根據偵好聯絡方式驗證對應欄位
    if (form.preferredMethod === ContactMethod.PHONE && !form.phone.trim()) {
      return false
    }
    if (form.preferredMethod === ContactMethod.LINE && !form.line.trim()) {
      return false
    }
    
    return true
  }
  


  // 處理儲存
  const handleSave = async () => {
    
    if (!validateFormWithContactMethod()) {
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
  
  const styles = createStyles(theme, isTablet, insets)
  
  if (loading) {
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

  return (
    <KeyboardAvoidingContainer style={styles.container}>
      {/* 標題列 */}
      <ScreenHeader
        title="編輯個人資料"
        rightActions={
          <TouchableOpacity 
            onPress={handleSave}
            disabled={loading}
          >
            <Save size={24} color={theme.colors.secondary} />
          </TouchableOpacity>
        }
      />
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          {/* 頭像區塊 */}
          <AvatarPicker
            avatarUri={avatarUri}
            onAvatarChange={setAvatarUri}
            variant="standalone"
            size={80}
          />
          
          {/* 基本資訊 */}
          <View style={styles.section}>
            <Input
              label="角色"
              value={user?.role === 'fear_star'? '小怕星' : '蟲蟲終結者'}
              leftIcon={ user?.role === 'fear_star' ? <Star size={16} color={theme.colors.textSecondary} /> : <Bug size={16} color={theme.colors.textSecondary} />}
              editable={false}
            />
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
          
          
      
        
        </View>
      </ScrollView>
    </KeyboardAvoidingContainer>
  )
}

export { EditProfileScreen }
