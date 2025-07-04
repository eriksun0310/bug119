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
  Star,
  MessageSquare,
  Send
} from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { useAuth } from '@/shared/hooks'
import { Button, Card } from '@/shared/ui'
import { 
  getPestTypeDisplayName,
  getPriorityDisplayInfo,
  mockTasks,
  getAssignmentsByTaskId 
} from '@/shared/mocks'
import { mockUsers, mockUserProfiles } from '@/shared/mocks/users.mock'
import { Task, TaskStatus, UserRole, RootStackParamList, TaskAssignment } from '@/shared/types'
import { getContactMethodDisplayName } from '@/shared/config/options.config'
import { showAlert } from '@/shared/utils'

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
  
  // 獲取終結者資訊
  const terminator = task.assignedTo ? mockUsers.find(u => u.id === task.assignedTo) : null
  const terminatorProfile = task.assignedTo ? mockUserProfiles[task.assignedTo as keyof typeof mockUserProfiles] : null
  
  // 獲取申請者列表（小怕星待確認任務時使用）
  const assignments = getAssignmentsByTaskId(taskId)
  
  // 根據當前用戶身份決定顯示哪個聯絡資訊
  const contactPerson = user?.role === UserRole.FEAR_STAR ? terminator : customer
  const contactProfile = user?.role === UserRole.FEAR_STAR ? terminatorProfile : customerProfile
  const contactTitle = user?.role === UserRole.FEAR_STAR ? '終結者資訊' : '客戶資訊'
  const contactLabel = user?.role === UserRole.FEAR_STAR ? '終結者' : '客戶'
  
  // 處理接案
  const handleAcceptTask = async () => {
    setAccepting(true)
    
    try {
      // 模擬 API 呼叫
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      Alert.alert(
        '接案成功！',
        '您已成功接受此任務。請在「我的任務」中查看任務進度，進行中和已完成的任務才會顯示客戶聯絡資訊。',
        [
          { 
            text: '確定', 
            onPress: () => {
              // 更新任務狀態為已指派
              // 這裡實際會呼叫 API 更新狀態
              console.log('任務狀態更新為已指派')
            }
          }
        ]
      )
    } catch (error) {
      Alert.alert('接案失敗', '請稍後再試')
    } finally {
      setAccepting(false)
    }
  }
  
  // 處理選擇終結者（小怕星選擇申請者）
  const handleSelectTerminator = (assignment: TaskAssignment) => {
    const selectedTerminator = mockUsers.find(u => u.id === assignment.terminatorId)
    const terminatorProfile = mockUserProfiles[assignment.terminatorId as keyof typeof mockUserProfiles]
    
    showAlert(
      '確認委託',
      `確定要委託「${selectedTerminator?.name}」處理這個任務嗎？\n\n提議價格：$${assignment.proposedPrice}\n預估時間：${assignment.estimatedDuration}分鐘`,
      [
        { text: '取消', style: 'cancel' },
        {
          text: '確定委託',
          onPress: () => {
            // TODO: 實際的委託邏輯
            showAlert('委託成功', '已成功委託給終結者，請等待開始處理。')
          }
        }
      ]
    )
  }
  
  
  // 格式化時間
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  
  // 渲染申請者卡片
  const renderApplicantCard = (assignment: TaskAssignment) => {
    const applicantTerminator = mockUsers.find(u => u.id === assignment.terminatorId)
    const applicantProfile = mockUserProfiles[assignment.terminatorId as keyof typeof mockUserProfiles]
    
    if (!applicantTerminator || !applicantProfile) return null
    
    return (
      <View key={assignment.terminatorId} style={styles.applicantCard}>
        <View style={styles.applicantHeader}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: applicantTerminator.avatar || 'https://via.placeholder.com/60' }}
              style={styles.applicantAvatar}
            />
            {applicantTerminator.isVerified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            )}
          </View>
          
          <View style={styles.applicantInfo}>
            <Text style={styles.applicantName}>{applicantTerminator.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>
                {applicantProfile.rating} ({applicantProfile.totalReviews}評價)
              </Text>
            </View>
            <View style={styles.experienceContainer}>
              <Clock size={14} color={theme.colors.textSecondary} />
              <Text style={styles.experienceText}>
                {applicantProfile.experienceYears}年經驗
              </Text>
            </View>
            <View style={styles.locationContainer}>
              <MapPin size={14} color={theme.colors.textSecondary} />
              <Text style={styles.locationText}>{applicantProfile.location}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.proposalContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>提議價格</Text>
            <Text style={styles.priceValue}>${assignment.proposedPrice}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>預估時間</Text>
            <Text style={styles.timeValue}>{assignment.estimatedDuration}分鐘</Text>
          </View>
        </View>
        
        {assignment.message && (
          <View style={styles.messageContainer}>
            <MessageCircle size={16} color={theme.colors.textSecondary} />
            <Text style={styles.messageText}>{assignment.message}</Text>
          </View>
        )}
        
        <View style={styles.applicantActionContainer}>
          <TouchableOpacity 
            style={styles.applicantContactButton}
            onPress={() => {
              // TODO: 開啟聯絡功能
              showAlert('聯絡功能', '即將開啟聯絡功能')
            }}
          >
            <Phone size={16} color={theme.colors.primary} />
            <Text style={styles.applicantContactText}>聯絡</Text>
          </TouchableOpacity>
          
          <Button
            variant="primary"
            onPress={() => handleSelectTerminator(assignment)}
            style={styles.selectButton}
          >
            選擇委託
          </Button>
        </View>
      </View>
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
    contactInfoContainer: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    contactInfoTitle: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    contactInfoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    contactIcon: {
      marginRight: theme.spacing.xs,
    },
    contactInfoLabel: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      width: 80,
    },
    contactInfoValue: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.text,
      flex: 1,
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
    // 申請者列表樣式
    applicantCard: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    applicantHeader: {
      flexDirection: 'row',
      marginBottom: theme.spacing.md,
    },
    avatarContainer: {
      position: 'relative',
      marginRight: theme.spacing.md,
    },
    applicantAvatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    verifiedBadge: {
      position: 'absolute',
      bottom: -2,
      right: -2,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#4CAF50',
      alignItems: 'center',
      justifyContent: 'center',
    },
    verifiedText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: 'bold',
    },
    applicantInfo: {
      flex: 1,
    },
    applicantName: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    ratingText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.text,
      marginLeft: theme.spacing.xs,
    },
    experienceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    experienceText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.xs,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.xs,
    },
    proposalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
    },
    priceContainer: {
      alignItems: 'center',
    },
    priceLabel: {
      fontSize: theme.fontSize.xs,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    priceValue: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
    },
    timeContainer: {
      alignItems: 'center',
    },
    timeLabel: {
      fontSize: theme.fontSize.xs,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    timeValue: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
    },
    messageContainer: {
      flexDirection: 'row',
      marginBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
    },
    messageText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
      flex: 1,
      lineHeight: 20,
    },
    applicantActionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    applicantContactButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
    },
    applicantContactText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.text,
      marginLeft: theme.spacing.xs,
    },
    selectButton: {
      flex: 1,
      marginLeft: theme.spacing.md,
    },
    emptyApplicants: {
      textAlign: 'center',
      color: theme.colors.textSecondary,
      fontSize: theme.fontSize.sm,
      fontStyle: 'italic',
      marginTop: theme.spacing.md,
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
          
          {/* 地點資訊 */}
          <View style={styles.infoRow}>
            <MapPin size={20} color={theme.colors.textSecondary} />
            <Text style={styles.infoText}>
              {user?.role === UserRole.FEAR_STAR && terminatorProfile?.location 
                ? `終結者地區：${terminatorProfile.location}`
                : `${task.location.district}, ${task.location.city}`
              }
            </Text>
          </View>
          
          {/* 委託時間：只有小怕星且任務已分配時顯示 */}
          {user?.role === UserRole.FEAR_STAR && task.assignedTo && (
            <View style={styles.infoRow}>
              <Calendar size={20} color={theme.colors.textSecondary} />
              <Text style={styles.infoText}>
                委託時間：{formatDateTime(task.updatedAt.toISOString())}
              </Text>
            </View>
          )}
          
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
        
        {/* 聯絡人資訊 - 根據任務狀態決定顯示內容 */}
        {user?.role === UserRole.FEAR_STAR && task.status === TaskStatus.PENDING && assignments.length > 0 ? (
          // 小怕星的待確認任務：顯示申請者列表
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>申請者列表 ({assignments.length}位)</Text>
            {assignments.map(renderApplicantCard)}
          </View>
        ) : (
          // 其他情況：顯示單一聯絡人資訊
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{contactTitle}</Text>
            <View style={styles.customerContainer}>
              <View style={styles.avatar}>
                <User size={24} color={theme.colors.textSecondary} />
              </View>
              <View style={styles.customerInfo}>
                <Text style={styles.customerName}>{contactPerson?.name || '用戶'}</Text>
                <View style={styles.customerRating}>
                  <Star size={14} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.ratingText}>
                    {contactProfile?.rating || 0} ({contactProfile?.totalReviews || 0} 評價)
                  </Text>
                </View>
              </View>
            </View>
            
            {/* 已媒合、進行中和已完成的任務顯示聯絡資訊 */}
            {(task.status === TaskStatus.ASSIGNED || task.status === TaskStatus.IN_PROGRESS || task.status === TaskStatus.COMPLETED) && contactPerson?.contactInfo && (
              <View style={styles.contactInfoContainer}>
                <Text style={styles.contactInfoTitle}>聯絡資訊</Text>
                
                {/* 根據偏好方式只顯示一種聯絡資訊 */}
                {contactPerson.contactInfo.preferredMethod === 'phone' && (
                  <View style={styles.contactInfoRow}>
                    <Phone size={16} color={theme.colors.textSecondary} style={styles.contactIcon} />
                    <Text style={styles.contactInfoLabel}>電話：</Text>
                    <Text style={styles.contactInfoValue}>{contactPerson.contactInfo.phone}</Text>
                  </View>
                )}
                
                {contactPerson.contactInfo.preferredMethod === 'line' && contactPerson.contactInfo.line && (
                  <View style={styles.contactInfoRow}>
                    <MessageCircle size={16} color="#00B900" style={styles.contactIcon} />
                    <Text style={styles.contactInfoLabel}>LINE：</Text>
                    <Text style={styles.contactInfoValue}>{contactPerson.contactInfo.line}</Text>
                  </View>
                )}
                
                {contactPerson.contactInfo.preferredMethod === 'telegram' && contactPerson.contactInfo.telegram && (
                  <View style={styles.contactInfoRow}>
                    <Send size={16} color="#0088CC" style={styles.contactIcon} />
                    <Text style={styles.contactInfoLabel}>Telegram：</Text>
                    <Text style={styles.contactInfoValue}>{contactPerson.contactInfo.telegram}</Text>
                  </View>
                )}
              </View>
            )}
            
            {task.status === TaskStatus.PENDING && (
              <Text style={styles.contactHint}>接案後即可查看{contactLabel}聯絡資訊</Text>
            )}
            
            {/* 小怕星的待確認任務但沒有申請者 */}
            {user?.role === UserRole.FEAR_STAR && task.status === TaskStatus.PENDING && assignments.length === 0 && (
              <Text style={styles.emptyApplicants}>目前還沒有終結者申請這個任務</Text>
            )}
          </View>
        )}
        
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
      
    </View>
  )
}