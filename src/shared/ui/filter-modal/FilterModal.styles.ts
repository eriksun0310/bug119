import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme) => 
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: theme.borderRadius.xl,
      borderTopRightRadius: theme.borderRadius.xl,
      paddingTop: theme.spacing.md,
      maxHeight: '80%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    modalTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    closeButton: {
      padding: theme.spacing.xs,
    },
    filterSection: {
      padding: theme.spacing.lg,
    },
    filterSectionTitle: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    filterOptions: {
      gap: theme.spacing.sm,
    },
    filterOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    filterOptionActive: {
      backgroundColor: theme.colors.secondary,
      borderColor: theme.colors.secondary,
    },
    filterOptionText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.text,
    },
    filterOptionTextActive: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
    modalActions: {
      flexDirection: 'row',
      gap: theme.spacing.md,
      padding: theme.spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    actionButton: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
    },
    resetButton: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    applyButton: {
      backgroundColor: theme.colors.secondary,
    },
    actionButtonText: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
    },
    resetButtonText: {
      color: theme.colors.text,
    },
    applyButtonText: {
      color: theme.colors.primary,
    },
  })