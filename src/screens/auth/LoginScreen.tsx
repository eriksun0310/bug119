// 登入畫面

import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@/shared/theme'
import { useAuth } from '@/shared/hooks'
import { Button, Input, Card, KeyboardAvoidingContainer } from '@/shared/ui'

export const LoginScreen = () => {
  const { theme } = useTheme()
  const { login } = useAuth()
  const navigation = useNavigation<any>()
  
  // 取得螢幕寬度
  const screenWidth = Dimensions.get('window').width
  const isTablet = screenWidth >= 768 // 判斷是否為平板或電腦
  
  // 表單狀態統一管理
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  
  const [errors, setErrors] = useState<Partial<typeof form>>({})
  const [loading, setLoading] = useState(false)
  
  // 統一的表單更新函數
  const handleInputChange = (field: keyof typeof form) => (value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    // 清除該欄位的錯誤
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }
  
  // 表單驗證函數
  const validateForm = (): boolean => {
    const newErrors: Partial<typeof form> = {}
    
    if (!form.email.trim()) {
      newErrors.email = '請輸入電子郵件'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = '請輸入有效的電子郵件格式'
    }
    
    if (!form.password) {
      newErrors.password = '請輸入密碼'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleLogin = async () => {
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    try {
      const success = await login(form.email, form.password)
      if (success) {
        navigation.replace('Main')
      } else {
        Alert.alert('錯誤', '帳號或密碼錯誤')
      }
    } catch (error) {
      Alert.alert('錯誤', '登入失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }
  
  // 快速填入測試帳號
  const fillTestAccount = (type: 'fearStar' | 'terminator') => {
    if (type === 'fearStar') {
      setForm(prev => ({
        ...prev,
        email: 'fearstar@test.com',
        password: '123456'
      }))
    } else {
      setForm(prev => ({
        ...prev,
        email: 'terminator@test.com',
        password: '123456'
      }))
    }
    // 清除錯誤
    setErrors({})
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
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: theme.spacing.lg,
    },
    registerText: {
      color: theme.colors.textSecondary,
      fontSize: theme.fontSize.md,
    },
    registerLink: {
      color: theme.colors.secondary,
      fontWeight: '600',
      marginLeft: theme.spacing.xs,
    },
    testAccountsContainer: {
      marginTop: theme.spacing.lg,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
    },
    testAccountsTitle: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    },
    testAccountsButtons: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },
    testAccountButton: {
      flex: 1,
    },
  })
  
  return (
    <KeyboardAvoidingContainer style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Card>
            <Text style={styles.title}>Bug 119</Text>
          <Text style={styles.subtitle}>歡迎回來！</Text>
          
          <View style={styles.form}>
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
            
            <Button
              variant="primary"
              loading={loading}
              onPress={handleLogin}
              style={{ marginTop: theme.spacing.md }}
            >
              登入
            </Button>
            
            <View style={styles.testAccountsContainer}>
              <Text style={styles.testAccountsTitle}>測試帳號：</Text>
              <View style={styles.testAccountsButtons}>
                <Button
                  variant="secondary"
                  size="sm"
                  onPress={() => fillTestAccount('fearStar')}
                  style={styles.testAccountButton}
                >
                  小怕星
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onPress={() => fillTestAccount('terminator')}
                  style={styles.testAccountButton}
                >
                  蟲蟲終結者
                </Button>
              </View>
            </View>
          </View>
          </Card>
          
          <View style={styles.registerContainer}>
          <Text style={styles.registerText}>還沒有帳號？</Text>
          <Text 
            style={styles.registerLink}
            onPress={() => navigation.navigate('Register')}
          >
            立即註冊
          </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingContainer>
  )
}