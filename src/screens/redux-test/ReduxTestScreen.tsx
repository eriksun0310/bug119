// Redux 測試畫面

import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useAuthRedux } from '@/shared/hooks/useAuthRedux'
import { Button, Input } from '@/shared/ui'
import { useTheme } from '@/shared/theme'

export const ReduxTestScreen = () => {
  const { theme } = useTheme()
  const { user, isAuthenticated, isLoading, error, login, logout } = useAuthRedux()
  
  const [email, setEmail] = useState('fearstar@example.com')
  const [password, setPassword] = useState('123456')

  const handleLogin = async () => {
    const success = await login(email, password)
    console.log('登入結果:', success)
  }

  const handleLogout = async () => {
    await logout()
  }

  const styles = {
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      marginBottom: 20,
      color: theme.colors.text,
    },
    section: {
      marginBottom: 20,
      padding: 15,
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600' as const,
      marginBottom: 10,
      color: theme.colors.text,
    },
    info: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 5,
    },
    error: {
      fontSize: 14,
      color: theme.colors.error,
      marginBottom: 10,
    },
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Redux 認證測試</Text>

      {/* 當前狀態 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>當前狀態</Text>
        <Text style={styles.info}>認證狀態: {isAuthenticated ? '已登入' : '未登入'}</Text>
        <Text style={styles.info}>載入中: {isLoading ? '是' : '否'}</Text>
        {error && <Text style={styles.error}>錯誤: {error}</Text>}
        {user && (
          <>
            <Text style={styles.info}>用戶名稱: {user.name}</Text>
            <Text style={styles.info}>用戶角色: {user.role}</Text>
            <Text style={styles.info}>電子郵件: {user.email}</Text>
          </>
        )}
      </View>

      {/* 登入表單 */}
      {!isAuthenticated && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>登入測試</Text>
          <Input
            label="電子郵件"
            value={email}
            onChangeText={setEmail}
            placeholder="輸入測試帳號"
          />
          <Input
            label="密碼"
            value={password}
            onChangeText={setPassword}
            placeholder="輸入密碼"
            secureTextEntry
          />
          <Button
            variant="primary"
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? '登入中...' : '登入'}
          </Button>
        </View>
      )}

      {/* 登出按鈕 */}
      {isAuthenticated && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>登出測試</Text>
          <Button
            variant="secondary"
            onPress={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? '登出中...' : '登出'}
          </Button>
        </View>
      )}

      {/* 測試說明 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>測試帳號</Text>
        <Text style={styles.info}>小怕星: fearstar@example.com / 123456</Text>
        <Text style={styles.info}>終結者: terminator@example.com / 123456</Text>
      </View>
    </ScrollView>
  )
}