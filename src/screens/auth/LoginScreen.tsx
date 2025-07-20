// 登入畫面

import { loginValidationRules } from '@/shared/config/validation.config'
import { useAuthRedux, useResponsive } from '@/shared/hooks'
import { useFormValidation } from '@/shared/hooks/useFormValidation'
import { useTheme } from '@/shared/theme'
import { Button, Input, KeyboardAvoidingContainer, LogoLoading } from '@/shared/ui'
import { showAlert } from '@/shared/utils'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { createStyles } from './LoginScreen.styles'

export const LoginScreen = () => {
  const { theme } = useTheme()
  const { login } = useAuthRedux()
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
      email: 'test@example.com',
      password: '123456'
    },
    loginValidationRules
  )
  
  const [loading, setLoading] = useState(false)
  
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
        showAlert('錯誤', '帳號或密碼錯誤')
      }
    } catch (error) {
      showAlert('錯誤', '登入失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }
  
  // 快速填入測試帳號
  const fillTestAccount = (type: 'fearStar' | 'terminator') => {
    if (type === 'fearStar') {
      setForm({
        email: 'fearstar@test.com',
        password: '123456'
      })
    } else {
      setForm({
        email: 'terminator@test.com',
        password: '123456'
      })
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