// 任務詳細頁面 - 蟲蟲終結者查看任務詳情

import React, { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  Image
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { 
  ArrowLeft,
  MapPin, 
  Clock, 
  Calendar,
  DollarSign,
  AlertTriangle,
  User,
  Phone,
  MessageCircle,
  Bug,
  Timer,
  Star
} from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { useAuth } from '@/shared/hooks'
import { Button, Card } from '@/shared/ui'
import { 
  getPestTypeDisplayName,
  getPriorityDisplayInfo,
  mockTasks 
} from '@/shared/mocks'
import { mockUsers, mockUserProfiles } from '@/shared/mocks/users.mock'
import { Task, TaskStatus, RootStackParamList } from '@/shared/types'

type TaskDetailRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>
type TaskDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskDetail'>

export const TaskDetailScreen: React.FC = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [accepting, setAccepting] = useState(false)
  const route = useRoute<TaskDetailRouteProp>()
  const navigation = useNavigation<TaskDetailNavigationProp>()
  const insets = useSafeAreaInsets()
  
  // 根據 taskId 獲取任務資料
  const { taskId } = route.params
  const task = mockTasks.find(t => t.id === taskId) || mockTasks[0]
  
  // 獲取客戶資料
  const customer = mockUsers.find(u => u.id === task.createdBy)
  const customerProfile = mockUserProfiles[task.createdBy as keyof typeof mockUserProfiles]
  
  // 處理接案
  const handleAcceptTask = async () => {
    setAccepting(true)
    
    try {
      // 模擬 API 呼叫
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      Alert.alert(
        '接案成功！',
        '您已成功接受此任務，請盡快與客戶聯繫確認服務時間和詳細需求。',
        [
          { 
            text: '查看聯絡資訊', 
            onPress: () => console.log('查看聯絡資訊') 
          },
          { 
            text: '稍後處理', 
            style: 'cancel' 
          }
        ]
      )
    } catch (error) {
      Alert.alert('接案失敗', '請稍後再試')
    } finally {
      setAccepting(false)
    }
  }
  
  // 處理聯絡客戶
  const handleContactCustomer = () => {
    Alert.alert(
      '聯絡客戶',
      '選擇聯絡方式',
      [
        { text: '撥打電話', onPress: () => console.log('撥打電話') },
        { text: '發送訊息', onPress: () => console.log('發送訊息') },
        { text: '取消', style: 'cancel' }
      ]
    )
  }
  
  // 格式化時間
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
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
      paddingTop: insets.top + theme.spacing.xs, // 添加安全區域頂部間距
      paddingBottom: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      marginRight: theme.spacing.md,
    },
    headerTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      flex: 1,
    },
    content: {
      flex: 1,
    },
    section: {
      backgroundColor: theme.colors.surface,
      marginBottom: theme.spacing.sm,
      padding: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    taskTitle: {
      fontSize: theme.fontSize.xl,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    taskDescription: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
      lineHeight: 22,
      marginBottom: theme.spacing.md,
    },
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
      marginBottom: theme.spacing.md,
    },
    tag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    tagText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.text,
      marginLeft: theme.spacing.xs,
    },
    urgentTag: {
      backgroundColor: theme.colors.error + '10',
      borderColor: theme.colors.error,
    },
    urgentTagText: {
      color: theme.colors.error,
      fontWeight: '600',
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    infoText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
      flex: 1,
    },
    infoSubText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.sm,
    },
    budgetContainer: {
      backgroundColor: theme.colors.secondary + '10',
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
    budgetText: {
      fontSize: theme.fontSize.lg,
      fontWeight: 'bold',
      color: theme.colors.secondary,
      textAlign: 'center',
    },
    budgetSubText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.spacing.xs,
    },
    customerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
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
    customerInfo: {
      flex: 1,
    },
    customerName: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
    },
    customerRating: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing.xs,
    },
    ratingText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.xs,
    },
    contactButton: {
      backgroundColor: theme.colors.secondary,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
    },
    contactHint: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.spacing.sm,
      fontStyle: 'italic',
    },
    imageGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
    taskImage: {
      width: 100,
      height: 100,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.border,
    },
    noImages: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      fontStyle: 'italic',
    },
    actionButtons: {
      padding: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    acceptButton: {
      marginBottom: theme.spacing.sm,
    },
    contactButtonFull: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
  })
  
  return (
    <View style={styles.container}>
      {/* 標題列 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>任務詳情</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* 任務基本資訊 */}
        <View style={styles.section}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
          
          {/* 標籤 */}
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Bug size={14} color={theme.colors.text} />
              <Text style={styles.tagText}>
                {getPestTypeDisplayName(task.pestType)}
              </Text>
            </View>
            
            <View style={[
              styles.tag,
              task.priority === 'urgent' && styles.urgentTag
            ]}>
              <AlertTriangle 
                size={14} 
                color={task.priority === 'urgent' ? theme.colors.error : theme.colors.text} 
              />
              <Text style={[
                styles.tagText,
                task.priority === 'urgent' && styles.urgentTagText
              ]}>
                {getPriorityDisplayInfo(task.priority).name}
              </Text>
            </View>
            
            {task.isImmediate && (
              <View style={[styles.tag, styles.urgentTag]}>
                <Timer size={14} color={theme.colors.error} />
                <Text style={styles.urgentTagText}>立即處理</Text>
              </View>
            )}
          </View>
        </View>
        
        {/* 地點和時間資訊 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>服務資訊</Text>
          
          <View style={styles.infoRow}>
            <MapPin size={20} color={theme.colors.textSecondary} />
            <Text style={styles.infoText}>{task.location.address}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Calendar size={20} color={theme.colors.textSecondary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.infoText}>
                {task.isImmediate ? '立即處理' : '預約時間'}
              </Text>
              {!task.isImmediate && task.scheduledTime && (
                <Text style={styles.infoSubText}>
                  {formatDateTime(task.scheduledTime.toISOString())}
                </Text>
              )}
            </View>
          </View>
          
          <View style={styles.infoRow}>
            <Clock size={20} color={theme.colors.textSecondary} />
            <Text style={styles.infoText}>
              發布時間：{formatDateTime(task.createdAt.toISOString())}
            </Text>
          </View>
        </View>
        
        {/* 預算資訊 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>預算範圍</Text>
          <View style={styles.budgetContainer}>
            <Text style={styles.budgetText}>
              NT$ {task.budget.min.toLocaleString()} - {task.budget.max.toLocaleString()}
            </Text>
            <Text style={styles.budgetSubText}>實際費用可協商</Text>
          </View>
        </View>
        
        {/* 客戶資訊 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>客戶資訊</Text>
          <View style={styles.customerContainer}>
            <View style={styles.avatar}>
              <User size={24} color={theme.colors.textSecondary} />
            </View>
            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>{customer?.name || '用戶'}</Text>
              <View style={styles.customerRating}>
                <Star size={14} color="#FFD700" fill="#FFD700" />
                <Text style={styles.ratingText}>
                  {customerProfile?.rating || 0} ({customerProfile?.totalReviews || 0} 評價)
                </Text>
              </View>
            </View>
          </View>
          {task.status === TaskStatus.PENDING && (
            <Text style={styles.contactHint}>接案後可查看聯絡方式</Text>
          )}
        </View>
        
        {/* 現場照片 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>現場照片</Text>
          {task.images && task.images.length > 0 ? (
            <View style={styles.imageGrid}>
              {task.images.map((imageUri, index) => (
                <Image 
                  key={index}
                  source={{ uri: imageUri }} 
                  style={styles.taskImage}
                  resizeMode="cover"
                />
              ))}
            </View>
          ) : (
            <Text style={styles.noImages}>客戶未提供現場照片</Text>
          )}
        </View>
      </ScrollView>
      
      {/* 行動按鈕 */}
      {task.status === TaskStatus.PENDING && (
        <View style={styles.actionButtons}>
          <Button
            variant="primary"
            loading={accepting}
            onPress={handleAcceptTask}
            fullWidth
          >
            <Text>接受任務</Text>
          </Button>
        </View>
      )}
      
      {/* 已接案的聯絡按鈕 */}
      {(task.status === TaskStatus.ASSIGNED || task.status === TaskStatus.IN_PROGRESS) && (
        <View style={styles.actionButtons}>
          <Button
            variant="primary"
            onPress={() => handleContactCustomer()}
            style={styles.acceptButton}
            fullWidth
          >
            <Phone size={16} color={theme.colors.primary} />
            <Text> 聯絡客戶</Text>
          </Button>
          
          <Button
            variant="secondary"
            onPress={() => console.log('發送訊息')}
            style={styles.contactButtonFull}
            fullWidth
          >
            <MessageCircle size={16} color={theme.colors.text} />
            <Text> 發送訊息</Text>
          </Button>
        </View>
      )}
    </View>
  )
}