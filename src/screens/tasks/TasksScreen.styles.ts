import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme, isTablet: boolean, insets: { top: number }) => StyleSheet.create({
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
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  taskRow: {
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  taskCardTablet: {
    width: '48%', // 每行顯示兩個卡片
    marginBottom: 0, // 移除底部邊距，因為已有 gap
  },
})
