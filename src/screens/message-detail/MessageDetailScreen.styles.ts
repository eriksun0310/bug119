import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme, insets: { top: number; bottom: number }) => 
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.md,
      paddingTop: insets.top + theme.spacing.xs,
      paddingBottom: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      marginRight: theme.spacing.md,
    },
    userInfo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.sm,
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.text,
    },
    userStatus: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    headerActions: {
      flexDirection: 'row',
      gap: theme.spacing.sm,
    },
    actionButton: {
      padding: theme.spacing.xs,
    },
    messagesContainer: {
      flex: 1,
      paddingHorizontal: theme.spacing.md,
    },
    messageWrapper: {
      marginVertical: theme.spacing.xs,
    },
    myMessage: {
      alignSelf: 'flex-end',
      maxWidth: '80%',
    },
    otherMessage: {
      alignSelf: 'flex-start',
      maxWidth: '80%',
    },
    messageBubble: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.lg,
      marginBottom: theme.spacing.xs,
    },
    myMessageBubble: {
      backgroundColor: theme.colors.secondary,
    },
    otherMessageBubble: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    messageText: {
      fontSize: theme.fontSize.md,
      lineHeight: 20,
    },
    myMessageText: {
      color: theme.colors.primary,
    },
    otherMessageText: {
      color: theme.colors.text,
    },
    messageTime: {
      fontSize: theme.fontSize.xs,
      color: theme.colors.textSecondary,
      alignSelf: 'flex-end',
      marginTop: theme.spacing.xs,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      fontSize: theme.fontSize.md,
      maxHeight: 100,
    },
    attachButton: {
      padding: theme.spacing.sm,
      marginRight: theme.spacing.xs,
    },
    sendButton: {
      backgroundColor: theme.colors.secondary,
      borderRadius: theme.borderRadius.full,
      padding: theme.spacing.sm,
      marginLeft: theme.spacing.xs,
    },
    sendButtonDisabled: {
      backgroundColor: theme.colors.border,
    },
    // 選單樣式
    menuOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    menuContent: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: theme.borderRadius.xl,
      borderTopRightRadius: theme.borderRadius.xl,
      paddingBottom: insets.bottom,
    },
    menuHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    menuTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    closeMenuButton: {
      padding: theme.spacing.xs,
    },
    menuOptions: {
      paddingVertical: theme.spacing.sm,
    },
    menuOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      gap: theme.spacing.md,
    },
    menuOptionText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
    },
    menuOptionTextDanger: {
      color: theme.colors.error,
    },
  })