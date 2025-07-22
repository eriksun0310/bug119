// 載入畫面

import React from 'react'
import { View, Text, ActivityIndicator, Image } from 'react-native'
import { useTheme } from '@/shared/theme'
import { createStyles } from './LoadingScreen.styles'

export const LoadingScreen = () => {
  const { theme, themeMode } = useTheme()
  
  const styles = createStyles(theme)
  
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Image 
        key={themeMode}
        source={themeMode === 'light' 
          ? require('../../../assets/images/textLogo-dark.png')
          : require('../../../assets/images/textLogo-light.png')
        }
        style={styles.textLogo}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>怕蟲救星平台</Text>
      <ActivityIndicator size="large" color={theme.colors.secondary} style={{ marginTop: theme.spacing.lg }} />
    </View>
  )
}