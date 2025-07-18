// 個人檔案畫面

import { useAuthRedux } from '@/shared/hooks'
import { useTheme } from '@/shared/theme'
import { RootStackParamList, UserRole } from '@/shared/types'
import { Card } from '@/shared/ui'
import { showAlert } from '@/shared/utils'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Bell, List, LogOut, Moon, Sun, User } from 'lucide-react-native'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createStyles } from './ProfileScreen.styles'

type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditProfile'>

export const ProfileScreen = () => {
  const { theme, toggleTheme, themeMode } = useTheme()
  const { user, logout } = useAuthRedux()
  const navigation = useNavigation<ProfileNavigationProp>()
  const insets = useSafeAreaInsets()

  const handleNotificationPress = () => {
    navigation.navigate('Notifications')
  }

  const handleEditProfile = () => {
    navigation.navigate('EditProfile')
  }

  const handleMyTasksList = () => {
    navigation.navigate('MyTasksList')
  }

  const handleLogout = () => {
    showAlert('確認登出', '您確定要登出嗎？', [
      { text: '取消', style: 'cancel' },
      {
        text: '登出',
        style: 'destructive',
        onPress: async () => {
          await logout()
          // 不需要導航，因為 RootNavigator 會根據認證狀態自動切換
        },
      },
    ])
  }

  const getRoleDisplayName = (role: UserRole) => {
    switch (role) {
      case UserRole.FEAR_STAR:
        return '小怕星'
      case UserRole.TERMINATOR:
        return '蟲蟲終結者'
      case UserRole.ADMIN:
        return '管理員'
      default:
        return '未知角色'
    }
  }

  const styles = createStyles(theme, insets)

  return (
    <View style={styles.container}>
      {/* 標題列 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          {themeMode === 'light' ? (
            <Moon size={24} color={theme.colors.text} />
          ) : (
            <Sun size={24} color={theme.colors.text} />
          )}
        </TouchableOpacity>
        <Text style={styles.title}>我的</Text>
        <TouchableOpacity style={styles.bellButton} onPress={handleNotificationPress}>
          <Bell size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.profileCard}>
          <View style={styles.avatar} />
          <Text style={styles.name}>{user?.name || '訪客'}</Text>
          <Text style={styles.email}>{user?.email || ''}</Text>
          {user && (
            <View style={styles.roleContainer}>
              <Text style={styles.roleText}>{getRoleDisplayName(user.role)}</Text>
            </View>
          )}
        </Card>

        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}>帳號</Text> */}

          <Card padding="none">
            {/* 只有小怕星才顯示我的任務列表 */}
            {user?.role === UserRole.FEAR_STAR && (
              <TouchableOpacity style={styles.menuItem} onPress={handleMyTasksList}>
                <View style={styles.menuItemLeft}>
                  <List size={20} color={theme.colors.text} />
                  <Text style={styles.menuText}>我的任務列表</Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
              <View style={styles.menuItemLeft}>
                <User size={20} color={theme.colors.text} />
                <Text style={styles.menuText}>編輯個人資料</Text>
              </View>
            </TouchableOpacity>

            {/* 暫時註解帳號設定
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Settings size={20} color={theme.colors.text} />
                <Text style={styles.menuText}>帳號設定</Text>
              </View>
            </TouchableOpacity>
            */}
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <View style={styles.menuItemLeft}>
                <LogOut size={20} color={theme.colors.error} />
                <Text style={[styles.menuText, { color: theme.colors.error }]}>登出</Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </View>
  )
}
