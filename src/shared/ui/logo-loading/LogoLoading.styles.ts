import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  logo: {
    borderRadius: theme.borderRadius.md,
  },
  // 尺寸變體
  sm: {
    width: 32,
    height: 32,
  },
  md: {
    width: 48,
    height: 48,
  },
  lg: {
    width: 64,
    height: 64,
  },
  xl: {
    width: 96,
    height: 96,
  },
  text: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
})