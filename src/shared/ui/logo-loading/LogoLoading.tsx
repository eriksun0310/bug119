import { useTheme } from '@/shared/theme'
import React, { FC, useEffect, useRef } from 'react'
import { Animated, Image, Text, View, Platform } from 'react-native'
import { createStyles } from './LogoLoading.styles'
import { LogoLoadingProps } from './LogoLoading.types'

// 預載 logo 圖片
const logoSource = require('../../../../assets/images/logo.png')
// 只在原生平台上使用 resolveAssetSource
if (Platform.OS !== 'web' && Image.resolveAssetSource) {
  Image.resolveAssetSource(logoSource)
}

/**
 * Logo 載入元件
 * 用於顯示帶有 Bug 119 Logo 的載入動畫
 */
export const LogoLoading: FC<LogoLoadingProps> = ({
  size = 'md',
  showText = true,
  style,
  animationType = 'spin',
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  // 動畫值
  const spinValue = useRef(new Animated.Value(0)).current
  const pulseValue = useRef(new Animated.Value(1)).current

  useEffect(() => {
    let animation: Animated.CompositeAnimation

    switch (animationType) {
      case 'spin':
        animation = Animated.loop(
          Animated.timing(spinValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          })
        )
        break

      case 'pulse':
        animation = Animated.loop(
          Animated.sequence([
            Animated.timing(pulseValue, {
              toValue: 0.8,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(pulseValue, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        )
        break
    }

    animation.start()

    return () => {
      animation.stop()
    }
  }, [animationType, spinValue, pulseValue])

  // 計算動畫變換
  const getAnimatedStyle = () => {
    switch (animationType) {
      case 'spin':
        const spin = spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        })
        return {
          transform: [{ rotate: spin }],
        }

      case 'pulse':
        return {
          transform: [{ scale: pulseValue }],
        }

      default:
        return {}
    }
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.logoContainer}>
        <Animated.View style={getAnimatedStyle()}>
          <Image
            source={logoSource}
            style={[styles.logo, styles[size]]}
            resizeMode="contain"
            fadeDuration={0} // 立即顯示，不要淡入效果
          />
        </Animated.View>
      </View>

      {showText && <Text style={styles.loadingText}>loading</Text>}
    </View>
  )
}
