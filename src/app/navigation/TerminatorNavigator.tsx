// 蟲蟲終結者專用導航器（底部標籤）

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Search, CheckSquare, User } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { TerminatorTabParamList } from '@/shared/types'

// 導入畫面組件
import { TaskWallScreen } from '@/screens/task-wall/TaskWallScreen'
import { TasksScreen } from '@/screens/tasks/TasksScreen'
import { ProfileScreen } from '@/screens/profile/ProfileScreen'

const Tab = createBottomTabNavigator<TerminatorTabParamList>()

export const TerminatorNavigator = () => {
  const { theme } = useTheme()
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconProps = {
            size: size,
            color: color,
            strokeWidth: focused ? 2.5 : 2,
          }
          
          switch (route.name) {
            case 'TaskWall':
              return <Search {...iconProps} />
            case 'TaskList':
              return <CheckSquare {...iconProps} />
            case 'Profile':
              return <User {...iconProps} />
            default:
              return <Search {...iconProps} />
          }
        },
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false, // 隱藏標題列，因為畫面內有自定義標題
      })}
    >
      <Tab.Screen 
        name="TaskWall" 
        component={TaskWallScreen}
        options={{ title: '任務牆' }}
      />
      <Tab.Screen 
        name="TaskList" 
        component={TasksScreen}
        options={{ title: '任務' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: '我的' }}
      />
    </Tab.Navigator>
  )
}