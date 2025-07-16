import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme) => 
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.lg,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
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
    chatInfo: {
      flex: 1,
    },
    chatName: {
      fontSize: theme.fontSize.lg,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: theme.spacing.xs,
    },
    lastMessage: {
      fontSize: theme.fontSize.sm,
      color: '#666666',
      lineHeight: 20,
    },
    timeContainer: {
      alignItems: 'flex-end',
    },
    messageTime: {
      fontSize: theme.fontSize.sm,
      color: '#666666',
      marginBottom: theme.spacing.xs,
    },
    unreadBadge: {
      backgroundColor: theme.colors.error,
      borderRadius: 10,
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    unreadText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
    rightActionContainer: {
      backgroundColor: '#FF4444',
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
    },
    deleteButton: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteIconWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: theme.fontSize.sm,
      marginTop: theme.spacing.xs,
    },
    checkboxContainer: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: theme.spacing.md,
    },
    checkboxSelected: {
      backgroundColor: theme.colors.secondary,
      borderColor: theme.colors.secondary,
    },
  })