import {
  TASK_WALL_PEST_FILTER_OPTIONS,
  TASK_WALL_PRIORITY_FILTER_OPTIONS,
} from '@/shared/config/options.config'
import { useTheme } from '@/shared/theme'
import { PestType, TaskPriority } from '@/shared/types'
import { X } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { AddressSelector } from '../address-selector'
import { Select } from '../select'
import { createStyles } from './FilterModal.styles'
import { FilterModalProps } from './FilterModal.types'

/**
 * 篩選模態框共用元件
 * 用於任務篩選功能
 */
export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  filters,
  onApply,
  onReset,
  onClose,
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
      location: { city: '', district: '' },
    }
    setTempFilters(resetFilters)
    // 不關閉模態框，讓用戶可以繼續調整篩選條件
  }
  
  const handleResetAndClose = () => {
    const resetFilters = {
      pestType: null,
      priority: null,
      isImmediate: false,
      location: { city: '', district: '' },
    }
    setTempFilters(resetFilters)
    onReset()
    onClose()
  }
  
  const handleClearLocation = () => {
    setTempFilters({
      ...tempFilters,
      location: { city: '', district: '' }
    })
  }

  const handleApply = () => {
    onApply(tempFilters)
    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.modalContent} activeOpacity={1} onPress={() => {}}>
          {/* 標題列 */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>篩選條件</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView>
            {/* 地址篩選 */}
            <View style={styles.filterSection}>
              <View style={styles.filterSectionHeader}>
                <Text style={styles.filterSectionTitle}>地點篩選（可只選縣市接整個縣市的案子）</Text>
                {(tempFilters.location.city || tempFilters.location.district) && (
                  <TouchableOpacity onPress={handleClearLocation} style={styles.clearLocationButton}>
                    <Text style={styles.clearLocationText}>清除地址</Text>
                  </TouchableOpacity>
                )}
              </View>
              <AddressSelector
                label=""
                value={tempFilters.location}
                onChange={(location) => 
                  setTempFilters({ ...tempFilters, location })
                }
                cityPlaceholder="不限縣市"
                districtPlaceholder="不限區域"
                showQuickSet={false}
                required={false}
              />
            </View>

            {/* 害蟲類型 */}
            <View style={styles.filterSection}>
              <Select
                label="害蟲類型"
                value={tempFilters.pestType || ''}
                placeholder="不限害蟲類型"
                options={[
                  { value: '', label: '不限害蟲類型' },
                  ...TASK_WALL_PEST_FILTER_OPTIONS.map(pest => ({
                    value: pest.key,
                    label: pest.label
                  }))
                ]}
                onSelect={(value) =>
                  setTempFilters({
                    ...tempFilters,
                    pestType: value ? (value as PestType) : null,
                  })
                }
              />
            </View>

            {/* 緊急程度 */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>緊急程度</Text>
              <View style={styles.filterOptionsHorizontal}>
                {TASK_WALL_PRIORITY_FILTER_OPTIONS.map(priority => (
                  <TouchableOpacity
                    key={priority.key}
                    style={[
                      styles.filterOptionHorizontal,
                      tempFilters.priority === priority.key && styles.filterOptionActive,
                    ]}
                    onPress={() =>
                      setTempFilters({
                        ...tempFilters,
                        priority:
                          tempFilters.priority === priority.key
                            ? null
                            : (priority.key as TaskPriority),
                      })
                    }
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        tempFilters.priority === priority.key && styles.filterOptionTextActive,
                      ]}
                    >
                      {priority.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* 操作按鈕 */}
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.resetButton]}
              onPress={handleReset}
            >
              <Text style={[styles.actionButtonText, styles.resetButtonText]}>重置篩選</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.applyButton]}
              onPress={handleApply}
            >
              <Text style={[styles.actionButtonText, styles.applyButtonText]}>套用篩選</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}
