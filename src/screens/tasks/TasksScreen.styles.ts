import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme, isTablet: boolean, insets: { top: number }) => StyleSheet.create({
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
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    flex: 1,
  },
  bellButton: {
    padding: theme.spacing.xs,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  activeTab: {
    backgroundColor: theme.colors.secondary,
  },
  tabIcon: {
    marginRight: theme.spacing.xs,
  },
  tabText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  tabCount: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
    backgroundColor: theme.colors.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    minWidth: 18,
    textAlign: 'center',
  },
  activeTabCount: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.secondary,
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
    flexDirection: isTablet ? 'row' : 'column', // 電腦版使用橫向排列
    flexWrap: isTablet ? 'wrap' : 'nowrap', // 電腦版允許換行
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
  emptyStateSubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
    opacity: 0.7,
  },
  taskCardTablet: {
    width: '48%', // 每行顯示兩個卡片
    marginBottom: 0, // 移除底部邊距，因為已有 gap
  },
})
