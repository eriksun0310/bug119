import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'
import { EdgeInsets } from 'react-native-safe-area-context'

export const createStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
      paddingBottom: 50, // 添加底部 padding 避免被導航列遮住
      maxWidth: 600,
      width: '100%',
      alignSelf: 'center',
    },
    profileCard: {
      marginBottom: theme.spacing.lg,
      alignItems: 'center',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.border,
      marginBottom: theme.spacing.md,
    },
    name: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    email: {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
    },
    roleContainer: {
      marginTop: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
      backgroundColor: theme.colors.secondary,
      borderRadius: theme.borderRadius.full,
    },
    roleText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    section: {
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    menuText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
    },
    menuValue: {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
    },
  })