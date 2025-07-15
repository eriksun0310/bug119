import { useState, useEffect } from 'react'
import { Dimensions, ScaledSize } from 'react-native'

export interface UseResponsiveReturn {
  screenWidth: number
  screenHeight: number
  isTablet: boolean
  isMobile: boolean
  isSmallScreen: boolean
  isLargeScreen: boolean
  orientation: 'portrait' | 'landscape'
}

/**
 * 響應式設計 Hook
 * 統一處理螢幕尺寸檢測和響應式邏輯
 */
export const useResponsive = (): UseResponsiveReturn => {
  const [dimensions, setDimensions] = useState<ScaledSize>(() => Dimensions.get('window'))

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window)
    })

    return () => subscription?.remove()
  }, [])

  const { width, height } = dimensions

  // 螢幕尺寸判斷
  const isTablet = width >= 768
  const isMobile = width < 768
  const isSmallScreen = width < 480
  const isLargeScreen = width >= 1024

  // 螢幕方向
  const orientation = width > height ? 'landscape' : 'portrait'

  return {
    screenWidth: width,
    screenHeight: height,
    isTablet,
    isMobile,
    isSmallScreen,
    isLargeScreen,
    orientation,
  }
}