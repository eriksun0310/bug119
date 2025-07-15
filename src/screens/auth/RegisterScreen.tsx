// 註冊畫面

import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@/shared/theme'
import { useFormValidation } from '@/shared/hooks/useFormValidation'
import { Button, Input, Card, SegmentedControl, KeyboardAvoidingContainer } from '@/shared/ui'
import { ContactMethod } from '@/shared/types'
import { CONTACT_METHOD_OPTIONS } from '@/shared/config/options.config'
import { registerValidationRules } from '@/shared/config/validation.config'

export const RegisterScreen = () => {
  const { theme } = useTheme()
  const navigation = useNavigation<any>()
  
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      line: '',
      telegram: '',
      preferredMethod: ContactMethod.PHONE
    },
    registerValidationRules
  )
  
  const [loading, setLoading] = useState(false)
  
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
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.lg,
      paddingTop: theme.spacing.xl,
    },
    formContainer: {
      width: '100%',
      maxWidth: isTablet ? 400 : undefined, // 電腦版最大寬度 400px
    },
    title: {
      fontSize: theme.fontSize.xxl,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.xs,
    },
    subtitle: {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.xxl,
    },
    form: {
      gap: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
    optionalLabel: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.xs,
    },
    fieldLabel: {
      fontSize: theme.fontSize.md,
      fontWeight: '500',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
  })
  
  return (
    <KeyboardAvoidingContainer style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Card>
            <Text style={styles.title}>加入 Bug 119</Text>
          <Text style={styles.subtitle}>建立您的帳號</Text>
          
          <View style={styles.form}>
            <Input
              label="姓名"
              value={form.name}
              onChangeText={handleInputChange('name')}
              placeholder="請輸入姓名"
              error={errors.name}
            />
            
            <Input
              label="電子信箱"
              value={form.email}
              onChangeText={handleInputChange('email')}
              placeholder="請輸入電子信箱"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
            
            <Input
              label="密碼"
              value={form.password}
              onChangeText={handleInputChange('password')}
              placeholder="請輸入密碼"
              secureTextEntry
              error={errors.password}
            />
            
            <Input
              label="確認密碼"
              value={form.confirmPassword}
              onChangeText={handleInputChange('confirmPassword')}
              placeholder="請再次輸入密碼"
              secureTextEntry
              error={errors.confirmPassword}
            />
            
            <Text style={styles.sectionTitle}>聯絡方式</Text>
            
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
              />
            )}
            
            {form.preferredMethod === ContactMethod.LINE && (
              <Input
                label="LINE ID"
                value={form.line}
                onChangeText={handleInputChange('line')}
                placeholder="請輸入 LINE ID"
                error={errors.line}
              />
            )}
            
            <Button
              variant="primary"
              loading={loading}
              onPress={handleRegister}
              style={{ marginTop: theme.spacing.md }}
            >
              註冊
            </Button>
          </View>
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingContainer>
  )
}