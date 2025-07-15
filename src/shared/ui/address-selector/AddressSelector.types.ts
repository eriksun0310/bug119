import { ViewProps } from 'react-native'

export interface AddressValue {
  city: string
  district: string
}

export interface AddressSelectorProps extends ViewProps {
  label?: string
  value: AddressValue
  onChange: (value: AddressValue) => void
  errors?: {
    city?: string
    district?: string
  }
  cityPlaceholder?: string
  districtPlaceholder?: string
  showQuickSet?: boolean // 是否顯示快速設定按鈕
}