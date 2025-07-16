import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme, isTablet: boolean, screenWidth: number, insets: { top: number }) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingTop: insets.top > 0 ? insets.top + theme.spacing.xs : theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    flex: 1,
  },
  filterIconButton: {
    padding: theme.spacing.xs,
  },
  bellButton: {
    padding: theme.spacing.xs,
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
    alignItems: isTablet ? 'center' : 'stretch',
    paddingBottom: isTablet ? theme.spacing.md : 50, // 手機版添加底部 padding 避免被導航列遮住
  },
  taskList: {
    padding: theme.spacing.md,
    width: '100%',
    maxWidth: isTablet ? 1200 : undefined, // 電腦版放寬最大寬度
    flexDirection: 'row', // 橫向排列
    flexWrap: 'wrap', // 允許換行
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
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
  taskCardHorizontal: {
    width: screenWidth > 600 ? '48%' : '100%', // 寬螢幕每行顯示兩個卡片，窄螢幕每行一個
  },
})
