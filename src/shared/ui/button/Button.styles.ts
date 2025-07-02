// 按鈕元件樣式

import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme) => StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  // 變體樣式
  primary: {
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  danger: {
    backgroundColor: theme.colors.error,
    borderWidth: 0,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  
  // 尺寸樣式
  sm: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    minHeight: 32,
  },
  md: {
    paddingVertical: theme.spacing.sm + 2,
    paddingHorizontal: theme.spacing.md,
    minHeight: 44,
  },
  lg: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    minHeight: 52,
  },
  
  // 狀態樣式
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  loading: {
    opacity: 0.7,
  },
  
  // 文字樣式
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  textSm: {
    fontSize: theme.fontSize.sm,
  },
  textMd: {
    fontSize: theme.fontSize.md,
  },
  textLg: {
    fontSize: theme.fontSize.lg,
  },
  textPrimary: {
    color: theme.colors.secondary,
  },
  textSecondary: {
    color: theme.colors.primary,
  },
  textDanger: {
    color: '#FFFFFF',
  },
  textGhost: {
    color: theme.colors.text,
  },
  
  // Loading 容器
  loadingContainer: {
    marginRight: theme.spacing.xs,
  },
})