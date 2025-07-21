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
  contentContainer: {
    alignItems: isTablet ? 'center' : 'stretch',
  },
  form: {
    padding: theme.spacing.md,
    gap: theme.spacing.lg,
    width: '100%',
    maxWidth: isTablet ? 600 : undefined,
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
  infoCard: {
    backgroundColor: theme.colors.secondary + '10',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  infoText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    flex: 1,
    marginLeft: theme.spacing.sm,
    lineHeight: 20,
  },
  roleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  roleLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.sm,
  },
  roleValue: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.secondary,
  },
  preferredMethodContainer: {
    //marginTop: theme.spacing.md,
  },
  preferredMethodLabel: {
    fontSize: theme.fontSize.md,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  bottomContainer: {
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: isTablet ? 'center' : 'stretch',
  },
  bottomContent: {
    padding: theme.spacing.md,
    width: '100%',
    maxWidth: isTablet ? 600 : undefined,
  },
})
