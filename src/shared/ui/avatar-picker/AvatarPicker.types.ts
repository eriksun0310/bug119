// AvatarPicker 元件型別定義

export interface AvatarPickerProps {
  /**
   * 目前的頭像 URI
   */
  avatarUri?: string | null
  
  /**
   * 頭像變更時的回調函數
   */
  onAvatarChange: (uri: string | null) => void
  
  /**
   * 顯示模式
   * 'standalone' - 獨立顯示（預設）
   * 'field' - 表單欄位樣式
   * @default 'standalone'
   */
  variant?: 'standalone' | 'field'
  
  /**
   * 欄位標籤（僅在 field 模式使用）
   */
  label?: string
  
  /**
   * 是否為必填欄位（僅在 field 模式使用）
   * @default false
   */
  required?: boolean
  
  /**
   * 頭像大小（像素）
   * @default 80 (standalone), 60 (field)
   */
  size?: number
  
  /**
   * 是否顯示更換按鈕（僅在 standalone 模式使用）
   * @default true
   */
  showChangeButton?: boolean
  
  /**
   * 更換按鈕文字
   * 如果未提供，Web 平台顯示「選擇頭像」，其他平台顯示「更換頭像」
   */
  changeButtonText?: string
  
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
}