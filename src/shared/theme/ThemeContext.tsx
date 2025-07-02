// 主題 Context 實作

import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Theme, ThemeMode } from './types'
import { lightTheme, darkTheme } from './themes'

interface ThemeContextType {
  theme: Theme
  themeMode: ThemeMode
  toggleTheme: () => void
  setThemeMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light')

  useEffect(() => {
    // 載入儲存的主題設定
    loadThemeMode()
  }, [])

  const loadThemeMode = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('themeMode')
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeModeState(savedTheme)
      }
    } catch (error) {
      console.error('載入主題失敗:', error)
    }
  }

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem('themeMode', mode)
      setThemeModeState(mode)
    } catch (error) {
      console.error('儲存主題失敗:', error)
    }
  }

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(newMode)
  }

  const theme = themeMode === 'light' ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme 必須在 ThemeProvider 內使用')
  }
  return context
}