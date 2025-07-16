import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme, insets: { top: number }) => 
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.md,
      paddingTop: insets.top > 0 ? insets.top + theme.spacing.xs : theme.spacing.sm,
      paddingBottom: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      padding: theme.spacing.xs,
    },
    title: {
      fontSize: theme.fontSize.xl,
      fontWeight: 'bold',
      color: theme.colors.text,
      flex: 1,
      textAlign: 'center',
    },
    markAllButton: {
      padding: theme.spacing.xs,
    },
    markAllText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.secondary,
      fontWeight: '500',
    },
    content: {
      flex: 1,
    },
    notificationItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    unreadNotification: {
      backgroundColor: theme.colors.background,
    },
    notificationIcon: {
      marginRight: theme.spacing.md,
      marginTop: theme.spacing.xs,
    },
    notificationContent: {
      flex: 1,
    },
    notificationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.xs,
    },
    notificationTitle: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
      flex: 1,
    },
    notificationTime: {
      fontSize: theme.fontSize.xs,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.sm,
    },
    notificationMessage: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      lineHeight: 18,
      marginBottom: theme.spacing.xs,
    },
    notificationActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
    },
    actionButton: {
      padding: theme.spacing.xs,
    },
    unreadDot: {
      position: 'absolute',
      top: theme.spacing.md,
      left: theme.spacing.xs,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.error,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.xl,
    },
    emptyStateText: {
      fontSize: theme.fontSize.lg,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.spacing.md,
    },
  })