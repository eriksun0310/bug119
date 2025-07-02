// 認證導航器

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from '@/shared/theme'

// 認證相關畫面（暫時建立空組件）
import { LoginScreen } from '@/screens/auth/LoginScreen'
import { RegisterScreen } from '@/screens/auth/RegisterScreen'

type AuthStackParamList = {
  Login: undefined
  Register: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

export const AuthNavigator = () => {
  const { theme } = useTheme()
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ title: '登入' }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ title: '註冊' }}
      />
    </Stack.Navigator>
  )
}