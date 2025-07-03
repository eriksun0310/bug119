// 性別選擇元件 - 使用共用 SegmentedControl

import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@/shared/theme'
import { SegmentedControl } from '../segmented-control'
import { GENDER_OPTIONS } from '@/shared/config/options.config'
import { Gender } from '@/shared/types'

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
  label = '偏好專家性別'
}) => {
  const { theme } = useTheme()

  return (
    <View style={{ marginBottom: theme.spacing.md }}>
      <Text style={{
        fontSize: theme.fontSize.md,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
      }}>
        {label}
      </Text>
      
      <SegmentedControl<Gender>
        options={GENDER_OPTIONS}
        value={value}
        onValueChange={onChange}
      />
      
      {error && (
        <View style={{ marginTop: theme.spacing.xs }}>
          <Text style={{
            fontSize: theme.fontSize.sm,
            color: theme.colors.error,
          }}>
            {error}
          </Text>
        </View>
      )}
    </View>
  )
}