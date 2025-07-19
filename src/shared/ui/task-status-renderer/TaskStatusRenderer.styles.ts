import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  applicantsList: {
    gap: theme.spacing.md,
  },
  applicantCardTablet: {
    maxWidth: 600,
  },
  emptyApplicants: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
  buttonContainer: {
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.sm,
  },
  // 新增 PENDING_COMPLETION 狀態相關樣式
  completionStatusContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  confirmationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  confirmationLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
    fontWeight: '500',
  },
  confirmationStatus: {
    fontSize: theme.fontSize.md,
    fontWeight: 'bold',
  },
  confirmedStatus: {
    color: theme.colors.success,
  },
  pendingStatus: {
    color: theme.colors.warning,
  },
  waitingContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  waitingText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
})