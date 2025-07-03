// 害蟲類型選擇器元件

import React, { FC } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useTheme } from '@/shared/theme'
import { PestSelectorProps } from './PestSelector.types'
import { PEST_TYPE_OPTIONS } from '@/shared/config/options.config'

/**
 * 害蟲類型選擇器
 * 提供視覺化的害蟲類型選擇介面
 */
export const PestSelector: FC<PestSelectorProps> = ({
  value,
  onChange,
  error,
  label = '害蟲類型'
}) => {
  const { theme } = useTheme()
  
  
  const styles = {
    container: {
      marginBottom: theme.spacing.sm,
    },
    label: {
      fontSize: theme.fontSize.sm,
      fontWeight: '500' as const,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    grid: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      gap: theme.spacing.sm,
    },
    pestItem: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      borderWidth: 2,
      borderColor: theme.colors.border,
      alignItems: 'center' as const,
    },
    pestItemSelected: {
      borderColor: theme.colors.secondary,
      backgroundColor: theme.colors.secondary + '10',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.border + '40',
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      marginBottom: theme.spacing.sm,
    },
    pestName: {
      fontSize: theme.fontSize.md,
      fontWeight: '600' as const,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
      textAlign: 'center' as const,
    },
    pestDescription: {
      fontSize: theme.fontSize.xs,
      color: theme.colors.textSecondary,
      textAlign: 'center' as const,
      lineHeight: 16,
    },
    errorText: {
      fontSize: theme.fontSize.xs,
      color: theme.colors.error,
      marginTop: theme.spacing.xs,
    },
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <View style={styles.grid}>
        {PEST_TYPE_OPTIONS.map(pest => {
          const IconComponent = pest.icon
          const isSelected = value === pest.type
          
          return (
            <TouchableOpacity
              key={pest.type}
              style={[
                styles.pestItem,
                isSelected && styles.pestItemSelected
              ]}
              onPress={() => onChange(pest.type)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.iconContainer,
                isSelected && { backgroundColor: theme.colors.secondary + '20' }
              ]}>
                <IconComponent
                  size={20}
                  color={isSelected ? theme.colors.secondary : theme.colors.textSecondary}
                />
              </View>
              <Text style={styles.pestName}>{pest.name}</Text>
              <Text style={styles.pestDescription}>{pest.description}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  )
}