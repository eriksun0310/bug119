// 亮暗主題定義

import { Theme } from './types'

export const lightTheme: Theme = {
  colors: {
    primary: '#FFFFFF',      // 白色主色
    secondary: '#000000',    // 黑色輔色
    background: '#FFFFFF',   // 白色背景
    surface: '#F5F5F5',      // 淺灰色表面
    text: '#000000',         // 黑色文字
    textSecondary: '#666666', // 灰色次要文字
    border: '#E0E0E0',       // 淺灰邊框
    error: '#FF3B30',        // 紅色錯誤
    success: '#34C759',      // 綠色成功
    warning: '#FF9500',      // 橘色警告
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
  },
}

export const darkTheme: Theme = {
  colors: {
    primary: '#000000',      // 黑色主色
    secondary: '#FFFFFF',    // 白色輔色
    background: '#000000',   // 黑色背景
    surface: '#1C1C1E',      // 深灰色表面
    text: '#FFFFFF',         // 白色文字
    textSecondary: '#8E8E93', // 灰色次要文字
    border: '#38383A',       // 深灰邊框
    error: '#FF453A',        // 紅色錯誤
    success: '#32D74B',      // 綠色成功
    warning: '#FF9F0A',      // 橘色警告
  },
  spacing: lightTheme.spacing,      // 間距保持一致
  fontSize: lightTheme.fontSize,    // 字體大小保持一致
  borderRadius: lightTheme.borderRadius, // 圓角保持一致
  shadows: {
    sm: {
      shadowColor: '#FFF',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#FFF',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#FFF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
  },
}