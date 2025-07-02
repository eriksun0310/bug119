// 根導航器

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList, UserRole } from '@/shared/types'
import { useTheme } from '@/shared/theme'
import { useAuth } from '@/shared/hooks'

// 導入畫面組件
import { SplashScreen } from '@/screens/splash/SplashScreen'
import { AuthNavigator } from './AuthNavigator'
import { MainNavigator } from './MainNavigator'
import { TerminatorNavigator } from './TerminatorNavigator'
import { TaskDetailScreen } from '@/screens/task-detail'
import { EditProfileScreen } from '@/screens/edit-profile'
import { MessageDetailScreen } from '@/screens/message-detail'
import { NotificationsScreen } from '@/screens/notifications'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator = () => {
  const { theme } = useTheme()
  const { user, isLoading } = useAuth()
  
  // 根據用戶角色選擇導航器
  const getMainNavigator = () => {
    if (!user) return MainNavigator
    
    return user.role === UserRole.TERMINATOR ? TerminatorNavigator : MainNavigator
  }
  
  const MainNav = getMainNavigator()
  
  // 如果未登入，直接顯示認證畫面
  if (!user) {
    return (
      <NavigationContainer
        theme={{
          dark: false,
          colors: {
            primary: theme.colors.secondary,
            background: theme.colors.background,
            card: theme.colors.surface,
            text: theme.colors.text,
            border: theme.colors.border,
            notification: theme.colors.error,
          },
          fonts: {
            regular: {
              fontFamily: 'System',
              fontWeight: '400',
            },
            medium: {
              fontFamily: 'System',
              fontWeight: '500',
            },
            bold: {
              fontFamily: 'System',
              fontWeight: '600',
            },
            heavy: {
              fontFamily: 'System',
              fontWeight: '700',
            },
          },
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.colors.background },
          }}
        >
          <Stack.Screen name="Auth" component={AuthNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: theme.colors.secondary,
          background: theme.colors.background,
          card: theme.colors.surface,
          text: theme.colors.text,
          border: theme.colors.border,
          notification: theme.colors.error,
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '600',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '700',
          },
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="Main" component={MainNav} />
        <Stack.Screen 
          name="TaskDetail" 
          component={TaskDetailScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen 
          name="MessageDetail" 
          component={MessageDetailScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen 
          name="Notifications" 
          component={NotificationsScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}