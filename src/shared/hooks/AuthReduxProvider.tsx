// Redux 版本的認證 Provider

import React, { useEffect } from 'react'
import { useAuthRedux } from './useAuthRedux'

/**
 * Redux 版本的認證 Provider
 * 負責在應用程式啟動時載入用戶資料
 */
export const AuthReduxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loadUser } = useAuthRedux()

  useEffect(() => {
    // 應用程式啟動時載入儲存的用戶資料
    loadUser()
  }, [])

  return <>{children}</>
}