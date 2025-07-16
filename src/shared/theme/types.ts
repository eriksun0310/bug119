// 主題系統型別定義

export type ThemeMode = 'light' | 'dark'

export interface ThemeColors {
  primary: string        // 主要顏色（按鈕、重點元素）
  secondary: string      // 次要顏色
  background: string     // 背景顏色
  surface: string        // 卡片、元件表面顏色
  text: string          // 主要文字顏色
  textSecondary: string // 次要文字顏色
  border: string        // 邊框顏色
  error: string         // 錯誤狀態顏色
  success: string       // 成功狀態顏色
  warning: string       // 警告狀態顏色
}

export interface Theme {
  colors: ThemeColors
  spacing: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
    xxl: number
  }
  fontSize: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
    xxl: number
  }
  borderRadius: {
    sm: number
    md: number
    lg: number
    xl: number
    full: number
  }
  shadows: {
    sm: object
    md: object
    lg: object
  }
}