// Redux 功能測試檔案

import { store } from './index'
import { loginSuccess, logout, setLoading } from './slices/authSlice'

// 測試 Redux store 是否正常運作
export const testReduxStore = () => {
  console.log('=== Redux Store 測試開始 ===')
  
  // 測試初始狀態
  console.log('初始狀態:', store.getState())
  
  // 測試 setLoading action
  store.dispatch(setLoading(true))
  console.log('載入中狀態:', store.getState().auth.loading)
  
  // 測試 loginSuccess action
  const testUser = {
    id: '1',
    name: '測試用戶',
    email: 'test@example.com',
    role: 'fear_star' as const,
    avatar: '',
    phone: '0912345678',
    contactMethod: 'phone' as const,
    createdAt: new Date(),
  }
  
  store.dispatch(loginSuccess(testUser))
  console.log('登入後狀態:', store.getState().auth)
  
  // 測試 logout action
  store.dispatch(logout())
  console.log('登出後狀態:', store.getState().auth)
  
  console.log('=== Redux Store 測試完成 ===')
  
  return true
}

// 如果直接運行此檔案，執行測試
if (require.main === module) {
  testReduxStore()
}