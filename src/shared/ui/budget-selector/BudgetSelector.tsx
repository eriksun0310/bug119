// 預算範圍選擇器元件

import React, { FC, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { DollarSign } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { Input } from '@/shared/ui'
import { BudgetSelectorProps, BudgetRange } from './BudgetSelector.types'

/**
 * 預算範圍選擇器
 * 提供預設範圍選擇和自定義輸入
 */
export const BudgetSelector: FC<BudgetSelectorProps> = ({
  value,
  onChange,
  error,
  label = '預算範圍'
}) => {
  const { theme } = useTheme()
  const [customMode, setCustomMode] = useState(false)
  
  const presetBudgets = [
    { min: 500, max: 1000, label: '$500 - $1,000' },
    { min: 1000, max: 2000, label: '$1,000 - $2,000' },
    { min: 2000, max: 3000, label: '$2,000 - $3,000' },
    { min: 3000, max: 5000, label: '$3,000 - $5,000' },
  ]
  
  const handlePresetSelect = (budget: BudgetRange) => {
    setCustomMode(false)
    onChange(budget)
  }
  
  const handleCustomToggle = () => {
    setCustomMode(!customMode)
    if (!customMode && value) {
      // 切換到自定義模式時保持當前值
    }
  }
  
  const handleMinChange = (text: string) => {
    const min = parseInt(text) || 0
    onChange({ min, max: value?.max || min })
  }
  
  const handleMaxChange = (text: string) => {
    const max = parseInt(text) || 0
    onChange({ min: value?.min || 0, max })
  }
  
  const isPresetSelected = (preset: BudgetRange) => {
    return value?.min === preset.min && value?.max === preset.max
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
    presetsContainer: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      gap: theme.spacing.sm,
      marginBottom: theme.spacing.md,
    },
    presetItem: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.sm,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center' as const,
    },
    presetItemSelected: {
      borderColor: theme.colors.secondary,
      backgroundColor: theme.colors.secondary + '10',
    },
    presetText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.text,
      fontWeight: '500' as const,
    },
    customToggle: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      padding: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      borderWidth: 1,
      borderColor: customMode ? theme.colors.secondary : theme.colors.border,
      marginBottom: theme.spacing.md,
    },
    customToggleText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.text,
      marginLeft: theme.spacing.xs,
      fontWeight: '500' as const,
    },
    customInputsContainer: {
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
      
      {/* 預設範圍選項 */}
      <View style={styles.presetsContainer}>
        {presetBudgets.map((preset, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.presetItem,
              isPresetSelected(preset) && !customMode && styles.presetItemSelected
            ]}
            onPress={() => handlePresetSelect(preset)}
            activeOpacity={0.7}
          >
            <Text style={styles.presetText}>{preset.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* 自定義範圍切換 */}
      <TouchableOpacity
        style={styles.customToggle}
        onPress={handleCustomToggle}
        activeOpacity={0.7}
      >
        <DollarSign size={16} color={theme.colors.text} />
        <Text style={styles.customToggleText}>自定義範圍</Text>
      </TouchableOpacity>
      
      {/* 自定義輸入框 */}
      {customMode && (
        <View style={styles.customInputsContainer}>
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
      )}
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  )
}