import React, { FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@/shared/theme'
import { ScreenHeaderProps } from './ScreenHeader.types'
import { createStyles } from './ScreenHeader.styles'

/**
 * 畫面標題列共用元件
 * 統一處理標題、返回按鈕、右側操作按鈕等
 */
export const ScreenHeader: FC<ScreenHeaderProps> = ({
  title,
  showBackButton = true,
  rightActions,
  leftActions,
  onBackPress,
  style,
}) => {
  const { theme } = useTheme()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const styles = createStyles(theme, insets.top)

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      navigation.goBack()
    }
  }

  return (
    <View style={[styles.header, style]}>
      <View style={styles.headerContent}>
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <ArrowLeft size={24} color={theme.colors.text} />
            </TouchableOpacity>
          )}
          {leftActions}
        </View>
        
        <View style={styles.centerContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        
        <View style={styles.rightContainer}>
          {rightActions}
        </View>
      </View>
    </View>
  )
}