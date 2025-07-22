import React, { FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/shared/theme'
import { EmptyStateProps } from './EmptyState.types'
import { createStyles } from './EmptyState.styles'

/**
 * EmptyState 元件
 * 用於顯示空狀態時的提示訊息
 */
export const EmptyState: FC<EmptyStateProps> = ({
  icon,
  title,
  subtitle,
  action,
  style,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={[styles.container, style]}>
      {icon && (
        <View style={styles.iconContainer}>
          {icon}
        </View>
      )}
      
      <Text style={styles.title}>
        {title}
      </Text>
      
      {subtitle && (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      )}
      
      {action && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={action.onPress}
        >
          <Text style={styles.actionButtonText}>
            {action.label}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}