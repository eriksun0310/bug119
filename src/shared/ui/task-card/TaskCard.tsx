// 任務卡片元件

import React, { FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { 
  MapPin, 
  DollarSign, 
  Bug, 
  Phone,
  MessageSquare,
  User as UserIcon
} from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { TaskCardProps } from './TaskCard.types'
import { createStyles } from './TaskCard.styles'
import { 
  getPestTypeDisplayName, 
  getPriorityDisplayInfo,
  getTaskStatusDisplayName 
} from '@/shared/mocks'
import { mockUsers } from '@/shared/mocks/users.mock'
import { UserRole } from '@/shared/types'

/**
 * 任務卡片元件
 * 顯示任務詳細資訊，支援不同變體和操作
 */
export const TaskCard: FC<TaskCardProps> = ({
  task,
  variant = 'default',
  showDistance = false,
  distance,
  showContactInfo = false,
  currentUserRole,
  onPress,
  onAccept,
  style,
  ...props
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  
  const priorityInfo = getPriorityDisplayInfo(task.priority)
  const pestTypeName = getPestTypeDisplayName(task.pestType)
  const statusName = getTaskStatusDisplayName(task.status)
  
  const handlePress = () => {
    if (onPress) {
      onPress(task)
    }
  }
  
  const handleAccept = (e: any) => {
    e.stopPropagation()
    if (onAccept) {
      onAccept(task)
    }
  }
  

  console.log('task 11111', task)
  
  const formatBudget = () => {
    return `${task.budget}`
  }
  
  // 獲取客戶資訊
  const customer = mockUsers.find(u => u.id === task.createdBy)
  
  // 獲取終結者資訊
  const terminator = task.assignedTo ? mockUsers.find(u => u.id === task.assignedTo) : null
  
  // 根據當前用戶身份決定顯示哪個聯絡資訊
  const contactPerson = currentUserRole === UserRole.FEAR_STAR ? terminator : customer
  const contactLabel = currentUserRole === UserRole.FEAR_STAR ? '終結者' : '客戶'
  
  const containerStyle = variant === 'compact' 
    ? [styles.container, styles.compactContainer] 
    : styles.container
    
  const titleStyle = variant === 'compact'
    ? [styles.title, styles.compactTitle]
    : styles.title
    
  const descriptionStyle = variant === 'compact'
    ? [styles.description, styles.compactDescription]
    : styles.description
  
  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={handlePress}
      activeOpacity={0.7}
      {...props}
    >
      {/* 標題和優先程度 */}
      <View style={styles.header}>
        <Text style={titleStyle} numberOfLines={variant === 'compact' ? 1 : 2}>
          {task.title}
        </Text>
        <View 
          style={[
            styles.priorityBadge, 
            { backgroundColor: priorityInfo.color }
          ]}
        >
          <Text style={styles.priorityText}>{priorityInfo.name}</Text>
        </View>
      </View>
      
      {/* 害蟲類型 */}
      <View style={styles.infoRow}>
        <Bug size={16} color={theme.colors.textSecondary} style={styles.infoIcon} />
        <Text style={styles.infoText}>{pestTypeName}</Text>
      </View>
      
      {/* 地點 */}
      <View style={styles.infoRow}>
        <MapPin size={16} color={theme.colors.textSecondary} style={styles.infoIcon} />
        <Text style={styles.infoText} numberOfLines={1}>
          {task.location.district}, {task.location.city}
        </Text>
        {showDistance && distance && (
          <Text style={[styles.infoText, { textAlign: 'right' }]}>
            {distance.toFixed(1)}km
          </Text>
        )}
      </View>
      
      {/* 聯絡資訊 - 只在進行中和已完成任務顯示 */}
      {showContactInfo && contactPerson && (
        <>
          <View style={styles.infoRow}>
            <UserIcon size={16} color={theme.colors.textSecondary} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {contactLabel}：{contactPerson.name}
            </Text>
          </View>
        
          {contactPerson.contactInfo.preferredMethod === 'telegram' && contactPerson.contactInfo.telegram && (
            <View style={styles.infoRow}>
              <MessageSquare size={16} color={theme.colors.textSecondary} style={styles.infoIcon} />
              <Text style={styles.infoText}>
                Telegram：{contactPerson.contactInfo.telegram}
              </Text>
            </View>
          )}
        </>
      )}
      
      
      {/* 描述 */}
      <Text 
        style={descriptionStyle} 
        numberOfLines={variant === 'compact' ? 2 : 3}
      >
        {task.description}
      </Text>
      
      {/* 底部：預算和操作 */}
      <View style={styles.footer}>
        <View style={styles.budgetContainer}>
          <DollarSign size={18} color={theme.colors.text} />
          <Text style={styles.budgetText}>{formatBudget()}</Text>
        </View>
        
        {/* {task.status === 'pending' && !task.assignedTo && onAccept ? (
          <TouchableOpacity 
            style={styles.acceptButton}
            onPress={handleAccept}
          >
            <Text style={styles.acceptButtonText}>接案</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{statusName}</Text>
          </View>
        )} */}
      </View>
    </TouchableOpacity>
  )
}