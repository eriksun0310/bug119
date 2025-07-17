import React, { FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/shared/theme'
import { Select } from '../select'
import { AddressSelectorProps } from './AddressSelector.types'
import { createStyles } from './AddressSelector.styles'
import { 
  CITY_SELECT_OPTIONS, 
  getDistrictOptions 
} from '@/shared/config/options.config'

/**
 * 地址選擇元件
 * 統一處理縣市和區域的選擇功能
 */
export const AddressSelector: FC<AddressSelectorProps> = ({
  label = '地點資訊',
  value,
  onChange,
  errors,
  cityPlaceholder = '請選擇縣市',
  districtPlaceholder = '請選擇區域',
  showQuickSet = true,
  required = false,
  style,
  ...props
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  
  const handleCityChange = (city: string) => {
    onChange({
      city,
      district: '' // 選擇縣市時清空區域
    })
  }
  
  const handleDistrictChange = (district: string) => {
    onChange({
      ...value,
      district
    })
  }
  
  const handleQuickSet = (city: string, district: string) => {
    onChange({ city, district })
  }
  
  return (
    <View style={[styles.container, style]} {...props}>
      {label && (
        <Text style={styles.sectionTitle}>
          {label}
          {required && <Text style={(styles as any).requiredStar}> *</Text>}
        </Text>
      )}
      
      <View style={styles.locationRow}>
        <View style={styles.citySelect}>
          <Select
            // label=""
            value={value.city}
            placeholder={cityPlaceholder}
            options={CITY_SELECT_OPTIONS}
            onSelect={handleCityChange}
            error={errors?.city}
          />
        </View>
        
        <View style={styles.districtSelect}>
          <Select
            // label=""
            value={value.district}
            placeholder={districtPlaceholder}
            options={getDistrictOptions(value.city)}
            onSelect={handleDistrictChange}
            error={errors?.district}
            disabled={!value.city}
          />
        </View>
      </View>
      
      {showQuickSet && (
        <View style={styles.quickSetRow}>
          <TouchableOpacity 
            style={styles.quickSetButton}
            onPress={() => handleQuickSet('台北市', '大安區')}
          >
            <Text style={styles.quickSetText}>台北市 大安區</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickSetButton}
            onPress={() => handleQuickSet('新北市', '板橋區')}
          >
            <Text style={styles.quickSetText}>新北市 板橋區</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}