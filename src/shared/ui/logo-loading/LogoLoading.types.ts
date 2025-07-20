import { ViewStyle } from 'react-native'

export interface LogoLoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  style?: ViewStyle
  animationType?: 'spin' | 'pulse'
}