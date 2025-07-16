// 預算選擇器元件

import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { DollarSign } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { Input } from '@/shared/ui'
import { BudgetSelectorProps } from './BudgetSelector.types'

/**
 * 預算選擇器
 * 輸入單一預算金額
 */
export const BudgetSelector: FC<BudgetSelectorProps> = ({
  value,
  onChange,
  error,
  label = '預算'
}) => {
  const { theme } = useTheme()
  
  const handleChange = (text: string) => {
    const budget = parseInt(text) || 0
    onChange(budget)
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
      <Input
        value={value?.toString() || ''}
        onChangeText={handleChange}
        placeholder="請輸入預算金額"
        keyboardType="numeric"
        leftIcon={<DollarSign size={16} color={theme.colors.textSecondary} />}
      />
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  )
}