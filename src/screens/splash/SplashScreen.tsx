// 啟動畫面

import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@/shared/theme'
import { useAuth } from '@/shared/hooks'

export const SplashScreen = () => {
  const { theme } = useTheme()
  const { isAuthenticated } = useAuth()
  const navigation = useNavigation<any>()
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('Main')
      } else {
        navigation.replace('Auth')
      }
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [navigation, isAuthenticated])
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: theme.fontSize.xxl,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    subtitle: {
      fontSize: theme.fontSize.lg,
      color: theme.colors.textSecondary,
    },
  })
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bug 119</Text>
      <Text style={styles.subtitle}>怕蟲救星平台</Text>
    </View>
  )
}