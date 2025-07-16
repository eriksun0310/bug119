import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme, isTablet: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    paddingBottom: isTablet ? theme.spacing.lg : 50, // 手機版添加底部 padding 避免被導航列遮住
    maxWidth: isTablet ? 1200 : undefined,
    width: '100%',
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  emptyText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  applicantsList: {
    flexDirection: isTablet ? 'row' : 'column',
    flexWrap: isTablet ? 'wrap' : 'nowrap',
    gap: theme.spacing.md,
  },
  applicantCardTablet: {
    width: '48%', // 每行顯示兩個卡片
  },
})
