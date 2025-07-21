import { SPLASH_CONFIG } from '@/shared/config/splash.config'
import { Theme } from '@/shared/theme/types'
import { StyleSheet } from 'react-native'
import { EdgeInsets } from 'react-native-safe-area-context'

export const createStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },

    logo: {
      width: SPLASH_CONFIG.LOGO.SIZE,
      height: SPLASH_CONFIG.LOGO.SIZE,
    },
    textContainer: {
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    title: {
      fontSize: SPLASH_CONFIG.TYPOGRAPHY.TITLE_SIZE,
      fontWeight: 'bold',
      color: theme.colors.text,
      letterSpacing: SPLASH_CONFIG.TYPOGRAPHY.TITLE_LETTER_SPACING,
    },
    subtitle: {
      fontSize: theme.fontSize.xl,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    tagline: {
      fontSize: theme.fontSize.md,
      color: theme.colors.textSecondary,
      fontStyle: 'italic',
    },
  })
