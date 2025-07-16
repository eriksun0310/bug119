import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme) => 
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: theme.fontSize.xxl,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    subtitle: {
      fontSize: theme.fontSize.lg,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xl,
    },
  })