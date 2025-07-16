// 載入畫面

import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useTheme } from '@/shared/theme'
import { createStyles } from './LoadingScreen.styles'

export const LoadingScreen = () => {
  const { theme } = useTheme()
  
  const styles = createStyles(theme)
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bug 119</Text>
      <Text style={styles.subtitle}>怕蟲救星平台</Text>
      <ActivityIndicator size="large" color={theme.colors.secondary} />
    </View>
  )
}