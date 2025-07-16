// 性別選擇元件 - 使用共用 SegmentedControl

import { GENDER_OPTIONS } from '@/shared/config/options.config'
import { useTheme } from '@/shared/theme'
import { Gender } from '@/shared/types'
import React from 'react'
import { Text, View } from 'react-native'
import { SegmentedControl } from '../segmented-control'
import { createStyles } from './GenderSelector.styles'

interface GenderSelectorProps {
  value?: Gender
  onChange: (gender: Gender) => void
  error?: string
  label?: string
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({
  value,
  onChange,
  error,
  label = '偏好專家性別',
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <SegmentedControl<Gender> options={GENDER_OPTIONS} value={value} onValueChange={onChange} />

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error}
          </Text>
        </View>
      )}
    </View>
  )
}
