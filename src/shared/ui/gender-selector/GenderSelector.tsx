// 性別選擇元件 - Segmented buttons 樣式

import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '@/shared/theme'

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  ANY = 'any'
}

interface GenderSelectorProps {
  value?: Gender
  onChange: (gender: Gender) => void
  error?: string
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({
  value,
  onChange,
  error
}) => {
  const { theme } = useTheme()

  const genderOptions = [
    { value: Gender.MALE, label: '男' },
    { value: Gender.FEMALE, label: '女' },
    { value: Gender.ANY, label: '不限' }
  ]

  const styles = StyleSheet.create({
    container: {
      marginBottom: theme.spacing.md,
    },
    label: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    segmentedContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: 2,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    segment: {
      flex: 1,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedSegment: {
      backgroundColor: theme.colors.primary,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    unselectedSegment: {
      backgroundColor: 'transparent',
    },
    segmentText: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
    },
    selectedText: {
      color: theme.colors.secondary,
    },
    unselectedText: {
      color: theme.colors.textSecondary,
    },
    errorContainer: {
      marginTop: theme.spacing.xs,
    },
    errorText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.error,
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.label}>偏好專家性別</Text>
      <View style={styles.segmentedContainer}>
        {genderOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.segment,
              value === option.value ? styles.selectedSegment : styles.unselectedSegment,
            ]}
            onPress={() => onChange(option.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.segmentText,
                value === option.value ? styles.selectedText : styles.unselectedText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  )
}