// 任務卡片元件

import React, { FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Bug, 
  Calendar,
  Timer,
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
import { ContactMethod } from '@/shared/types'

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
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('zh-TW', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }
  
  const formatBudget = () => {
    if (task.budget.min === task.budget.max) {
      return `$${task.budget.min}`
    }
    return `$${task.budget.min} - $${task.budget.max}`
  }
  
  // 獲取客戶資訊
  const customer = mockUsers.find(u => u.id === task.createdBy)
  
  // 獲取聯絡方式顯示名稱
  const getContactMethodName = (method: ContactMethod): string => {
    switch (method) {
      case ContactMethod.PHONE:
        return '電話'
      case ContactMethod.LINE:
        return 'LINE'
      case ContactMethod.TELEGRAM:
        return 'Telegram'
      default:
        return '電話'
    }
  }
  
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
          {showContactInfo ? task.location.address : `${task.location.district}, ${task.location.city}`}
        </Text>
        {showDistance && distance && (
          <Text style={[styles.infoText, { textAlign: 'right' }]}>
            {distance.toFixed(1)}km
          </Text>
        )}
      </View>
      
      {/* 客戶聯絡資訊 - 只在進行中和已完成任務顯示 */}
      {showContactInfo && customer && (
        <>
          <View style={styles.infoRow}>
            <UserIcon size={16} color={theme.colors.textSecondary} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              客戶：{customer.name}
            </Text>
          </View>
          
          <View style={styles.infoRow}>
            <Phone size={16} color={theme.colors.textSecondary} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {customer.contactInfo.phone}
            </Text>
          </View>
          
          {customer.contactInfo.preferredMethod !== ContactMethod.PHONE && (
            <View style={styles.infoRow}>
              <MessageSquare size={16} color={theme.colors.textSecondary} style={styles.infoIcon} />
              <Text style={styles.infoText}>
                偏好：{getContactMethodName(customer.contactInfo.preferredMethod)}
                {customer.contactInfo.preferredMethod === ContactMethod.LINE && customer.contactInfo.line && ` (${customer.contactInfo.line})`}
                {customer.contactInfo.preferredMethod === ContactMethod.TELEGRAM && customer.contactInfo.telegram && ` (${customer.contactInfo.telegram})`}
              </Text>
            </View>
          )}
        </>
      )}
      
      {/* 時間 */}
      <View style={styles.infoRow}>
        {task.isImmediate ? (
          <>
            <Timer size={16} color={theme.colors.error} style={styles.infoIcon} />
            <Text style={[styles.infoText, { color: theme.colors.error }]}>
              立即處理
            </Text>
          </>
        ) : task.scheduledTime ? (
          <>
            <Calendar size={16} color={theme.colors.textSecondary} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              預約時間：{formatTime(task.scheduledTime)}
            </Text>
          </>
        ) : (
          <>
            <Clock size={16} color={theme.colors.textSecondary} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              彈性時間
            </Text>
          </>
        )}
      </View>
      
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
        
        {task.status === 'pending' && !task.assignedTo && onAccept ? (
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
        )}
      </View>
    </TouchableOpacity>
  )
}