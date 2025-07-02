// 跨平台 Alert 工具

import { Alert, Platform } from 'react-native'

interface AlertButton {
  text: string
  style?: 'default' | 'cancel' | 'destructive'
  onPress?: () => void
}

/**
 * 跨平台的 Alert 實現
 * 網頁版使用 window.confirm 和 window.alert
 * 原生版使用 React Native 的 Alert
 */
export const showAlert = (
  title: string,
  message?: string,
  buttons?: AlertButton[]
) => {
  if (Platform.OS === 'web') {
    // 網頁版實現
    if (!buttons || buttons.length === 0) {
      // 簡單提示
      window.alert(`${title}${message ? '\n\n' + message : ''}`)
      return
    }
    
    if (buttons.length === 1) {
      // 單按鈕提示
      window.alert(`${title}${message ? '\n\n' + message : ''}`)
      buttons[0].onPress?.()
      return
    }
    
    // 確認對話框
    const confirmButton = buttons.find(b => b.style !== 'cancel')
    const cancelButton = buttons.find(b => b.style === 'cancel')
    
    const result = window.confirm(`${title}${message ? '\n\n' + message : ''}`)
    
    if (result && confirmButton) {
      confirmButton.onPress?.()
    } else if (!result && cancelButton) {
      cancelButton.onPress?.()
    }
  } else {
    // 原生版使用 React Native Alert
    Alert.alert(title, message, buttons)
  }
}