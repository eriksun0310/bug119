import React, { FC } from 'react'
import { RefreshControl, RefreshControlProps } from 'react-native'
import { useTheme } from '@/shared/theme'

interface CustomRefreshControlProps extends Omit<RefreshControlProps, 'colors' | 'tintColor'> {
  refreshing: boolean
  onRefresh: () => void
}

/**
 * 自定義下拉刷新控制器
 * 使用主題色彩的 RefreshControl
 */
export const CustomRefreshControl: FC<CustomRefreshControlProps> = ({
  refreshing,
  onRefresh,
  ...props
}) => {
  const { theme } = useTheme()

  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[theme.colors.secondary]}
      tintColor={theme.colors.secondary}
      title="下拉更新任務..."
      titleColor={theme.colors.text}
      {...props}
    />
  )
}