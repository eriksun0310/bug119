// 主要導航器（底部標籤）

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Bug, List, User } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { FearStarTabParamList } from '@/shared/types'

// 暫時使用統一的標籤類型，後續根據用戶角色動態切換
type MainTabParamList = FearStarTabParamList

// 導入畫面組件
import { CreateTaskScreen } from '@/screens/create-task/CreateTaskScreen'
import { TasksScreen } from '@/screens/tasks/TasksScreen'
import { ProfileScreen } from '@/screens/profile/ProfileScreen'

const Tab = createBottomTabNavigator<MainTabParamList>()

export const MainNavigator = () => {
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
            case 'PublishTask':
              return <Bug {...iconProps} />
            case 'TaskList':
              return <List {...iconProps} />
            case 'Profile':
              return <User {...iconProps} />
            default:
              return <Bug {...iconProps} />
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
        name="PublishTask" 
        component={CreateTaskScreen}
        options={{ title: '發任務' }}
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