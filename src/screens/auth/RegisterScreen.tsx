// 註冊畫面

import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@/shared/theme'
import { Button, Input, Card, SegmentedControl, KeyboardAvoidingContainer } from '@/shared/ui'
import { ContactMethod } from '@/shared/types'
import { CONTACT_METHOD_OPTIONS } from '@/shared/config/options.config'

export const RegisterScreen = () => {
  const { theme } = useTheme()
  const navigation = useNavigation<any>()
  
  // 取得螢幕寬度
  const screenWidth = Dimensions.get('window').width
  const isTablet = screenWidth >= 768 // 判斷是否為平板或電腦
  
  // 表單狀態統一管理
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    line: '',
    telegram: '',
    preferredMethod: ContactMethod.PHONE
  })
  
  const [errors, setErrors] = useState<Partial<typeof form>>({})
  const [loading, setLoading] = useState(false)
  
  // 統一的表單更新函數
  const handleInputChange = (field: keyof typeof form) => (value: string | ContactMethod) => {
    setForm(prev => ({ ...prev, [field]: value }))
    // 清除該欄位的錯誤
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }
  
  // 表單驗證函數
  const validateForm = (): boolean => {
    const newErrors: Partial<typeof form> = {}
    
    if (!form.name.trim()) {
      newErrors.name = '請輸入姓名'
    }
    
    if (!form.email.trim()) {
      newErrors.email = '請輸入電子郵件'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = '請輸入有效的電子郵件格式'
    }
    
    if (!form.password) {
      newErrors.password = '請輸入密碼'
    } else if (form.password.length < 6) {
      newErrors.password = '密碼至少需要6個字元'
    }
    
    if (!form.confirmPassword) {
      newErrors.confirmPassword = '請確認密碼'
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = '密碼確認不符'
    }
    
    // 根據偏好聯絡方式驗證對應欄位
    if (form.preferredMethod === ContactMethod.PHONE) {
      if (!form.phone.trim()) {
        newErrors.phone = '請輸入手機號碼'
      } else if (!/^09\d{8}$/.test(form.phone)) {
        newErrors.phone = '請輸入有效的手機號碼格式'
      }
    } else if (form.preferredMethod === ContactMethod.LINE) {
      if (!form.line.trim()) {
        newErrors.line = '請輸入 LINE ID'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleRegister = async () => {
    if (!validateForm()) {
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