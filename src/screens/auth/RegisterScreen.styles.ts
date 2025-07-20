import { Theme } from '@/shared/theme/types'
import { StyleSheet } from 'react-native'
import { createAuthSharedStyles } from './auth.shared.styles'

export const createStyles = (theme: Theme, isTablet: boolean) => {
  const sharedStyles = createAuthSharedStyles(theme, isTablet)
  
  return StyleSheet.create({
    ...sharedStyles,
    sectionTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
    optionalLabel: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.xs,
    },
    fieldLabel: {
      fontSize: theme.fontSize.md,
      fontWeight: '500',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
  })
}