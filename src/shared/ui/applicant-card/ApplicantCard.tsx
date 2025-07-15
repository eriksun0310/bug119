import React, { FC } from 'react'
import { View, Text, Image } from 'react-native'
import { MapPin } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { Button, Card } from '@/shared/ui'
import { mockUsers, mockUserProfiles } from '@/shared/mocks'
import { ApplicantCardProps } from './ApplicantCard.types'
import { createStyles } from './ApplicantCard.styles'

/**
 * 申請者卡片元件
 * 顯示申請者資訊，包含頭像、姓名、位置、提議價格等
 */
export const ApplicantCard: FC<ApplicantCardProps> = ({
  assignment,
  onSelect,
  showSelectButton = true,
  style,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  const terminator = mockUsers.find(u => u.id === assignment.terminatorId)
  const profile = mockUserProfiles[assignment.terminatorId as keyof typeof mockUserProfiles]

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
      
      <View style={styles.proposalContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>提議價格</Text>
          <Text style={styles.priceValue}>${assignment.proposedPrice}</Text>
        </View>
      </View>
      
      {showSelectButton && (
        <View style={styles.actionContainer}>
          <Button
            variant="primary"
            onPress={handlePress}
            style={styles.selectButton}
          >
            選擇委託
          </Button>
        </View>
      )}
    </Card>
  )
}