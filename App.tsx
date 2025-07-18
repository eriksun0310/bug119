// Bug 119 主要應用程式檔案

import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { ThemeProvider } from './src/shared/theme'
import { useAuthRedux } from './src/shared/hooks/useAuthRedux'
import { AuthReduxProvider } from './src/shared/hooks/AuthReduxProvider'
import { RootNavigator } from './src/app/navigation'
import { LoadingScreen } from './src/screens/loading/LoadingScreen'
import { store } from './src/shared/store'

const AppContent = () => {
  const { isLoading } = useAuthRedux()
  
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