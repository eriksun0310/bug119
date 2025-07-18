// 害蟲類型選擇器元件

import React, { FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/shared/theme'
import { PestSelectorProps } from './PestSelector.types'
import { PEST_TYPE_OPTIONS } from '@/shared/config/options.config'
import { createStyles } from './PestSelector.styles'

/**
 * 害蟲類型選擇器
 * 提供視覺化的害蟲類型選擇介面
 */
export const PestSelector: FC<PestSelectorProps> = ({
  value,
  onChange,
  error,
  label = '害蟲類型',
  required = false
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.requiredStar}> *</Text>}
      </Text>
      
      <View style={styles.grid}>
        {PEST_TYPE_OPTIONS.map(pest => {
          const IconComponent = pest.icon
          const isSelected = value === pest.type
          
          return (
            <TouchableOpacity
              key={pest.type}
              style={[
                styles.pestItem,
                isSelected && styles.pestItemSelected
              ]}
              onPress={() => onChange(pest.type)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.iconContainer,
                isSelected && { backgroundColor: theme.colors.secondary + '20' }
              ]}>
                <IconComponent
                  size={20}
                  color={isSelected ? theme.colors.secondary : theme.colors.textSecondary}
                />
              </View>
              <Text style={styles.pestName}>{pest.name}</Text>
              <Text style={styles.pestDescription}>{pest.description}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  )
}