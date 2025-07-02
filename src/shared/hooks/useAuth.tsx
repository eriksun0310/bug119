// 認證相關 Hook

import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@/shared/types'
import { testCredentials } from '@/shared/mocks'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 載入儲存的用戶資料
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user')
      if (userData) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error('載入用戶資料失敗:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // 檢查測試帳號
      const testAccount = Object.values(testCredentials).find(
        account => account.email === email && account.password === password
      )

      if (testAccount) {
        setUser(testAccount.user)
        await AsyncStorage.setItem('user', JSON.stringify(testAccount.user))
        return true
      }

      return false
    } catch (error) {
      console.error('登入失敗:', error)
      return false
    }
  }

  const logout = async () => {
    try {
      setUser(null)
      await AsyncStorage.removeItem('user')
    } catch (error) {
      console.error('登出失敗:', error)
    }
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth 必須在 AuthProvider 內使用')
  }
  return context
}