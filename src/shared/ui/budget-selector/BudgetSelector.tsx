// 預算範圍選擇器元件

import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { DollarSign } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { Input } from '@/shared/ui'
import { BudgetSelectorProps } from './BudgetSelector.types'

/**
 * 預算範圍選擇器
 * 直接輸入最低和最高預算
 */
export const BudgetSelector: FC<BudgetSelectorProps> = ({
  value,
  onChange,
  error,
  label = '預算範圍'
}) => {
  const { theme } = useTheme()
  
  const handleMinChange = (text: string) => {
    const min = parseInt(text) || 0
    onChange({ min, max: value?.max || 0 })
  }
  
  const handleMaxChange = (text: string) => {
    const max = parseInt(text) || 0
    onChange({ min: value?.min || 0, max })
  }
  
  const styles = {
    container: {
      marginBottom: theme.spacing.sm,
    },
    label: {
      fontSize: theme.fontSize.sm,
      fontWeight: '500' as const,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    inputsContainer: {
      flexDirection: 'row' as const,
      gap: theme.spacing.sm,
      alignItems: 'center' as const,
    },
    inputWrapper: {
      flex: 1,
    },
    separator: {
      fontSize: theme.fontSize.lg,
      color: theme.colors.textSecondary,
      paddingHorizontal: theme.spacing.xs,
    },
    errorText: {
      fontSize: theme.fontSize.xs,
      color: theme.colors.error,
      marginTop: theme.spacing.xs,
    },
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      {/* 預算輸入框 */}
      <View style={styles.inputsContainer}>
        <View style={styles.inputWrapper}>
          <Input
            label="最低預算"
            value={value?.min?.toString() || ''}
            onChangeText={handleMinChange}
            placeholder="0"
            keyboardType="numeric"
            leftIcon={<DollarSign size={16} color={theme.colors.textSecondary} />}
          />
        </View>
        <Text style={styles.separator}>-</Text>
        <View style={styles.inputWrapper}>
          <Input
            label="最高預算"
            value={value?.max?.toString() || ''}
            onChangeText={handleMaxChange}
            placeholder="0"
            keyboardType="numeric"
            leftIcon={<DollarSign size={16} color={theme.colors.textSecondary} />}
          />
        </View>
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  )
}