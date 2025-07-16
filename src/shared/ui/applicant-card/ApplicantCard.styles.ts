import { Theme } from '@/shared/theme/types'
import { StyleSheet } from 'react-native'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    applicantCard: {
      marginBottom: theme.spacing.md,
    },
    applicantHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    avatarContainer: {
      position: 'relative',
      marginRight: theme.spacing.md,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.colors.border,
    },
    verifiedBadge: {
      position: 'absolute',
      top: -2,
      right: -2,
      backgroundColor: theme.colors.success,
      borderRadius: 10,
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    verifiedText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: 'bold',
    },
    applicantInfo: {
      flex: 1,
    },
    applicantName: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    locationText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.xs,
    },
    proposalContainer: {
      marginBottom: theme.spacing.md,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      // borderRadius: theme.borderRadius.md,
      // borderWidth: 1,
      // borderColor: theme.colors.border,
    },
    priceLabel: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    priceValue: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.secondary,
    },
    actionContainer: {
      marginTop: theme.spacing.sm,
    },
    selectButton: {
      flex: 1,
    },
    taskMeta: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    contactInfoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.xs,
    },
    contactIcon: {
      marginRight: theme.spacing.xs,
    },
    contactInfoLabel: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      width: 80,
    },
    contactInfoValue: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.text,
      flex: 1,
    },
  })
