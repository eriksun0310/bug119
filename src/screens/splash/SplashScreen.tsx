// Bug 119 啟動畫面

import React, { useEffect, useRef } from 'react'
import { View, Text, Image, Animated, Easing } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@/shared/theme'
import { SPLASH_CONFIG } from '@/shared/config/splash.config'
import { createStyles } from './SplashScreen.styles'

interface SplashScreenProps {
  onAnimationComplete?: () => void
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationComplete }) => {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()
  const styles = createStyles(theme, insets)
  
  // 動畫值
  const logoScale = useRef(new Animated.Value(0)).current
  const logoOpacity = useRef(new Animated.Value(0)).current
  const titleTranslateY = useRef(new Animated.Value(30)).current
  const titleOpacity = useRef(new Animated.Value(0)).current
  const subtitleOpacity = useRef(new Animated.Value(0)).current
  
  useEffect(() => {
    // 執行進場動畫
    Animated.sequence([
      // Logo 動畫
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: SPLASH_CONFIG.ANIMATIONS.LOGO_SCALE_DURATION,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(SPLASH_CONFIG.LOGO.SCALE_EFFECT)),
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: SPLASH_CONFIG.ANIMATIONS.LOGO_OPACITY_DURATION,
          useNativeDriver: true,
        }),
      ]),
      // 標題動畫
      Animated.parallel([
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: SPLASH_CONFIG.ANIMATIONS.TITLE_ANIMATION_DURATION,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: SPLASH_CONFIG.ANIMATIONS.TITLE_ANIMATION_DURATION,
          useNativeDriver: true,
        }),
      ]),
      // 副標題動畫
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: SPLASH_CONFIG.ANIMATIONS.SUBTITLE_ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 動畫完成後等待一下再回調
      setTimeout(() => {
        onAnimationComplete?.()
      }, SPLASH_CONFIG.ANIMATIONS.HOLD_DURATION)
    })
  }, [])
  
  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: logoScale }],
            opacity: logoOpacity,
          }
        ]}
      >
        <Image 
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      
      <Animated.View 
        style={[
          styles.textContainer,
          {
            transform: [{ translateY: titleTranslateY }],
            opacity: titleOpacity,
          }
        ]}
      >
        <Text style={styles.title}>Bug 119</Text>
      </Animated.View>
      
      <Animated.Text 
        style={[
          styles.subtitle,
          { opacity: subtitleOpacity }
        ]}
      >
        怕蟲救星平台
      </Animated.Text>
      
      <Animated.Text 
        style={[
          styles.tagline,
          { opacity: subtitleOpacity }
        ]}
      >
        小怕星與蟲蟲終結者的橋樑
      </Animated.Text>
    </View>
  )
}