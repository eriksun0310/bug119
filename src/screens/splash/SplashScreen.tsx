// 啟動畫面

import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@/shared/theme'
import { useAuthRedux } from '@/shared/hooks'
import { createStyles } from './SplashScreen.styles'

export const SplashScreen = () => {
  const { theme } = useTheme()
  const { isAuthenticated } = useAuthRedux()
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
  
  const styles = createStyles(theme)
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bug 119</Text>
      <Text style={styles.subtitle}>怕蟲救星平台</Text>
    </View>
  )
}