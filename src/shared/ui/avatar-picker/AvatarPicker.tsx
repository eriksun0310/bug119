// AvatarPicker 共用元件 - 頭像選擇器

import React, { FC } from 'react'
import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { User } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { AvatarPickerProps } from './AvatarPicker.types'
import { createStyles } from './AvatarPicker.styles'

/**
 * AvatarPicker 頭像選擇器元件
 * 支援從相簿選擇、拍照上傳頭像，跨平台相容
 */
export const AvatarPicker: FC<AvatarPickerProps> = ({
  avatarUri,
  onAvatarChange,
  variant = 'standalone',
  label,
  required = false,
  size,
  showChangeButton = true,
  changeButtonText,
  disabled = false,
}) => {
  const { theme } = useTheme()
  
  // 根據模式設定預設大小
  const actualSize = size || (variant === 'field' ? 50 : 80)
  
  const styles = createStyles(theme, actualSize, variant)

  // 處理更換頭像
  const handleChangeAvatar = () => {
    if (disabled) return

    if (Platform.OS === 'web') {
      // Web 平台直接選擇檔案
      pickImageFromWeb()
    } else {
      // 原生平台顯示選項
      Alert.alert(
        '選擇頭像',
        '請選擇頭像來源',
        [
          { text: '取消', style: 'cancel' },
          { text: '從相簿選擇', onPress: pickImageFromLibrary },
          { text: '拍照', onPress: takePhoto }
        ]
      )
    }
  }

  // Web 平台選擇圖片
  const pickImageFromWeb = () => {
    try {
      if (typeof document === 'undefined') {
        Alert.alert('不支援', '此功能不支援當前平台')
        return
      }
      
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.multiple = false
      
      input.onchange = (event: any) => {
        const file = event.target.files?.[0]
        if (file) {
          // 檢查檔案大小（限制為 5MB）
          if (file.size > 5 * 1024 * 1024) {
            Alert.alert('檔案過大', '請選擇小於 5MB 的圖片檔案')
            return
          }
          
          // 檢查檔案類型
          if (!file.type.startsWith('image/')) {
            Alert.alert('檔案類型錯誤', '請選擇圖片檔案')
            return
          }
          
          // 讀取檔案並設定為頭像
          const reader = new FileReader()
          reader.onload = (e) => {
            const result = e.target?.result as string
            if (result) {
              onAvatarChange(result)
            }
          }
          reader.readAsDataURL(file)
        }
      }
      
      input.click()
    } catch (error) {
      Alert.alert('錯誤', '選擇圖片時發生錯誤')
    }
  }

  // 從相簿選擇圖片
  const pickImageFromLibrary = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
      
      if (!permissionResult.granted) {
        Alert.alert('權限不足', '需要相簿存取權限才能選擇照片')
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })

      if (!result.canceled) {
        onAvatarChange(result.assets[0].uri)
      }
    } catch (error) {
      Alert.alert('錯誤', '選擇圖片時發生錯誤')
    }
  }

  // 拍照
  const takePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
      
      if (!permissionResult.granted) {
        Alert.alert('權限不足', '需要相機權限才能拍照')
        return
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })

      if (!result.canceled) {
        onAvatarChange(result.assets[0].uri)
      }
    } catch (error) {
      Alert.alert('錯誤', '拍照時發生錯誤')
    }
  }

  if (variant === 'field') {
    return (
      <View style={styles.fieldContainer}>
        {/* 標籤 */}
        {label && (
          <View style={styles.fieldLabelContainer}>
            <Text style={styles.fieldLabel}>{label}</Text>
            {required && <Text style={styles.fieldRequired}> *</Text>}
          </View>
        )}
        
        {/* 表單欄位內容 */}
        <TouchableOpacity 
          style={styles.fieldContent} 
          onPress={handleChangeAvatar}
          disabled={disabled}
        >
          {/* 頭像 */}
          <View style={styles.fieldAvatar}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            ) : (
              <User size={actualSize * 0.5} color={theme.colors.textSecondary} />
            )}
          </View>
          
          {/* 狀態文字 */}
          <View style={styles.fieldText}>
            <Text style={styles.fieldTitle}>
              {avatarUri ? '已選擇頭像' : '點擊選擇頭像'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  // Standalone 模式（原有設計）
  return (
    <View style={styles.standaloneContainer}>
      {/* 頭像顯示區 */}
      <TouchableOpacity 
        style={styles.standaloneAvatar} 
        onPress={handleChangeAvatar}
        disabled={disabled}
      >
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
        ) : (
          <User size={actualSize * 0.5} color={theme.colors.textSecondary} />
        )}
      </TouchableOpacity>

      {/* 更換按鈕 */}
      {showChangeButton && (
        <TouchableOpacity 
          style={[
            styles.changeButton,
            disabled && styles.changeButtonDisabled
          ]} 
          onPress={handleChangeAvatar}
          disabled={disabled}
        >
          <User size={16} color={theme.colors.secondary} style={styles.changeButtonIcon} />
          <Text style={styles.changeButtonText}>
            {changeButtonText || (Platform.OS === 'web' ? '選擇頭像' : '更換頭像')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}