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
    logo: {
      width: 120,
      height: 120,
      // marginBottom: theme.spacing.lg,
      alignSelf: 'center',
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
      marginBottom: theme.spacing.xs,
    },
    form: {
      gap: theme.spacing.md,
    },
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