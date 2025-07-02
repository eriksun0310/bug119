// 訊息列表畫面

import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Bell, Trash2, X, Check } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { MessageItem } from '@/shared/ui/message-item'
import { RootStackParamList } from '@/shared/types'
import { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable'
import { mockChatList, ChatItem } from '@/shared/mocks'

type MessagesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MessageDetail'>

export const MessagesScreen = () => {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<MessagesNavigationProp>()
  
  // 追蹤當前開啟的 Swipeable
  const currentOpenSwipeable = useRef<SwipeableMethods | null>(null)
  
  // 批量刪除相關狀態（僅網頁版使用）
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const isWebPlatform = Platform.OS === 'web'
  
  // 聊天室列表狀態
  const [chatList, setChatList] = useState<ChatItem[]>(mockChatList)
  
  const handleMessagePress = (conversationId: string) => {
    navigation.navigate('MessageDetail', { conversationId })
  }
  
  const handleNotificationPress = () => {
    navigation.navigate('Notifications')
  }

  // 批量刪除相關函數（網頁版專用）
  const handleToggleDeleteMode = () => {
    console.log('handleToggleDeleteMode called, current isDeleteMode:', isDeleteMode)
    
    if (isDeleteMode) {
      // 退出刪除模式
      console.log('Exiting delete mode')
      setIsDeleteMode(false)
      setSelectedItems(new Set())
    } else {
      // 進入刪除模式
      console.log('Entering delete mode')
      setIsDeleteMode(true)
    }
  }

  const handleToggleSelectItem = (itemId: string) => {
    console.log('handleToggleSelectItem called for item:', itemId)
    console.log('Current selectedItems:', selectedItems)
    
    const newSelected = new Set(selectedItems)
    if (newSelected.has(itemId)) {
      console.log('Removing item from selection')
      newSelected.delete(itemId)
    } else {
      console.log('Adding item to selection')
      newSelected.add(itemId)
    }
    console.log('New selectedItems will be:', newSelected)
    setSelectedItems(newSelected)
  }

  const handleBatchDelete = () => {
    console.log('handleBatchDelete called, selectedItems:', selectedItems.size)
    
    if (selectedItems.size === 0) {
      console.log('No items selected, returning')
      return
    }

    const selectedNames = chatList
      .filter(chat => selectedItems.has(chat.id))
      .map(chat => chat.name)
      .join('、')

    console.log('Selected names:', selectedNames)

    // 網頁版使用原生 confirm，移動端使用 Alert
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        `確定要刪除與「${selectedNames}」的聊天記錄嗎？此操作無法復原。`
      )
      
      if (confirmed) {
        console.log('User confirmed deletion')
        setChatList(prev => prev.filter(chat => !selectedItems.has(chat.id)))
        setIsDeleteMode(false)
        setSelectedItems(new Set())
      } else {
        console.log('User cancelled deletion')
      }
    } else {
      Alert.alert(
        '確認刪除',
        `確定要刪除與「${selectedNames}」的聊天記錄嗎？此操作無法復原。`,
        [
          { text: '取消', style: 'cancel' },
          { 
            text: '刪除', 
            style: 'destructive',
            onPress: () => {
              setChatList(prev => prev.filter(chat => !selectedItems.has(chat.id)))
              setIsDeleteMode(false)
              setSelectedItems(new Set())
            }
          }
        ]
      )
    }
  }

  const handleCancelDeleteMode = () => {
    setIsDeleteMode(false)
    setSelectedItems(new Set())
  }
  
  // 刪除聊天室
  const handleDeleteChat = (chatId: string) => {
    setChatList(prev => prev.filter(chat => chat.id !== chatId))
    currentOpenSwipeable.current = null
  }

  // 處理 Swipeable 開啟
  const handleSwipeableOpen = (swipeableRef: SwipeableMethods) => {
    // 如果有其他 Swipeable 已經開啟，先關閉它
    if (
      currentOpenSwipeable.current &&
      currentOpenSwipeable.current !== swipeableRef
    ) {
      try {
        currentOpenSwipeable.current.close()
      } catch (error) {
        console.error('關閉前一個 Swipeable 時發生錯誤:', error)
      }
    }

    // 設定當前開啟的 Swipeable
    currentOpenSwipeable.current = swipeableRef
  }

  // 處理 Swipeable 關閉
  const handleSwipeableClose = (swipeableRef?: SwipeableMethods) => {
    // 只有當關閉的是當前開啟的 Swipeable 時才清空
    if (!swipeableRef || currentOpenSwipeable.current === swipeableRef) {
      currentOpenSwipeable.current = null
    }
  }

  // 當 FlatList 開始滾動時關閉所有開啟的 Swipeable
  const handleScrollBeginDrag = () => {
    if (currentOpenSwipeable.current) {
      try {
        currentOpenSwipeable.current.close()
        currentOpenSwipeable.current = null
      } catch (error) {
        currentOpenSwipeable.current = null
      }
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
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
    bellButton: {
      padding: theme.spacing.xs,
    },
    deleteButton: {
      padding: theme.spacing.xs,
      width: 40,
      alignItems: 'center',
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing.xxl,
    },
    emptyStateText: {
      fontSize: theme.fontSize.lg,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    deleteActions: {
      flexDirection: 'row',
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      gap: theme.spacing.md,
    },
    cancelButton: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
    },
    cancelButtonText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
      fontWeight: '600',
    },
    confirmDeleteButton: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      backgroundColor: theme.colors.error,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
    },
    confirmDeleteButtonDisabled: {
      backgroundColor: theme.colors.border,
    },
    confirmDeleteButtonText: {
      fontSize: theme.fontSize.md,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    confirmDeleteButtonTextDisabled: {
      color: theme.colors.textSecondary,
    },
  })
  
  return (
    <View style={styles.container}>
      {/* 標題列 */}
      <View style={styles.header}>
        {isWebPlatform ? (
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={handleToggleDeleteMode}
          >
            {isDeleteMode ? (
              <X size={24} color={theme.colors.text} />
            ) : (
              <Trash2 size={24} color={theme.colors.text} />
            )}
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
        <Text style={styles.title}>
          {isDeleteMode ? `已選擇 ${selectedItems.size} 項` : '聊天室'}
        </Text>
        <TouchableOpacity style={styles.bellButton} onPress={handleNotificationPress}>
          <Bell size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      {/* 聊天列表 */}
      <FlatList
        data={chatList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageItem
            key={item.id}
            item={item}
            onPress={handleMessagePress}
            onDelete={handleDeleteChat}
            onSwipeableOpen={handleSwipeableOpen}
            onSwipeableClose={handleSwipeableClose}
            isDeleteMode={isWebPlatform && isDeleteMode}
            isSelected={selectedItems.has(item.id)}
            onToggleSelect={handleToggleSelectItem}
          />
        )}
        // 開始滾動時關閉開啟的 Swipeable
        onScrollBeginDrag={handleScrollBeginDrag}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>暫無聊天記錄</Text>
          </View>
        }
      />
      
      {/* 批量刪除操作欄（僅網頁版刪除模式時顯示） */}
      {isWebPlatform && isDeleteMode && (
        <View style={styles.deleteActions}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={handleCancelDeleteMode}
          >
            <Text style={styles.cancelButtonText}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.confirmDeleteButton,
              selectedItems.size === 0 && styles.confirmDeleteButtonDisabled
            ]}
            onPress={() => {
              console.log('Delete button pressed')
              handleBatchDelete()
            }}
            disabled={selectedItems.size === 0}
          >
            <Text style={[
              styles.confirmDeleteButtonText,
              selectedItems.size === 0 && styles.confirmDeleteButtonTextDisabled
            ]}>
              刪除 {selectedItems.size > 0 ? `(${selectedItems.size})` : ''}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}