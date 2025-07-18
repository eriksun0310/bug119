import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { MapPin, Phone } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { Button, Card } from '@/shared/ui'
import { useApplicantDisplayData } from '@/shared/hooks/useApplicantDisplayData'
import { ApplicantCardProps } from './ApplicantCard.types'
import { createStyles } from './ApplicantCard.styles'

/**
 * 申請者卡片元件（簡化版）
 * 專注於展示申請者資訊，業務邏輯交由 Hook 處理
 */
export const ApplicantCard: FC<ApplicantCardProps> = ({
  application,
  assignment,
  onSelect,
  onWithdraw,
  style,
  taskStatus,
  currentUserRole,
  currentUserId,
  taskCreatedBy,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  
  // 使用 Hook 獲取顯示資料
  const { displayUser, userProfile, shouldShowContactInfo } = useApplicantDisplayData({
    application,
    assignment,
    taskStatus,
    currentUserRole,
    currentUserId,
    taskCreatedBy
  })

  // 如果沒有用戶資料，不渲染
  if (!displayUser || !userProfile) return null

  // 處理按鈕點擊
  const handlePress = () => {
    onSelect(application || assignment!)
  }

  // 處理撤回申請 - 已移至 TaskStatusRenderer
  // const handleWithdraw = () => {
  //   if (application && onWithdraw) {
  //     onWithdraw(application.id)
  //   }
  // }

  // 決定按鈕配置
  const getButtonConfig = () => {
    switch (taskStatus) {
      case 'pending':
        // 移除接受任務按鈕，改到 TaskStatusRenderer
        return { show: false }

      case 'pending_confirmation':
        if (currentUserRole === 'fear_star') {
          return { text: '選擇委託', show: true }
        }
        // 移除終結者的撤回申請按鈕，改到 TaskStatusRenderer
        return { show: false }

      case 'in_progress':
        // 移除已完成按鈕，改到 TaskStatusRenderer
        return { show: false }

      case 'completed':
        return { show: false }

      default:
        return { show: false }
    }
  }

  const buttonConfig = getButtonConfig()

  return (
    <Card style={[styles.applicantCard, style]}>
      <View style={styles.applicantHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: displayUser.avatar || 'https://via.placeholder.com/60' }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.applicantInfo}>
          <Text style={styles.applicantName}>{displayUser.name}</Text>
          {shouldShowContactInfo && (
            <View style={styles.locationContainer}>
              <MapPin size={14} color={theme.colors.textSecondary} />
              <Text style={styles.locationText}>{userProfile.location}</Text>
            </View>
          )}
        </View>
      </View>

      {shouldShowContactInfo ? (
        <View style={styles.proposalContainer}>
          <View style={styles.priceContainer}>
            <View style={styles.contactInfoRow}>
              <Phone size={16} color={theme.colors.textSecondary} style={styles.contactIcon} />
              <Text style={styles.contactInfoLabel}>電話：</Text>
              <Text style={styles.contactInfoValue}>{displayUser.contactInfo.phone}</Text>
            </View>
          </View>
          {buttonConfig.show && (
            <Button variant="secondary" onPress={handlePress} style={styles.selectButton}>
              {buttonConfig.text}
            </Button>
          )}
        </View>
      ) : (
        buttonConfig.show && (
          <View style={styles.actionContainer}>
            <Button 
              variant="secondary" 
              onPress={handlePress} 
              style={styles.selectButton}
            >
              {buttonConfig.text}
            </Button>
          </View>
        )
      )}
    </Card>
  )
}
