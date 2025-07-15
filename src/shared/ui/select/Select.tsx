import React, { FC, useState } from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'
import { ChevronDown } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { SelectProps } from './Select.types'
import { createStyles } from './Select.styles'

/**
 * 選擇器元件
 * 提供下拉選擇功能，支援模態框顯示選項
 */
export const Select: FC<SelectProps> = ({
  label,
  value,
  placeholder = '請選擇',
  options,
  onSelect,
  error,
  disabled = false,
  style,
  ...props
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  const [modalVisible, setModalVisible] = useState(false)
  
  const selectedOption = options.find(option => option.value === value)
  const displayText = selectedOption ? selectedOption.label : placeholder
  
  const handleSelect = (optionValue: string) => {
    onSelect(optionValue)
    setModalVisible(false)
  }
  
  const handlePress = () => {
    if (!disabled) {
      setModalVisible(true)
    }
  }
  
  return (
    <>
      <View style={[styles.container, style]}>
        {label && <Text style={styles.label}>{label}</Text>}
        
        <TouchableOpacity
          style={[
            styles.selectButton,
            disabled && styles.disabledButton
          ]}
          onPress={handlePress}
          disabled={disabled}
          {...props}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[
              selectedOption ? styles.selectButtonText : styles.placeholderText
            ]}>
              {displayText}
            </Text>
            <ChevronDown 
              size={20} 
              color={disabled ? theme.colors.textSecondary : theme.colors.text} 
            />
          </View>
        </TouchableOpacity>
        
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      
      {/* 選擇模態框 */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{label || '請選擇'}</Text>
                
                <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
                  {options.map((option) => {
                    const isSelected = option.value === value
                    
                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={[
                          styles.option,
                          isSelected && styles.selectedOption
                        ]}
                        onPress={() => handleSelect(option.value)}
                      >
                        <Text style={[
                          styles.optionText,
                          isSelected && styles.selectedOptionText
                        ]}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
                
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>取消</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}