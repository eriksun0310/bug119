// SegmentedControl 共用元件

import React, { FC, cloneElement, isValidElement } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/shared/theme'
import { SegmentedControlProps } from './SegmentedControl.types'
import { createStyles } from './SegmentedControl.styles'

/**
 * 分段控制器元件
 * 用於在多個選項中進行單選操作
 */
export const SegmentedControl = <T = string>({
  options,
  value,
  onValueChange,
  disabled = false,
  fullWidth = true,
  style,
  ...props
}: SegmentedControlProps<T>) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  const handlePress = (optionValue: T) => {
    if (!disabled) {
      onValueChange(optionValue)
    }
  }

  return (
    <View 
      style={[
        styles.container,
        fullWidth && styles.fullWidth,
        style
      ]}
      {...props}
    >
      {options.map((option, index) => {
        const isActive = value === option.value
        const isDisabled = disabled || option.disabled
        const isLastItem = index === options.length - 1

        return (
          <TouchableOpacity
            key={String(option.value)}
            style={[
              styles.segment,
              !isLastItem && styles.segmentWithBorder,
              isActive && styles.segmentActive,
              isDisabled && styles.segmentDisabled,
            ]}
            onPress={() => handlePress(option.value)}
            disabled={isDisabled}
            activeOpacity={0.7}
          >
            {option.icon && (
              <View style={styles.segmentIcon}>
                {isValidElement(option.icon) ? 
                  cloneElement(option.icon, {
                    color: isActive ? theme.colors.primary : theme.colors.textSecondary,
                    ...(option.icon.props || {})
                  } as any) : 
                  typeof option.icon === 'function' ?
                    React.createElement(option.icon as React.ComponentType<any>, {
                      size: 16,
                      color: isActive ? theme.colors.primary : theme.colors.textSecondary
                    }) :
                    option.icon
                }
              </View>
            )}
            <Text
              style={[
                styles.segmentText,
                isActive && styles.segmentTextActive,
                isDisabled && styles.segmentTextDisabled,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}