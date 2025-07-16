import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme, isTablet: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
      maxWidth: isTablet ? 1200 : undefined,
      width: '100%',
      alignSelf: 'center',
    },
    listContainer: {
      paddingBottom: theme.spacing.xl,
    },
    taskCardTablet: {
      marginBottom: theme.spacing.md,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing.xl,
    },
    emptyText: {
      fontSize: theme.fontSize.lg,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
    },
    emptySubText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
    },
  })