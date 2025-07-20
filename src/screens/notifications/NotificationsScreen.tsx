// 通知頁面

import React, { useState } from 'react'
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl 
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { 
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  MapPin,
  Trash2
} from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { RootStackParamList } from '@/shared/types'
import { ScreenHeader } from '@/shared/ui/screen-header'
import { createStyles } from './NotificationsScreen.styles'

type NotificationsNavigationProp = NativeStackNavigationProp<RootStackParamList>

interface Notification {
  id: string
  type: 'task_status' | 'urgent_task' | 'system' | 'message'
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  taskId?: string
  priority?: 'high' | 'medium' | 'low'
}

export const NotificationsScreen: React.FC = () => {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<NotificationsNavigationProp>()
  const [refreshing, setRefreshing] = useState(false)
  
  // 模擬通知數據
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'urgent_task',
      title: '緊急任務通知',
      message: '新北市板橋區有緊急蟑螂問題需要立即處理，預算 $2000-3000',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5分鐘前
      isRead: false,
      taskId: 'task_urgent_1',
      priority: 'high'
    },
    {
      id: '2',
      type: 'task_status',
      title: '任務狀態更新',
      message: '您接受的任務「客廳螞蟻問題處理」已被客戶確認完成',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30分鐘前
      isRead: false,
      taskId: 'task_123',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'message',
      title: '新訊息',
      message: '小怕星用戶向您發送了新訊息',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2小時前
      isRead: true,
      priority: 'low'
    },
    {
      id: '4',
      type: 'task_status',
      title: '任務指派',
      message: '恭喜！您已成功接受任務「廚房除蟲服務」',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4小時前
      isRead: true,
      taskId: 'task_456',
      priority: 'medium'
    },
    {
      id: '5',
      type: 'urgent_task',
      title: '緊急任務通知',
      message: '台北市信義區辦公大樓發現大量白蟻，急需專業處理，預算 $5000-8000',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6小時前
      isRead: true,
      taskId: 'task_urgent_2',
      priority: 'high'
    },
    {
      id: '6',
      type: 'system',
      title: '系統更新',
      message: 'Bug 119 平台已更新至最新版本，新增了任務評價功能',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1天前
      isRead: true,
      priority: 'low'
    }
  ])
  
  // 格式化時間
  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    
    if (days > 0) {
      return `${days}天前`
    } else if (hours > 0) {
      return `${hours}小時前`
    } else if (minutes > 0) {
      return `${minutes}分鐘前`
    } else {
      return '剛剛'
    }
  }
  
  // 獲取通知圖示
  const getNotificationIcon = (type: Notification['type'], priority?: string) => {
    switch (type) {
      case 'urgent_task':
        return <AlertTriangle size={20} color={theme.colors.error} />
      case 'task_status':
        return <CheckCircle size={20} color={theme.colors.success} />
      case 'message':
        return <User size={20} color={theme.colors.secondary} />
      case 'system':
        return <Clock size={20} color={theme.colors.textSecondary} />
      default:
        return <Clock size={20} color={theme.colors.textSecondary} />
    }
  }
  
  // 標記為已讀
  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }
  
  // 刪除通知
  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    )
  }
  
  // 處理通知點擊
  const handleNotificationPress = (notification: Notification) => {
    // 標記為已讀
    markAsRead(notification.id)
    
    // 根據通知類型進行導航
    if (notification.taskId) {
      navigation.navigate('TaskDetail', { taskId: notification.taskId })
    }
  }
  
  // 處理重新整理
  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }
  
  // 全部標記為已讀
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }
  
  const unreadCount = notifications.filter(n => !n.isRead).length
  
  const styles = createStyles(theme, insets)
  
  return (
    <View style={styles.container}>
      {/* 標題列 */}
      <ScreenHeader
        title={`通知${unreadCount > 0 ? ` (${unreadCount})` : ''}`}
        rightActions={
          unreadCount > 0 ? (
            <TouchableOpacity onPress={markAllAsRead}>
              <Text style={styles.markAllText}>全部已讀</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />
      
      {/* 通知列表 */}
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <CheckCircle size={48} color={theme.colors.textSecondary} />
            <Text style={styles.emptyStateText}>暫無通知</Text>
          </View>
        ) : (
          notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationItem,
                !notification.isRead && styles.unreadNotification
              ]}
              onPress={() => handleNotificationPress(notification)}
            >
              {!notification.isRead && <View style={styles.unreadDot} />}
              
              <View style={styles.notificationIcon}>
                {getNotificationIcon(notification.type, notification.priority)}
              </View>
              
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text 
                    style={styles.notificationTitle}
                    numberOfLines={1}
                  >
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationTime}>
                    {formatTime(notification.timestamp)}
                  </Text>
                </View>
                
                <Text 
                  style={styles.notificationMessage}
                  numberOfLines={2}
                >
                  {notification.message}
                </Text>
                
                <View style={styles.notificationActions}>
                  {notification.taskId && (
                    <TouchableOpacity style={styles.actionButton}>
                      <MapPin size={16} color={theme.colors.secondary} />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => deleteNotification(notification.id)}
                  >
                    <Trash2 size={16} color={theme.colors.textSecondary} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  )
}