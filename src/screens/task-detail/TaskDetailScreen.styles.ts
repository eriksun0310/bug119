import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme, isTablet: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
      paddingBottom: isTablet ? theme.spacing.lg : 50, // 手機版添加底部 padding 避免被導航列遮住
      maxWidth: isTablet ? 1200 : undefined,
      width: '100%',
      alignSelf: 'center',
    },
    sectionTitle: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    taskTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    taskDescription: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
      lineHeight: 22,
      marginBottom: theme.spacing.md,
    },
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacing.sm,
    },
    tag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F0F0F0',
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 6,
      borderRadius: theme.borderRadius.sm,
    },
    tagText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.xs,
    },
    urgentTag: {
      backgroundColor: '#FFE4E4',
    },
    urgentTagText: {
      color: theme.colors.error,
      fontWeight: '500',
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    infoText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
      flex: 1,
    },
    infoSubText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.sm,
    },
    budgetContainer: {
      backgroundColor: 'transparent',
      borderRadius: theme.borderRadius.lg,
      paddingTop: theme.spacing.sm,
      alignItems: 'flex-start',
    },
    budgetText: {
      fontSize: theme.fontSize.xl,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
    },
    budgetSubText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.spacing.xs,
    },
    customerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F8F8F8',
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.md,
    },
    customerInfo: {
      flex: 1,
    },
    customerName: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
    },
    customerRating: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing.xs,
    },
    ratingText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.xs,
    },
    contactButton: {
      backgroundColor: theme.colors.secondary,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
    },
    contactHint: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.spacing.sm,
      fontStyle: 'italic',
    },
    contactInfoContainer: {
      backgroundColor: '#F8F8F8',
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      marginTop: theme.spacing.md,
    },
    contactInfoTitle: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
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
    actionButtons: {
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
    },
    // 申請者列表樣式
    applicantsList: {
      flexDirection: isTablet ? 'row' : 'column',
      flexWrap: isTablet ? 'wrap' : 'nowrap',
      justifyContent: isTablet ? 'flex-start' : 'flex-start',
      alignItems: isTablet ? 'flex-start' : 'stretch',
      gap: theme.spacing.md,
    },
    applicantCardTablet: {
      width: '48%',
    },
    emptyApplicants: {
      textAlign: 'center',
      color: theme.colors.textSecondary,
      fontSize: theme.fontSize.sm,
      fontStyle: 'italic',
      marginTop: theme.spacing.md,
    },
    summaryCard: {
      backgroundColor: '#F0F0F0',
      padding: theme.spacing.md,
    },
  })