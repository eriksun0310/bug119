// Bug 119 主要應用程式檔案

import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeProvider, useTheme } from './src/shared/theme'
import { AuthProvider, useAuth } from './src/shared/hooks'
import { RootNavigator } from './src/app/navigation'
import { LoadingScreen } from './src/screens/loading/LoadingScreen'

const AppContent = () => {
  const { isLoading } = useAuth()
  
  if (isLoading) {
    return <LoadingScreen />
  }
  
  return <RootNavigator />
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <StatusBar style="auto" />
            <AppContent />
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}