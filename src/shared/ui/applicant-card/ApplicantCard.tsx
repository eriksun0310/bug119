import { mockUserProfiles, mockUsers } from '@/shared/mocks'
import { useTheme } from '@/shared/theme'
import { TaskStatus } from '@/shared/types'
import { Button, Card } from '@/shared/ui'
import { MapPin, MessageCircle, Phone } from 'lucide-react-native'
import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { createStyles } from './ApplicantCard.styles'
import { ApplicantCardProps } from './ApplicantCard.types'

/**
 * 申請者卡片元件
 * 根據任務狀態顯示不同的按鈕和資訊
 * - 發布中 (PENDING)：顯示接受任務按鈕
 * - 進行中 (IN_PROGRESS)：顯示聯絡資訊
 * - 待確認 (PENDING_CONFIRMATION)：顯示選擇委託按鈕
 */

const ApplicantButton = {
  [TaskStatus.PENDING]: '接受任務',
  // IN_PROGRESS: '聯絡資訊',
  [TaskStatus.PENDING_CONFIRMATION]: '選擇委託',
}

export const ApplicantCard: FC<ApplicantCardProps> = ({
  assignment,
  onSelect,
  // showSelectButton = true,
  style,
  taskStatus,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  console.log('assignment', assignment)

  const terminator = mockUsers.find(u => u.id === assignment?.assignmentId)
  const profile = mockUserProfiles[assignment?.assignmentId as keyof typeof mockUserProfiles]

  console.log('terminator', terminator)
  if (!terminator || !profile) return null

  const handlePress = () => {
    onSelect(assignment)
  }

  return (
    <Card style={[styles.applicantCard, style]}>
      <View style={styles.applicantHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: terminator.avatar || 'https://via.placeholder.com/60' }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.applicantInfo}>
          <Text style={styles.applicantName}>{terminator.name}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={theme.colors.textSecondary} />
            <Text style={styles.locationText}>{profile.location}</Text>
          </View>
        </View>
      </View>

      {taskStatus === TaskStatus.IN_PROGRESS ? (
        <View style={styles.proposalContainer}>
          <View style={styles.priceContainer}>
            {/* <Text style={styles.priceLabel}>聯絡資訊</Text> */}
            {terminator.contactInfo.preferredMethod === 'phone' && (
              <View style={styles.contactInfoRow}>
                <Phone size={16} color={theme.colors.textSecondary} style={styles.contactIcon} />
                <Text style={styles.contactInfoLabel}>電話：</Text>
                <Text style={styles.contactInfoValue}>{terminator.contactInfo.phone}</Text>
              </View>
            )}

            {terminator.contactInfo.preferredMethod === 'line' && terminator.contactInfo.line && (
              <View style={styles.contactInfoRow}>
                <MessageCircle size={16} color="#00B900" style={styles.contactIcon} />
                <Text style={styles.contactInfoLabel}>LINE：</Text>
                <Text style={styles.contactInfoValue}>{terminator.contactInfo.line}</Text>
              </View>
            )}
          </View>
        </View>
      ) : (
        <View style={styles.actionContainer}>
          <Button variant="primary" onPress={handlePress} style={styles.selectButton}>
            {ApplicantButton[taskStatus]}
          </Button>
        </View>
      )}
    </Card>
  )
}
