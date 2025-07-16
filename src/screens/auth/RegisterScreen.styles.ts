import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme, isTablet: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.lg,
      paddingTop: theme.spacing.xl,
    },
    formContainer: {
      width: '100%',
      maxWidth: isTablet ? 400 : undefined, // 電腦版最大寬度 400px
    },
    title: {
      fontSize: theme.fontSize.xxl,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: theme.spacing.xs,
    },
    subtitle: {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.xxl,
    },
    form: {
      gap: theme.spacing.md,
    },
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