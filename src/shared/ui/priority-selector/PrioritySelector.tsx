// 優先程度選擇器元件

import React, { FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/shared/theme'
import { TaskPriority } from '@/shared/types'
import { PrioritySelectorProps } from './PrioritySelector.types'
import { PRIORITY_OPTIONS } from '@/shared/config/options.config'

/**
 * 優先程度選擇器
 * 提供視覺化的任務優先程度選擇
 */
export const PrioritySelector: FC<PrioritySelectorProps> = ({
  value,
  onChange,
  error,
  label = '緊急程度'
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
    optionsContainer: {
      gap: theme.spacing.sm,
    },
    priorityItem: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      borderWidth: 2,
      borderColor: theme.colors.border,
    },
    priorityItemSelected: {
      borderColor: theme.colors.secondary,
      backgroundColor: theme.colors.secondary + '10',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      marginRight: theme.spacing.md,
    },
    contentContainer: {
      flex: 1,
    },
    priorityName: {
      fontSize: theme.fontSize.md,
      fontWeight: '600' as const,
      color: theme.colors.text,
      marginBottom: 2,
    },
    priorityDescription: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
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
      
      <View style={styles.optionsContainer}>
        {PRIORITY_OPTIONS.map(priority => {
          const IconComponent = priority.icon
          const isSelected = value === priority.type
          
          return (
            <TouchableOpacity
              key={priority.type}
              style={[
                styles.priorityItem,
                isSelected && styles.priorityItemSelected
              ]}
              onPress={() => onChange(priority.type)}
              activeOpacity={0.7}
            >
              <View 
                style={[
                  styles.iconContainer,
                  { backgroundColor: priority.color + '20' }
                ]}
              >
                <IconComponent
                  size={20}
                  color={priority.color}
                />
              </View>
              
              <View style={styles.contentContainer}>
                <Text style={styles.priorityName}>{priority.name}</Text>
                <Text style={styles.priorityDescription}>{priority.description}</Text>
              </View>
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