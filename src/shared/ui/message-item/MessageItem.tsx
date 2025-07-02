import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native'
import { User, Trash2, Check } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import Swipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable'
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated'

interface ChatItem {
  id: string
  name: string
  lastMessage: string
  time: string
  unreadCount?: number
}

interface MessageItemProps {
  item: ChatItem
  onPress: (conversationId: string) => void
  onDelete: (id: string) => void
  onSwipeableOpen: (swipeableRef: SwipeableMethods) => void
  onSwipeableClose: (swipeableRef?: SwipeableMethods) => void
  // 批量刪除相關（網頁版專用）
  isDeleteMode?: boolean
  isSelected?: boolean
  onToggleSelect?: (id: string) => void
}

export const MessageItem: React.FC<MessageItemProps> = ({
  item,
  onPress,
  onDelete,
  onSwipeableOpen,
  onSwipeableClose,
  isDeleteMode = false,
  isSelected = false,
  onToggleSelect,
}) => {
  const { theme } = useTheme()
  const swipeableRef = useRef<SwipeableMethods>(null)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [isSwipeOpen, setIsSwipeOpen] = useState(false)

  // 處理點擊消息項目
  const handleMessagePress = () => {
    // 在網頁版的刪除模式下，點擊切換選擇狀態
    if (Platform.OS === 'web' && isDeleteMode && onToggleSelect) {
      onToggleSelect(item.id)
      return
    }

    // 如果滑動是開啟狀態，只關閉滑動，不執行導航
    if (isSwipeOpen) {
      swipeableRef.current?.close()
      return
    }
    
    // 只有在滑動關閉狀態下才執行導航
    onPress(item.id)
  }

  // 顯示刪除確認對話框
  const handleShowDeleteAlert = () => {
    swipeableRef.current?.close()
    Alert.alert(
      '刪除聊天室',
      `確定要刪除與「${item.name}」的聊天記錄嗎？此操作無法復原。`,
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '刪除', 
          style: 'destructive',
          onPress: () => onDelete(item.id)
        }
      ]
    )
  }

  // 渲染右滑選項（刪除按鈕）
  const renderRightActions = (
    progress: SharedValue<number>,
    translation: SharedValue<number>
  ) => {
    const animatedStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        Math.abs(translation.value),
        [0, 50],
        [0, 1],
        'clamp'
      )

      return {
        opacity,
      }
    })

    return (
      <Animated.View style={styles.rightActionContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleShowDeleteAlert}
          activeOpacity={0.7}
        >
          <Animated.View style={[styles.deleteIconWrapper, animatedStyle]}>
            <Trash2 color="#FFFFFF" size={24} />
            <Text style={styles.deleteText}>刪除</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.lg,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.md,
    },
    chatInfo: {
      flex: 1,
    },
    chatName: {
      fontSize: theme.fontSize.lg,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: theme.spacing.xs,
    },
    lastMessage: {
      fontSize: theme.fontSize.sm,
      color: '#666666',
      lineHeight: 20,
    },
    timeContainer: {
      alignItems: 'flex-end',
    },
    messageTime: {
      fontSize: theme.fontSize.sm,
      color: '#666666',
      marginBottom: theme.spacing.xs,
    },
    unreadBadge: {
      backgroundColor: theme.colors.error,
      borderRadius: 10,
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    unreadText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
    rightActionContainer: {
      backgroundColor: '#FF4444',
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
    },
    deleteButton: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteIconWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: theme.fontSize.sm,
      marginTop: theme.spacing.xs,
    },
    checkboxContainer: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.md,
    },
    checkboxSelected: {
      backgroundColor: theme.colors.secondary,
      borderColor: theme.colors.secondary,
    },
  })

  // 網頁版刪除模式時的渲染內容
  const renderContent = () => (
    <TouchableOpacity
      style={styles.container}
      onPress={handleMessagePress}
      activeOpacity={0.9}
    >
      {/* 網頁版刪除模式時顯示複選框 */}
      {Platform.OS === 'web' && isDeleteMode && (
        <View style={[styles.checkboxContainer, isSelected && styles.checkboxSelected]}>
          {isSelected && <Check size={16} color={theme.colors.primary} />}
        </View>
      )}
      
      <View style={styles.avatar}>
        <User size={24} color={theme.colors.textSecondary} />
      </View>
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={2}>
          {item.lastMessage}
        </Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.messageTime}>{item.time}</Text>
        {item.unreadCount && item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  // 網頁版的刪除模式時不使用 Swipeable
  if (Platform.OS === 'web' && isDeleteMode) {
    return renderContent()
  }

  // 移動端或非刪除模式時使用 Swipeable
  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      rightThreshold={30}
      overshootRight={true}
      friction={1.5}
      enableTrackpadTwoFingerGesture
      onSwipeableOpen={() => {
        setIsSwipeOpen(true)
        if (swipeableRef.current) {
          onSwipeableOpen(swipeableRef.current)
        }
      }}
      onSwipeableClose={() => {
        setIsSwipeOpen(false)
        if (swipeableRef.current) {
          onSwipeableClose(swipeableRef.current)
        } else {
          onSwipeableClose()
        }
      }}
    >
      {renderContent()}
    </Swipeable>
  )
}