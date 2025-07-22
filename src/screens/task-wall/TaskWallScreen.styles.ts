import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme, isTablet: boolean, screenWidth: number, insets: { top: number }) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchAndFilterContainer: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchContainer: {
    marginBottom: theme.spacing.sm,
  },
  clearFilterRow: {
    alignItems: 'flex-end',
    marginBottom: theme.spacing.xs,
  },
  clearFiltersButton: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.secondary,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  taskListContainer: {
    flexGrow: 1,
    padding: theme.spacing.md,
    paddingBottom: isTablet ? theme.spacing.md : 50, // 手機版添加底部 padding 避免被導航列遮住
  },
  taskRow: {
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
  },
  taskCardHorizontal: {
    flex: screenWidth > 600 ? 0.48 : 1, // FlatList 用 flex 比例
    marginBottom: theme.spacing.md,
  },
})
