import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    refreshIndicator: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      zIndex: 1,
    },
    scrollContainer: {
      flex: 1,
    },
  })