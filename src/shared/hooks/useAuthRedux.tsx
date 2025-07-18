// Redux 版本的認證 Hook

import { useAppSelector, useAppDispatch } from '@/shared/store/hooks'
import { 
  setLoading, 
  setError, 
  loginSuccess, 
  logout as logoutAction,
  clearError 
} from '@/shared/store/slices/authSlice'
import { User } from '@/shared/types'
import { testCredentials } from '@/shared/mocks'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useAuthRedux = () => {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth)

  // 載入用戶資料
  const loadUser = async () => {
    dispatch(setLoading(true))
    try {
      const userData = await AsyncStorage.getItem('user')
      if (userData) {
        const user: User = JSON.parse(userData)
        dispatch(loginSuccess(user))
      }
    } catch (error) {
      dispatch(setError('載入用戶資料失敗'))
      console.error('載入用戶資料失敗:', error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  // 登入
  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch(setLoading(true))
    dispatch(clearError())
    
    try {
      // 檢查測試帳號
      const testAccount = Object.values(testCredentials).find(
        account => account.email === email && account.password === password
      )

      if (testAccount) {
        dispatch(loginSuccess(testAccount.user))
        await AsyncStorage.setItem('user', JSON.stringify(testAccount.user))
        return true
      }

      dispatch(setError('帳號或密碼錯誤'))
      return false
    } catch (error) {
      dispatch(setError('登入失敗，請稍後再試'))
      console.error('登入失敗:', error)
      return false
    } finally {
      dispatch(setLoading(false))
    }
  }

  // 登出
  const logout = async () => {
    dispatch(setLoading(true))
    try {
      dispatch(logoutAction())
      await AsyncStorage.removeItem('user')
    } catch (error) {
      dispatch(setError('登出失敗'))
      console.error('登出失敗:', error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading: loading,
    error,
    login,
    logout,
    loadUser,
    clearError: () => dispatch(clearError()),
  }
}