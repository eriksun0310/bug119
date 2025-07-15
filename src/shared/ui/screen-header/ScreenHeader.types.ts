import React from 'react'
import { ViewStyle } from 'react-native'

export interface ScreenHeaderProps {
  title: string
  showBackButton?: boolean
  rightActions?: React.ReactNode
  leftActions?: React.ReactNode
  onBackPress?: () => void
  style?: ViewStyle
}