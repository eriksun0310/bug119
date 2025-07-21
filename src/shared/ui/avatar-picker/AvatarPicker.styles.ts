// AvatarPicker 元件樣式

import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme, size: number, variant: 'standalone' | 'field') => StyleSheet.create({
  // Standalone 模式 - 原有樣式
  standaloneContainer: {
    alignItems: 'center',
  },
  standaloneAvatar: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  
  // Field 模式 - 表單欄位樣式
  fieldContainer: {
    marginBottom: theme.spacing.md,
  },
  fieldLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  fieldLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: '500',
    color: theme.colors.text,
  },
  fieldRequired: {
    color: theme.colors.error,
    marginLeft: 2,
  },
  fieldContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    minHeight: 60,
  },
  fieldAvatar: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  fieldText: {
    flex: 1,
  },
  fieldTitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    fontWeight: '500',
  },
  
  // 共用樣式
  avatarImage: {
    width: size - (variant === 'field' ? 2 : 4), // Field 模式邊框較細
    height: size - (variant === 'field' ? 2 : 4),
    borderRadius: (size - (variant === 'field' ? 2 : 4)) / 2,
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  changeButtonDisabled: {
    opacity: 0.5,
  },
  changeButtonIcon: {
    marginRight: theme.spacing.xs,
  },
  changeButtonText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.secondary,
    fontWeight: '500',
  },
})