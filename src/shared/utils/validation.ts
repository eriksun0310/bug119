/**
 * 共用驗證規則和訊息
 */

// 驗證正則表達式
export const validationPatterns = {
  email: /\S+@\S+\.\S+/,
  phone: /^09\d{8}$/,
  lineId: /^[a-zA-Z0-9_.-]+$/,
  telegramUsername: /^@?[a-zA-Z0-9_]+$/,
  password: /^.{6,}$/, // 至少6個字元
}

// 驗證訊息模板
export const validationMessages = {
  required: (field: string) => `請輸入${field}`,
  email: '請輸入有效的電子郵件格式',
  phone: '請輸入有效的手機號碼格式 (09xxxxxxxx)',
  lineId: '請輸入有效的 LINE ID',
  telegramUsername: '請輸入有效的 Telegram 用戶名',
  password: '密碼至少需要 6 個字元',
  passwordMatch: '密碼與確認密碼不相符',
  minLength: (field: string, min: number) => `${field}至少需要 ${min} 個字元`,
  maxLength: (field: string, max: number) => `${field}不能超過 ${max} 個字元`,
}

// 欄位名稱對應
export const fieldLabels: Record<string, string> = {
  name: '姓名',
  email: '電子郵件',
  password: '密碼',
  confirmPassword: '確認密碼',
  phone: '手機號碼',
  line: 'LINE ID',
  telegram: 'Telegram',
  title: '標題',
  description: '描述',
  bio: '自我介紹',
  location: '地點',
  city: '城市',
  district: '區域',
}

// 獲取欄位標籤
export const getFieldLabel = (field: string): string => {
  return fieldLabels[field] || field
}