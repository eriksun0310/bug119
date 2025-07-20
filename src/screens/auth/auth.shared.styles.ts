import { Theme } from '@/shared/theme/types'
import { StyleSheet } from 'react-native'

// 認證畫面共用樣式
export const createAuthSharedStyles = (theme: Theme, isTablet: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.xl,
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
  })