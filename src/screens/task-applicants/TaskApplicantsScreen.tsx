// 任務申請者列表畫面 - 小怕星選擇終結者

import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native'
import { 
  ChevronLeft, 
  Star, 
  MapPin, 
  Clock,
  MessageCircle,
  Phone
} from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTheme } from '@/shared/theme'
import { Button, Card } from '@/shared/ui'
import { showAlert } from '@/shared/utils'
import { 
  getAssignmentsByTaskId,
  mockTasks,
  getPestTypeDisplayName
} from '@/shared/mocks/tasks.mock'
import { mockUsers, mockUserProfiles } from '@/shared/mocks/users.mock'
import { RootStackParamList, TaskAssignment } from '@/shared/types'

type TaskApplicantsRouteProp = RouteProp<RootStackParamList, 'TaskApplicants'>
type TaskApplicantsNavigationProp = NativeStackNavigationProp<RootStackParamList>

export const TaskApplicantsScreen = () => {
  const { theme } = useTheme()
  const navigation = useNavigation<TaskApplicantsNavigationProp>()
  const route = useRoute<TaskApplicantsRouteProp>()
  const insets = useSafeAreaInsets()
  
  const { taskId } = route.params
  
  // 取得螢幕寬度
  const screenWidth = Dimensions.get('window').width
  const isTablet = screenWidth >= 768 // 判斷是否為平板或電腦
  
  // 獲取任務資訊
  const task = mockTasks.find(t => t.id === taskId)
  
  // 獲取申請者列表
  const assignments = getAssignmentsByTaskId(taskId)
  
  // 處理選擇終結者
  const handleSelectTerminator = (assignment: TaskAssignment) => {
    const terminator = mockUsers.find(u => u.id === assignment.terminatorId)
    const terminatorProfile = mockUserProfiles[assignment.terminatorId as keyof typeof mockUserProfiles]
    
    showAlert(
      '確認委託',
      `確定要委託「${terminator?.name}」處理這個任務嗎？\n\n提議價格：$${assignment.proposedPrice}`,
      [
        { text: '取消', style: 'cancel' },
        {
          text: '確定委託',
          onPress: () => {
            // TODO: 實際的委託邏輯
            showAlert('委託成功', '已成功委託給終結者，請等待開始處理。')
            navigation.goBack()
          }
        }
      ]
    )
  }
  
  const renderApplicantCard = (assignment: TaskAssignment) => {
    const terminator = mockUsers.find(u => u.id === assignment.terminatorId)
    const profile = mockUserProfiles[assignment.terminatorId as keyof typeof mockUserProfiles]
    
    if (!terminator || !profile) return null
    
    return (
      <Card key={assignment.terminatorId} style={styles.applicantCard}>
        <View style={styles.applicantHeader}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: terminator.avatar || 'https://via.placeholder.com/60' }}
              style={styles.avatar}
            />
            {terminator.isVerified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            )}
          </View>
          
          <View style={styles.applicantInfo}>
            <Text style={styles.applicantName}>{terminator.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>
                {profile.rating} ({profile.totalReviews}評價)
              </Text>
            </View>
            <View style={styles.experienceContainer}>
              <Clock size={14} color={theme.colors.textSecondary} />
              <Text style={styles.experienceText}>
                {profile.experienceYears}年經驗
              </Text>
            </View>
            <View style={styles.locationContainer}>
              <MapPin size={14} color={theme.colors.textSecondary} />
              <Text style={styles.locationText}>{profile.location}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.proposalContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>提議價格</Text>
            <Text style={styles.priceValue}>${assignment.proposedPrice}</Text>
          </View>
        </View>
        
        {assignment.message && (
          <View style={styles.messageContainer}>
            <MessageCircle size={16} color={theme.colors.textSecondary} />
            <Text style={styles.messageText}>{assignment.message}</Text>
          </View>
        )}
        
        <View style={styles.actionContainer}>
          {/* <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => {
              // TODO: 開啟聯絡功能
              showAlert('聯絡功能', '即將開啟聯絡功能')
            }}
          >
            <Phone size={16} color={theme.colors.primary} />
            <Text style={styles.contactText}>聯絡</Text>
          </TouchableOpacity> */}
          
          <Button
            variant="primary"
            onPress={() => handleSelectTerminator(assignment)}
            style={styles.selectButton}
          >
            選擇委託
          </Button>
        </View>
      </Card>
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
      paddingTop: insets.top > 0 ? insets.top + theme.spacing.xs : theme.spacing.sm,
      paddingBottom: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      padding: theme.spacing.xs,
      marginRight: theme.spacing.sm,
    },
    title: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      flex: 1,
    },
    content: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
      paddingBottom: isTablet ? theme.spacing.lg : 50, // 手機版添加底部 padding 避免被導航列遮住
      maxWidth: isTablet ? 1200 : undefined,
      width: '100%',
      alignSelf: 'center',
    },
    taskInfo: {
      marginBottom: theme.spacing.lg,
    },
    taskTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    taskMeta: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    sectionTitle: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    applicantCard: {
      marginBottom: isTablet ? 0 : theme.spacing.md, // 平板模式下移除 marginBottom
    },
    applicantHeader: {
      flexDirection: 'row',
      marginBottom: theme.spacing.md,
    },
    avatarContainer: {
      position: 'relative',
      marginRight: theme.spacing.md,
    },
    avatar: {
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
      backgroundColor: theme.colors.background,
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
    messageContainer: {
      flexDirection: 'row',
      marginBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
    },
    messageText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
      flex: 1,
      lineHeight: 20,
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    contactButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
    },
    contactText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.text,
      marginLeft: theme.spacing.xs,
    },
    selectButton: {
      flex: 1,
      marginLeft: theme.spacing.md,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing.xl,
    },
    emptyText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    applicantsList: {
      flexDirection: isTablet ? 'row' : 'column',
      flexWrap: isTablet ? 'wrap' : 'nowrap',
      justifyContent: isTablet ? 'flex-start' : 'stretch',
      alignItems: isTablet ? 'flex-start' : 'stretch',
      gap: theme.spacing.md,
    },
    applicantCardTablet: {
      width: '48%', // 每行顯示兩個卡片
    },
  })
  
  if (!task) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>任務不存在</Text>
        </View>
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>選擇終結者</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.taskInfo}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text style={styles.taskMeta}>
            害蟲類型：{getPestTypeDisplayName(task.pestType)}
          </Text>
          <Text style={styles.taskMeta}>
            預算範圍：${task.budget.min} - ${task.budget.max}
          </Text>
          <Text style={styles.taskMeta}>
            地點：{task.location.district}, {task.location.city}
          </Text>
        </Card>
        
        <Text style={styles.sectionTitle}>
          申請者列表 ({assignments.length}位)
        </Text>
        
        {assignments.length > 0 ? (
          <View style={styles.applicantsList}>
            {assignments.map(assignment => 
              <View key={assignment.terminatorId} style={isTablet ? styles.applicantCardTablet : undefined}>
                {renderApplicantCard(assignment)}
              </View>
            )}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              目前還沒有終結者申請這個任務
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}