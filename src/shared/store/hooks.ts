// 型別安全的 Redux Hooks

import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// 型別安全的 useDispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>()

// 型別安全的 useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// 便捷的 Auth hooks
export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  
  return {
    ...auth,
    dispatch,
  }
}

// 便捷的 User hooks
export const useUser = () => {
  const user = useAppSelector((state) => state.auth.user)
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  
  return {
    user,
    isAuthenticated,
  }
}