// 輸入框元件樣式

import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    marginBottom: theme.spacing.sm,
  },
  
  fullWidth: {
    width: '100%',
  },
  
  // 標籤樣式
  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  
  // 輸入框容器
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
  },
  
  // 變體樣式
  outlined: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: 'transparent',
  },
  outlinedFocused: {
    borderColor: theme.colors.secondary,
  },
  outlinedError: {
    borderColor: theme.colors.error,
  },
  
  filled: {
    backgroundColor: theme.colors.surface,
    borderWidth: 0,
  },
  filledFocused: {
    backgroundColor: theme.colors.surface,
  },
  filledError: {
    backgroundColor: theme.colors.surface,
  },
  
  // 尺寸樣式
  sm: {
    minHeight: 36,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },
  md: {
    minHeight: 44,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  lg: {
    minHeight: 52,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  
  // 多行輸入樣式
  multiline: {
    alignItems: 'flex-start',
    minHeight: 88, // 約 4 行的高度
  },
  
  // 圖示容器
  leftIconContainer: {
    marginRight: theme.spacing.xs,
  },
  rightIconContainer: {
    marginLeft: theme.spacing.xs,
  },
  
  // 輸入框
  input: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    paddingVertical: 0, // 移除預設 padding
    textAlignVertical: 'top', // Android 多行輸入時文字置頂
  },
  inputSm: {
    fontSize: theme.fontSize.sm,
  },
  inputLg: {
    fontSize: theme.fontSize.lg,
  },
  
  // 輔助文字
  helperText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  
  // 錯誤文字
  errorText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
})