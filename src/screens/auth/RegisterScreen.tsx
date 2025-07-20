// 註冊畫面

import { CONTACT_METHOD_OPTIONS, USER_ROLE_OPTIONS } from '@/shared/config/options.config'
import { registerValidationRules } from '@/shared/config/validation.config'
import { useResponsive } from '@/shared/hooks'
import { useFormValidation } from '@/shared/hooks/useFormValidation'
import { useTheme } from '@/shared/theme'
import { ContactMethod, UserRole } from '@/shared/types'
import { AddressSelector, Button, Input, KeyboardAvoidingContainer, LogoLoading, SegmentedControl } from '@/shared/ui'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { createStyles } from './RegisterScreen.styles'

export const RegisterScreen = () => {
  const { theme } = useTheme()
  const { isTablet } = useResponsive()
  const navigation = useNavigation<any>()
  
  // 使用 useFormValidation Hook 統一管理表單
  const {
    form,
    errors,
    setForm,
    handleInputChange,
    validateForm
  } = useFormValidation(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: UserRole.FEAR_STAR,
      city: '',
      district: '',
      phone: '',
      line: '',
      telegram: '',
      preferredMethod: ContactMethod.PHONE
    },
    registerValidationRules
  )
  
  const [loading, setLoading] = useState(false)
  
  // 為 AddressSelector 建立 location 物件
  const locationValue = {
    city: form.city,
    district: form.district
  }
  
  // 自訂驗證函數 - 處理根據偏好聯絡方式的條件式驗證
  const validateFormWithContactMethod = (): boolean => {
    // 先進行基本驗證
    if (!validateForm()) {
      return false
    }
    
    // 根據偏好聯絡方式驗證對應欄位
    if (form.preferredMethod === ContactMethod.PHONE && !form.phone.trim()) {
      return false
    }
    if (form.preferredMethod === ContactMethod.LINE && !form.line.trim()) {
      return false
    }
    
    return true
  }
  
  const handleRegister = async () => {
    if (!validateFormWithContactMethod()) {
      Alert.alert('表單驗證失敗', '請檢查並修正所有錯誤')
      return
    }
    
    setLoading(true)
    try {
      // 模擬註冊 API 呼叫
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      Alert.alert('成功', '註冊完成！', [
        { text: '確定', onPress: () => navigation.goBack() }
      ])
    } catch (error) {
      Alert.alert('錯誤', '註冊失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  const styles = createStyles(theme, isTablet)
  
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
              <Image 
                source={require('../../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            <Text style={styles.title}>加入 Bug 119</Text>
          <Text style={styles.subtitle}>建立您的帳號</Text>
          
          <View style={styles.form}>
            <Input
              label="姓名"
              value={form.name}
              onChangeText={handleInputChange('name')}
              placeholder="請輸入姓名"
              error={errors.name}
              required
            />
            
            <Input
              label="電子信箱"
              value={form.email}
              onChangeText={handleInputChange('email')}
              placeholder="請輸入電子信箱"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              required
            />
            
            <Input
              label="密碼（至少6個字元）"
              value={form.password}
              onChangeText={handleInputChange('password')}
              placeholder="請輸入密碼"
              secureTextEntry
              error={errors.password}
              required
            />
            
            <Input
              label="確認密碼"
              value={form.confirmPassword}
              onChangeText={handleInputChange('confirmPassword')}
              placeholder="請再次輸入密碼"
              secureTextEntry
              error={errors.confirmPassword}
              required
            />
            
            <View style={{ marginBottom: theme.spacing.md }}>
              <Text style={styles.fieldLabel}>選擇角色</Text>
              <SegmentedControl
                options={USER_ROLE_OPTIONS.filter(option => option.value !== UserRole.ADMIN)}
                value={form.role}
                onValueChange={handleInputChange('role')}
              />
            </View>
            
            <AddressSelector
              label="居住地址"
              value={locationValue}
              onChange={(location) => {
                setForm({ ...form, city: location.city, district: location.district })
              }}
              errors={{ city: errors.city, district: errors.district }}
              showQuickSet={false}
              required
            />
            
         
            
            <View style={{ marginBottom: theme.spacing.md }}>
              <Text style={styles.fieldLabel}>偏好聯絡方式</Text>
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
                required
              />
            )}
            
            {form.preferredMethod === ContactMethod.LINE && (
              <Input
                label="LINE ID"
                value={form.line}
                onChangeText={handleInputChange('line')}
                placeholder="請輸入 LINE ID"
                error={errors.line}
                required
              />
            )}
            
            <Button
              variant="primary"
              onPress={handleRegister}
              loading={loading}
              style={{ marginTop: theme.spacing.md }}
            >
              註冊
            </Button>
          </View>
       
        </View>
      </ScrollView>
    </KeyboardAvoidingContainer>
  )
}