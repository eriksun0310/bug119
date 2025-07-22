import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.sm,
  },
  tabsContainer: {
    flexDirection: 'row',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    minHeight: 48,
    position: 'relative',
  },
  tabScrollable: {
    paddingHorizontal: theme.spacing.xl, // 可滾動時增加間距
  },
  tabActive: {
    // 活躍狀態樣式
  },
  tabDisabled: {
    opacity: 0.5,
  },
  tabIcon: {
    marginRight: theme.spacing.xs,
  },
  tabText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  tabTextActive: {
    color: theme.colors.text,
    fontWeight: '600',
  },
  tabCount: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    minWidth: 20,
    textAlign: 'center',
  },
  tabCountActive: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.primary,
  },
  // 底部指示器
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: theme.colors.text,
    borderRadius: theme.borderRadius.sm,
  },
})