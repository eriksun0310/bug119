// Bug 119 主要應用程式檔案

import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { ThemeProvider } from './src/shared/theme'
import { useAuthRedux } from './src/shared/hooks/useAuthRedux'
import { AuthReduxProvider } from './src/shared/hooks/AuthReduxProvider'
import { RootNavigator } from './src/app/navigation'
import { LoadingScreen } from './src/screens/loading/LoadingScreen'
import { SplashScreen } from './src/screens/splash'
import { SPLASH_CONFIG } from './src/shared/config/splash.config'
import { store } from './src/shared/store'
import { preloadImages } from './src/shared/utils'

const AppContent = () => {
  const { isLoading } = useAuthRedux()
  const [showSplash, setShowSplash] = useState(true)
  const [appReady, setAppReady] = useState(false)
  
  useEffect(() => {
    // 準備應用程式（載入字體、初始化資料等）
    const prepareApp = async () => {
      try {
        // 預載重要圖片資源
        await preloadImages()
        
        // 其他初始化邏輯
        await new Promise(resolve => setTimeout(resolve, SPLASH_CONFIG.PREPARATION.MOCK_LOADING_TIME))
      } catch (error) {
        console.warn('準備應用程式時發生錯誤:', error)
      } finally {
        setAppReady(true)
      }
    }
    
    prepareApp()
  }, [])
  
  const handleSplashComplete = useCallback(() => {
    setShowSplash(false)
  }, [])
  
  // 顯示自定義 splash screen
  if (!appReady || showSplash) {
    return <SplashScreen onAnimationComplete={handleSplashComplete} />
  }
  
  // 顯示載入畫面
  if (isLoading) {
    return <LoadingScreen />
  }
  
  return <RootNavigator />
}

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemeProvider>
            <AuthReduxProvider>
              <StatusBar style="auto" />
              <AppContent />
            </AuthReduxProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  )
}