// SegmentedControl 元件樣式

import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xs,
    backgroundColor: 'transparent',
    minHeight: 44,
    minWidth: 80, // 確保四個字的標籤有足夠寬度
  },
  segmentWithBorder: {
    borderRightWidth: 0.5,
    borderRightColor: theme.colors.border,
  },
  segmentActive: {
    backgroundColor: theme.colors.secondary,
  },
  segmentDisabled: {
    opacity: 0.5,
  },
  segmentIcon: {
    marginRight: theme.spacing.xs,
  },
  segmentText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: '500',
  },
  segmentTextActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  segmentTextDisabled: {
    opacity: 0.5,
  },
})