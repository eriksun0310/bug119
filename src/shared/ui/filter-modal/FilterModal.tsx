import React, { useState, useEffect } from 'react'
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView
} from 'react-native'
import { X } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { 
  TASK_WALL_PEST_FILTER_OPTIONS, 
  TASK_WALL_PRIORITY_FILTER_OPTIONS 
} from '@/shared/config/options.config'
import { PestType, TaskPriority } from '@/shared/types'
import { FilterModalProps } from './FilterModal.types'
import { createStyles } from './FilterModal.styles'

/**
 * 篩選模態框共用元件
 * 用於任務篩選功能
 */
export const FilterModal: React.FC<FilterModalProps> = ({ 
  visible, 
  filters, 
  onApply, 
  onReset, 
  onClose 
}) => {
  const { theme } = useTheme()
  const [tempFilters, setTempFilters] = useState(filters)
  
  // 同步外部篩選器狀態
  useEffect(() => {
    setTempFilters(filters)
  }, [filters])
  
  const styles = createStyles(theme)
  
  const handleReset = () => {
    const resetFilters = {
      pestType: null,
      priority: null,
      isImmediate: false,
    }
    setTempFilters(resetFilters)
    onReset()
    onClose()
  }

  const handleApply = () => {
    onApply(tempFilters)
    onClose()
  }
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity 
          style={styles.modalContent}
          activeOpacity={1}
          onPress={() => {}}
        >
          {/* 標題列 */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>篩選條件</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView>
            {/* 害蟲類型 */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>害蟲類型</Text>
              <View style={styles.filterOptions}>
                {TASK_WALL_PEST_FILTER_OPTIONS.map(pest => (
                  <TouchableOpacity
                    key={pest.key}
                    style={[
                      styles.filterOption,
                      tempFilters.pestType === pest.key && styles.filterOptionActive
                    ]}
                    onPress={() => setTempFilters({
                      ...tempFilters,
                      pestType: tempFilters.pestType === pest.key ? null : pest.key as PestType
                    })}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      tempFilters.pestType === pest.key && styles.filterOptionTextActive
                    ]}>
                      {pest.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* 優先程度 */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>優先程度</Text>
              <View style={styles.filterOptions}>
                {TASK_WALL_PRIORITY_FILTER_OPTIONS.map(priority => (
                  <TouchableOpacity
                    key={priority.key}
                    style={[
                      styles.filterOption,
                      tempFilters.priority === priority.key && styles.filterOptionActive
                    ]}
                    onPress={() => setTempFilters({
                      ...tempFilters,
                      priority: tempFilters.priority === priority.key ? null : priority.key as TaskPriority
                    })}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      tempFilters.priority === priority.key && styles.filterOptionTextActive
                    ]}>
                      {priority.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* 立即處理 */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>任務類型</Text>
              <View style={styles.filterOptions}>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    tempFilters.isImmediate && styles.filterOptionActive
                  ]}
                  onPress={() => setTempFilters({
                    ...tempFilters,
                    isImmediate: !tempFilters.isImmediate
                  })}
                >
                  <Text style={[
                    styles.filterOptionText,
                    tempFilters.isImmediate && styles.filterOptionTextActive
                  ]}>
                    只顯示緊急任務
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          
          {/* 操作按鈕 */}
          <View style={styles.modalActions}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.resetButton]}
              onPress={handleReset}
            >
              <Text style={[styles.actionButtonText, styles.resetButtonText]}>
                重置
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.applyButton]}
              onPress={handleApply}
            >
              <Text style={[styles.actionButtonText, styles.applyButtonText]}>
                套用
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}