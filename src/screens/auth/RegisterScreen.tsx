// 註冊畫面

import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@/shared/theme'
import { Button, Input, Card } from '@/shared/ui'

export const RegisterScreen = () => {
  const { theme } = useTheme()
  const navigation = useNavigation<any>()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('錯誤', '請填寫所有欄位')
      return
    }
    
    if (password !== confirmPassword) {
      Alert.alert('錯誤', '密碼確認不符')
      return
    }
    
    setLoading(true)
    // 模擬註冊過程
    setTimeout(() => {
      setLoading(false)
      Alert.alert('成功', '註冊完成！', [
        { text: '確定', onPress: () => navigation.goBack() }
      ])
    }, 1500)
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: theme.spacing.lg,
      paddingTop: theme.spacing.xl,
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
  })
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card>
          <Text style={styles.title}>加入 Bug 119</Text>
          <Text style={styles.subtitle}>建立您的帳號</Text>
          
          <View style={styles.form}>
            <Input
              label="姓名"
              value={name}
              onChangeText={setName}
              placeholder="請輸入姓名"
            />
            
            <Input
              label="電子信箱"
              value={email}
              onChangeText={setEmail}
              placeholder="請輸入電子信箱"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Input
              label="密碼"
              value={password}
              onChangeText={setPassword}
              placeholder="請輸入密碼"
              secureTextEntry
            />
            
            <Input
              label="確認密碼"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="請再次輸入密碼"
              secureTextEntry
            />
            
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
      </ScrollView>
    </View>
  )
}