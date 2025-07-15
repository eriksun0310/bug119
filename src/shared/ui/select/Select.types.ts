import { TouchableOpacityProps } from 'react-native'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps extends Omit<TouchableOpacityProps, 'onPress'> {
  label?: string
  value?: string
  placeholder?: string
  options: SelectOption[]
  onSelect: (value: string) => void
  error?: string
  disabled?: boolean
}