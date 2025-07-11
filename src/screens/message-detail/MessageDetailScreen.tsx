// 訊息詳細頁面（聊天室）

import React, { useState, useRef, useEffect } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { 
  ArrowLeft,
  User,
  Send,
  Phone,
  MoreVertical,
  Image as ImageIcon,
  MapPin,
  Flag,
  Trash2,
  X
} from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { useAuth } from '@/shared/hooks'
import { RootStackParamList } from '@/shared/types'

type MessageDetailRouteProp = RouteProp<RootStackParamList, 'MessageDetail'>
type MessageDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MessageDetail'>

interface Message {
  id: string
  text: string
  senderId: string
  senderName: string
  timestamp: Date
  type: 'text' | 'image' | 'location'
  isMe: boolean
}

export const MessageDetailScreen: React.FC = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const insets = useSafeAreaInsets()
  const route = useRoute<MessageDetailRouteProp>()
  const navigation = useNavigation<MessageDetailNavigationProp>()
  const scrollViewRef = useRef<ScrollView>(null)
  
  const [inputText, setInputText] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '你好，我想詢問關於除蟲的問題',
      senderId: 'user1',
      senderName: '小怕星用戶',
      timestamp: new Date(Date.now() - 60000 * 30),
      type: 'text',
      isMe: false
    },
    {
      id: '2',
      text: '您好！我是李師傅，很高興為您服務。請問您遇到什麼害蟲問題呢？',
      senderId: 'user2',
      senderName: '李師傅',
      timestamp: new Date(Date.now() - 60000 * 25),
      type: 'text',
      isMe: true
    },
    {
      id: '3',
      text: '我家廚房發現很多螞蟻，特別是在洗碗槽附近',
      senderId: 'user1',
      senderName: '小怕星用戶',
      timestamp: new Date(Date.now() - 60000 * 20),
      type: 'text',
      isMe: false
    },
    {
      id: '4',
      text: '螞蟻問題通常是因為食物殘渣吸引。我建議先清理乾淨，然後我可以上門處理。您方便什麼時候？',
      senderId: 'user2',
      senderName: '李師傅',
      timestamp: new Date(Date.now() - 60000 * 15),
      type: 'text',
      isMe: true
    },
    {
      id: '5',
      text: '明天下午可以嗎？大概2點左右',
      senderId: 'user1',
      senderName: '小怕星用戶',
      timestamp: new Date(Date.now() - 60000 * 10),
      type: 'text',
      isMe: false
    },
    {
      id: '6',
      text: '好的，明天下午2點我會準時到達。請確保家中有人，我會帶專業工具處理。',
      senderId: 'user2',
      senderName: '李師傅',
      timestamp: new Date(Date.now() - 60000 * 5),
      type: 'text',
      isMe: true
    }
  ])
  
  // 從路由參數獲取聊天對象信息
  const { conversationId } = route.params || { conversationId: 'default' }
  const otherUser = user?.role === 'terminator' ? '小怕星用戶' : '李師傅除蟲專家'
  
  // 發送訊息
  const sendMessage = () => {
    if (inputText.trim() === '') return
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      senderId: user?.id || 'current_user',
      senderName: user?.name || '我',
      timestamp: new Date(),
      type: 'text',
      isMe: true
    }
    
    setMessages(prev => [...prev, newMessage])
    setInputText('')
    
    // 自動滾動到底部
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }
  
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
  
  // 處理撥打電話
  const handleCall = () => {
    console.log('撥打電話給', otherUser)
  }
  
  // 處理檢舉
  const handleReport = () => {
    setShowMenu(false)
    Alert.alert(
      '檢舉用戶',
      `您確定要檢舉 ${otherUser} 嗎？`,
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '確認檢舉', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('已檢舉', '感謝您的檢舉，我們會盡快處理')
          }
        }
      ]
    )
  }
  
  // 處理刪除對話
  const handleDeleteConversation = () => {
    setShowMenu(false)
    Alert.alert(
      '刪除對話',
      '刪除後將無法復原此對話記錄，確定要刪除嗎？',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '刪除', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('已刪除', '對話已刪除', [
              { text: '確定', onPress: () => navigation.goBack() }
            ])
          }
        }
      ]
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.md,
      paddingTop: insets.top + theme.spacing.xs,
      paddingBottom: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      marginRight: theme.spacing.md,
    },
    userInfo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.sm,
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
    },
    userStatus: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    headerActions: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },
    actionButton: {
      padding: theme.spacing.xs,
    },
    messagesContainer: {
      flex: 1,
      paddingHorizontal: theme.spacing.md,
    },
    messageWrapper: {
      marginVertical: theme.spacing.xs,
    },
    myMessage: {
      alignSelf: 'flex-end',
      maxWidth: '80%',
    },
    otherMessage: {
      alignSelf: 'flex-start',
      maxWidth: '80%',
    },
    messageBubble: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.lg,
      marginBottom: theme.spacing.xs,
    },
    myMessageBubble: {
      backgroundColor: theme.colors.secondary,
    },
    otherMessageBubble: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    messageText: {
      fontSize: theme.fontSize.md,
      lineHeight: 20,
    },
    myMessageText: {
      color: theme.colors.primary,
    },
    otherMessageText: {
      color: theme.colors.text,
    },
    messageTime: {
      fontSize: theme.fontSize.xs,
      color: theme.colors.textSecondary,
      alignSelf: 'flex-end',
      marginTop: theme.spacing.xs,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      fontSize: theme.fontSize.md,
      maxHeight: 100,
    },
    attachButton: {
      padding: theme.spacing.sm,
      marginRight: theme.spacing.xs,
    },
    sendButton: {
      backgroundColor: theme.colors.secondary,
      borderRadius: theme.borderRadius.full,
      padding: theme.spacing.sm,
      marginLeft: theme.spacing.xs,
    },
    sendButtonDisabled: {
      backgroundColor: theme.colors.border,
    },
    // 選單樣式
    menuOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    menuContent: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: theme.borderRadius.xl,
      borderTopRightRadius: theme.borderRadius.xl,
      paddingBottom: insets.bottom,
    },
    menuHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    menuTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    closeMenuButton: {
      padding: theme.spacing.xs,
    },
    menuOptions: {
      paddingVertical: theme.spacing.sm,
    },
    menuOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      gap: theme.spacing.md,
    },
    menuOptionText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
    },
    menuOptionTextDanger: {
      color: theme.colors.error,
    },
  })
  
  useEffect(() => {
    // 進入頁面時滾動到底部
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false })
    }, 100)
  }, [])
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      {/* 標題列 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <User size={20} color={theme.colors.textSecondary} />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{otherUser}</Text>
            <Text style={styles.userStatus}>上次上線 5 分鐘前</Text>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <Phone size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => setShowMenu(true)}>
            <MoreVertical size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* 訊息列表 */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={{ paddingVertical: theme.spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View 
            key={message.id} 
            style={[
              styles.messageWrapper,
              message.isMe ? styles.myMessage : styles.otherMessage
            ]}
          >
            <View style={[
              styles.messageBubble,
              message.isMe ? styles.myMessageBubble : styles.otherMessageBubble
            ]}>
              <Text style={[
                styles.messageText,
                message.isMe ? styles.myMessageText : styles.otherMessageText
              ]}>
                {message.text}
              </Text>
            </View>
            <Text style={styles.messageTime}>
              {formatTime(message.timestamp)}
            </Text>
          </View>
        ))}
      </ScrollView>
      
      {/* 輸入區域 */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <ImageIcon size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="輸入訊息..."
          placeholderTextColor={theme.colors.textSecondary}
          multiline
          maxLength={500}
        />
        
        <TouchableOpacity 
          style={[
            styles.sendButton,
            inputText.trim() === '' && styles.sendButtonDisabled
          ]}
          onPress={sendMessage}
          disabled={inputText.trim() === ''}
        >
          <Send 
            size={16} 
            color={inputText.trim() === '' ? theme.colors.textSecondary : theme.colors.primary} 
          />
        </TouchableOpacity>
      </View>
      
      {/* 選單模態框 */}
      <Modal
        visible={showMenu}
        transparent
        animationType="slide"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity 
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <TouchableOpacity 
            style={styles.menuContent}
            activeOpacity={1}
            onPress={() => {}}
          >
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>聊天選項</Text>
              <TouchableOpacity 
                style={styles.closeMenuButton} 
                onPress={() => setShowMenu(false)}
              >
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.menuOptions}>
              <TouchableOpacity style={styles.menuOption} onPress={handleReport}>
                <Flag size={20} color={theme.colors.error} />
                <Text style={[styles.menuOptionText, styles.menuOptionTextDanger]}>
                  檢舉用戶
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuOption} onPress={handleDeleteConversation}>
                <Trash2 size={20} color={theme.colors.error} />
                <Text style={[styles.menuOptionText, styles.menuOptionTextDanger]}>
                  刪除對話
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  )
}