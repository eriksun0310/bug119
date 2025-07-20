import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme, insets: { top: number }) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  form: {
    padding: theme.spacing.md,
    gap: theme.spacing.lg,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  section: {
    gap: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  submitSection: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    // backgroundColor: theme.colors.surface,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  submitButton: {
    marginBottom: theme.spacing.sm,
  },
  helpText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
})
