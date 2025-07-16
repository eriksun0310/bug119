import { mockUserProfiles, mockUsers } from '@/shared/mocks'
import { useTheme } from '@/shared/theme'
import { TaskStatus, UserRole } from '@/shared/types'
import { Button, Card } from '@/shared/ui'
import { MapPin, Phone } from 'lucide-react-native'
import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { createStyles } from './ApplicantCard.styles'
import { ApplicantCardProps } from './ApplicantCard.types'

/**
 * 申請者卡片元件
 * 根據任務狀態和使用者角色顯示不同的按鈕和資訊
 *
 * 業務邏輯：
 * - PENDING + 終結者：顯示「接受任務」按鈕
 * - PENDING_CONFIRMATION + 小怕星：顯示申請者資料和「選擇委託」按鈕
 * - PENDING_CONFIRMATION + 終結者：顯示小怕星基本資訊，無按鈕
 * - IN_PROGRESS + 雙方：顯示對方完整聯絡資訊和「已完成」按鈕
 * - COMPLETED + 雙方：隱藏聯絡資訊，僅顯示基本資料
 */

export const ApplicantCard: FC<ApplicantCardProps> = ({
  application,
  assignment,
  onSelect,
  style,
  taskStatus,
  currentUserRole,
  currentUserId,
  taskCreatedBy,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  // 根據不同狀態決定要顯示的使用者資料
  const getDisplayUser = () => {
    if (application) {
      // 根據狀態和角色決定顯示誰的資料
      if (taskStatus === TaskStatus.IN_PROGRESS || taskStatus === TaskStatus.COMPLETED) {
        // IN_PROGRESS 或 COMPLETED 狀態：顯示對方的資料
        if (currentUserRole === UserRole.FEAR_STAR) {
          // 小怕星看終結者
          return mockUsers.find(u => u.id === application.terminatorId)
        } else {
          // 終結者看小怕星
          return mockUsers.find(u => u.id === taskCreatedBy)
        }
      } else {
        // PENDING 或 PENDING_CONFIRMATION 狀態
        const foundUser = mockUsers.find(u => u.id === application.terminatorId)
        console.log('foundUser:', foundUser)
        return foundUser
      }
    }
    if (assignment) {
      // IN_PROGRESS 狀態：顯示對方的資料
      if (currentUserRole === UserRole.FEAR_STAR) {
        return mockUsers.find(u => u.id === assignment.terminatorId)
      } else {
        return mockUsers.find(u => u.id === currentUserId) // 這裡需要從任務中取得小怕星ID
      }
    }
    return null
  }

  const displayUser = getDisplayUser()
  const profile = displayUser
    ? mockUserProfiles[displayUser.id as keyof typeof mockUserProfiles]
    : null

  if (!displayUser || !profile) return null

  const handlePress = () => {
    onSelect(application || assignment!)
  }

  // 決定按鈕文字和顯示邏輯
  const getButtonConfig = () => {
    switch (taskStatus) {
      case TaskStatus.PENDING:
        return currentUserRole === UserRole.TERMINATOR
          ? { text: '接受任務', show: true }
          : { show: false }

      case TaskStatus.PENDING_CONFIRMATION:
        return currentUserRole === UserRole.FEAR_STAR
          ? { text: '選擇委託', show: true }
          : { show: false }

      case TaskStatus.IN_PROGRESS:
        return { text: '已完成', show: true }

      case TaskStatus.COMPLETED:
        return { show: false } // 已完成狀態不顯示按鈕

      default:
        return { show: false }
    }
  }

  const buttonConfig = getButtonConfig()
  const shouldShowContactInfo = taskStatus === TaskStatus.IN_PROGRESS

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
              <Text style={styles.locationText}>{profile.location}</Text>
            </View>
          )}
        </View>
      </View>

      {shouldShowContactInfo ? (
        <View style={styles.proposalContainer}>
          <View style={styles.priceContainer}>
            {/* 顯示電話 */}
            <View style={styles.contactInfoRow}>
              <Phone size={16} color={theme.colors.textSecondary} style={styles.contactIcon} />
              <Text style={styles.contactInfoLabel}>電話：</Text>
              <Text style={styles.contactInfoValue}>{displayUser.contactInfo.phone}</Text>
            </View>

            {/* 顯示 LINE（如果有的話） */}
            {/* {displayUser.contactInfo.line && (
              <View style={styles.contactInfoRow}>
                <MessageCircle size={16} color="#00B900" style={styles.contactIcon} />
                <Text style={styles.contactInfoLabel}>LINE：</Text>
                <Text style={styles.contactInfoValue}>{displayUser.contactInfo.line}</Text>
              </View>
            )} */}

            {/* 顯示 Telegram（如果有的話） */}
            {/* {displayUser.contactInfo.telegram && (
              <View style={styles.contactInfoRow}>
                <MessageCircle size={16} color="#0088cc" style={styles.contactIcon} />
                <Text style={styles.contactInfoLabel}>Telegram：</Text>
                <Text style={styles.contactInfoValue}>{displayUser.contactInfo.telegram}</Text>
              </View>
            )} */}
          </View>
          {buttonConfig.show && (
            <Button variant="primary" onPress={handlePress} style={styles.selectButton}>
              {buttonConfig.text}
            </Button>
          )}
        </View>
      ) : (
        buttonConfig.show && (
          <View style={styles.actionContainer}>
            <Button variant="primary" onPress={handlePress} style={styles.selectButton}>
              {buttonConfig.text}
            </Button>
          </View>
        )
      )}
    </Card>
  )
}
