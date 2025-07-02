// 個人檔案畫面

import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { User, LogOut, Sun, Moon, Bell } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@/shared/theme'
import { useAuth } from '@/shared/hooks'
import { UserRole, RootStackParamList } from '@/shared/types'

type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditProfile'>
import { Button, Card } from '@/shared/ui'
import { showAlert } from '@/shared/utils'

export const ProfileScreen = () => {
  const { theme, toggleTheme, themeMode } = useTheme()
  const { user, logout } = useAuth()
  const navigation = useNavigation<ProfileNavigationProp>()
  const insets = useSafeAreaInsets()
  
  
  const handleNotificationPress = () => {
    navigation.navigate('Notifications')
  }

  const handleEditProfile = () => {
    navigation.navigate('EditProfile')
  }
  
  const handleLogout = () => {
    showAlert(
      '確認登出',
      '您確定要登出嗎？',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '登出', 
          style: 'destructive',
          onPress: async () => {
            await logout()
            // 不需要導航，因為 RootNavigator 會根據認證狀態自動切換
          }
        }
      ]
    )
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
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.md,
      paddingTop: insets.top > 0 ? insets.top + theme.spacing.xs : theme.spacing.sm,
      paddingBottom: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      fontSize: theme.fontSize.xl,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
      flex: 1,
    },
    themeButton: {
      padding: theme.spacing.xs,
    },
    bellButton: {
      padding: theme.spacing.xs,
    },
    content: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
    },
    profileCard: {
      marginBottom: theme.spacing.lg,
      alignItems: 'center',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.border,
      marginBottom: theme.spacing.md,
    },
    name: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    email: {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
    },
    roleContainer: {
      marginTop: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      backgroundColor: theme.colors.secondary,
      borderRadius: theme.borderRadius.full,
    },
    roleText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    section: {
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    menuText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
    },
    menuValue: {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
    },
  })
  
  return (
    <View style={styles.container}>
      {/* 標題列 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.themeButton}
          onPress={toggleTheme}
        >
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
          <Text style={styles.sectionTitle}>帳號</Text>
          <Card padding="none">
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
                <Text style={[styles.menuText, { color: theme.colors.error }]}>
                  登出
                </Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </View>
  )
}