import { Theme } from '@/shared/theme/types'
import { StyleSheet } from 'react-native'
import { createAuthSharedStyles } from './auth.shared.styles'

export const createStyles = (theme: Theme, isTablet: boolean) => {
  const sharedStyles = createAuthSharedStyles(theme, isTablet)
  
  return StyleSheet.create({
    ...sharedStyles,
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: theme.spacing.lg,
    },
    registerText: {
      color: theme.colors.textSecondary,
      fontSize: theme.fontSize.md,
    },
    registerLink: {
      color: theme.colors.secondary,
      fontWeight: '600',
      marginLeft: theme.spacing.xs,
    },
    testAccountsContainer: {
      marginTop: theme.spacing.lg,
      padding: theme.spacing.md,
      // backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
    },
    testAccountsTitle: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    },
    testAccountsButtons: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },
    testAccountButton: {
      flex: 1,
    },
  })
}