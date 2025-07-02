// 載入畫面

import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useTheme } from '@/shared/theme'

export const LoadingScreen = () => {
  const { theme } = useTheme()
  
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
      marginBottom: theme.spacing.xl,
    },
  })
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bug 119</Text>
      <Text style={styles.subtitle}>怕蟲救星平台</Text>
      <ActivityIndicator size="large" color={theme.colors.secondary} />
    </View>
  )
}