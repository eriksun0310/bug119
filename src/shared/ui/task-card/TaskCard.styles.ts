// 任務卡片元件樣式

import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
    minWidth: 280, // 最小寬度確保內容可讀性
    maxWidth: 450, // 增加最大寬度
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  
  priorityBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
  },
  
  priorityText: {
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  
  infoIcon: {
    marginRight: theme.spacing.xs,
  },
  
  infoText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  
  description: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  budgetText: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
  },
  
  
  // Compact 變體樣式
  compactContainer: {
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  
  compactTitle: {
    fontSize: theme.fontSize.md,
    marginBottom: theme.spacing.xs,
  },
  
  compactDescription: {
    fontSize: theme.fontSize.sm,
    marginBottom: theme.spacing.sm,
  },
})