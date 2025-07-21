import React, { FC, useRef, useEffect } from 'react'
import { View, Animated, PanGestureHandler, ScrollView } from 'react-native'
import { State } from 'react-native-gesture-handler'
import { LogoLoading } from '../logo-loading'
import { useTheme } from '@/shared/theme'
import { createStyles } from './LogoRefreshControl.styles'

interface LogoRefreshControlProps {
  children: React.ReactNode
  refreshing: boolean
  onRefresh: () => void
  scrollViewProps?: any
}

/**
 * 自定義下拉刷新組件，帶有 Logo 動畫
 */
export const LogoRefreshControl: FC<LogoRefreshControlProps> = ({
  children,
  refreshing,
  onRefresh,
  scrollViewProps = {}
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  
  const translateY = useRef(new Animated.Value(0)).current
  const refreshHeight = 80 // 觸發刷新的高度
  const maxPullDistance = 120 // 最大下拉距離
  
  useEffect(() => {
    if (refreshing) {
      // 開始刷新時，保持在刷新位置
      Animated.timing(translateY, {
        toValue: refreshHeight,
        duration: 200,
        useNativeDriver: true,
      }).start()
    } else {
      // 刷新完成時，回到原位
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [refreshing])

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { 
      useNativeDriver: true,
      listener: (event: any) => {
        // 限制下拉距離
        const { translationY } = event.nativeEvent
        if (translationY > maxPullDistance) {
          translateY.setValue(maxPullDistance)
        } else if (translationY < 0) {
          translateY.setValue(0)
        }
      }
    }
  )

  const onHandlerStateChange = (event: any) => {
    const { state, translationY } = event.nativeEvent
    
    if (state === State.END) {
      if (translationY > refreshHeight && !refreshing) {
        // 觸發刷新
        onRefresh()
      } else if (!refreshing) {
        // 回到原位
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start()
      }
    }
  }

  // 計算 logo 的透明度和縮放
  const logoOpacity = translateY.interpolate({
    inputRange: [0, refreshHeight / 2, refreshHeight],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  })

  const logoScale = translateY.interpolate({
    inputRange: [0, refreshHeight],
    outputRange: [0.5, 1],
    extrapolate: 'clamp',
  })

  return (
    <View style={styles.container}>
      {/* 下拉刷新指示器 */}
      <Animated.View
        style={[
          styles.refreshIndicator,
          {
            opacity: logoOpacity,
            transform: [
              { scale: logoScale },
              { translateY: Animated.add(translateY, -refreshHeight) }
            ],
          },
        ]}
      >
        <LogoLoading
          size="sm"
          showText={false}
          animationType={refreshing ? 'spin' : 'pulse'}
        />
      </Animated.View>

      {/* ScrollView 內容 */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
        enabled={!refreshing}
      >
        <Animated.View
          style={[
            styles.scrollContainer,
            { transform: [{ translateY }] }
          ]}
        >
          <ScrollView
            {...scrollViewProps}
            scrollEnabled={!refreshing}
            showsVerticalScrollIndicator={true}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}