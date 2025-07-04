// 編輯個人資料頁面

import React, { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Info,
  Save,
  MessageCircle
} from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { useAuth } from '@/shared/hooks'
import { Button, Input, SegmentedControl } from '@/shared/ui'
import { showAlert } from '@/shared/utils'
import { ContactMethod } from '@/shared/types'
import { CONTACT_METHOD_OPTIONS } from '@/shared/config/options.config'

export const EditProfileScreen = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const [loading, setLoading] = useState(false)
  
  // 表單狀態
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.contactInfo?.phone || '',
    line: user?.contactInfo?.line || '',
    location: '',
    bio: '',
    preferredMethod: user?.contactInfo?.preferredMethod || ContactMethod.PHONE,
  })
  
  const [errors, setErrors] = useState<Partial<typeof form>>({})
  
  // 表單驗證
  const validateForm = (): boolean => {
    const newErrors: Partial<typeof form> = {}
    
    if (!form.name.trim()) {
      newErrors.name = '請輸入姓名'
    }
    
    if (!form.email.trim()) {
      newErrors.email = '請輸入電子郵件'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = '請輸入有效的電子郵件'
    }
    
    // 根據選擇的聯絡方式驗證對應欄位
    if (form.preferredMethod === ContactMethod.PHONE) {
      if (!form.phone.trim()) {
        newErrors.phone = '請輸入手機號碼'
      } else if (!/^09\d{8}$/.test(form.phone)) {
        newErrors.phone = '請輸入有效的手機號碼'
      }
    }
    
    if (form.preferredMethod === ContactMethod.LINE) {
      if (!form.line.trim()) {
        newErrors.line = '請輸入 LINE ID'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // 處理儲存
  const handleSave = async () => {
    if (!validateForm()) {
      showAlert('表單有誤', '請檢查並修正錯誤')
      return
    }
    
    setLoading(true)
    
    try {
      // 模擬 API 呼叫
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      showAlert(
        '儲存成功',
        '您的個人資料已更新',
        [
          { 
            text: '確定', 
            onPress: () => navigation.goBack()
          }
        ]
      )
    } catch (error) {
      showAlert('儲存失敗', '請稍後再試')
    } finally {
      setLoading(false)
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.md,
      paddingTop: insets.top + theme.spacing.xs,
      paddingBottom: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      marginRight: theme.spacing.md,
    },
    headerTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      flex: 1,
    },
    saveButton: {
      padding: theme.spacing.xs,
    },
    content: {
      flex: 1,
    },
    form: {
      padding: theme.spacing.md,
      gap: theme.spacing.lg,
    },
    section: {
      gap: theme.spacing.md,
    },
    sectionTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    avatarSection: {
      alignItems: 'center',
      marginBottom: theme.spacing.xl,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing.md,
    },
    changeAvatarButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.secondary,
      borderRadius: theme.borderRadius.md,
    },
    changeAvatarText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.primary,
      marginLeft: theme.spacing.xs,
    },
    infoCard: {
      backgroundColor: theme.colors.secondary + '10',
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.md,
    },
    infoText: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      flex: 1,
      marginLeft: theme.spacing.sm,
      lineHeight: 20,
    },
    disabledInput: {
      opacity: 0.6,
    },
    genderNotice: {
      fontSize: theme.fontSize.xs,
      color: theme.colors.textSecondary,
      marginTop: theme.spacing.xs,
      fontStyle: 'italic',
    },
    roleInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: theme.spacing.md,
    },
    roleLabel: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginRight: theme.spacing.sm,
    },
    roleValue: {
      fontSize: theme.fontSize.md,
      fontWeight: '600',
      color: theme.colors.secondary,
    },
    contactHint: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.md,
      fontStyle: 'italic',
    },
    preferredMethodContainer: {
      marginTop: theme.spacing.md,
    },
    preferredMethodLabel: {
      fontSize: theme.fontSize.md,
      fontWeight: '500',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    inputLabel: {
      fontSize: theme.fontSize.sm,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    selectButton: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      height: 48,
      justifyContent: 'center',
      marginBottom: theme.spacing.md,
    },
    selectButtonText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
    },
  })
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* 標題列 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>編輯個人資料</Text>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
          disabled={loading}
        >
          <Save size={24} color={loading ? theme.colors.textSecondary : theme.colors.secondary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.form}>
          {/* 頭像區塊 */}
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <User size={40} color={theme.colors.textSecondary} />
            </View>
            <TouchableOpacity style={styles.changeAvatarButton}>
              <User size={16} color={theme.colors.primary} />
              <Text style={styles.changeAvatarText}>更換頭像</Text>
            </TouchableOpacity>
          </View>
          
          {/* 提示資訊 */}
          <View style={styles.infoCard}>
            <Info size={16} color={theme.colors.secondary} />
            <Text style={styles.infoText}>
              為保護用戶安全，註冊後無法修改性別資訊。如需修改其他重要資訊，可能需要進行身份驗證。
            </Text>
          </View>
          
          {/* 基本資訊 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>基本資訊</Text>
            
            {/* 角色顯示 */}
            <View style={styles.roleInfo}>
              <Text style={styles.roleLabel}>帳號類型：</Text>
              <Text style={styles.roleValue}>
                {user?.role === 'fear_star' ? '小怕星' : '蟲蟲終結者'}
              </Text>
            </View>
            
            <Input
              label="姓名"
              value={form.name}
              onChangeText={(name) => setForm({ ...form, name })}
              placeholder="請輸入您的姓名"
              error={errors.name}
              leftIcon={<User size={16} color={theme.colors.textSecondary} />}
            />
            
            <Input
              label="電子郵件"
              value={form.email}
              onChangeText={(email) => setForm({ ...form, email })}
              placeholder="請輸入電子郵件"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              leftIcon={<Mail size={16} color={theme.colors.textSecondary} />}
            />
            
            <Text style={styles.inputLabel}>居住縣市</Text>
            <TouchableOpacity 
              style={styles.selectButton}
              onPress={() => {
                // 簡單的示範，實際上可以開啟一個選擇器
                if (form.location === '台北市') {
                  setForm({ ...form, location: '新北市' })
                } else if (form.location === '新北市') {
                  setForm({ ...form, location: '桃園市' })
                } else {
                  setForm({ ...form, location: '台北市' })
                }
              }}
            >
              <Text style={styles.selectButtonText}>
                {form.location || '請選擇居住縣市'}
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* 聯絡方式 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>聯絡方式</Text>
            <Text style={styles.contactHint}>選擇您偏好的聯絡方式</Text>
            
            <View style={styles.preferredMethodContainer}>
              <Text style={styles.preferredMethodLabel}>聯絡方式：</Text>
              <SegmentedControl
                options={CONTACT_METHOD_OPTIONS}
                value={form.preferredMethod}
                onValueChange={(value: ContactMethod) => setForm({ ...form, preferredMethod: value })}
              />
            </View>
            
            {/* 根據選擇的聯絡方式顯示對應輸入框 */}
            {form.preferredMethod === ContactMethod.PHONE && (
              <Input
                label="手機號碼"
                value={form.phone}
                onChangeText={(phone) => setForm({ ...form, phone })}
                placeholder="請輸入手機號碼"
                keyboardType="phone-pad"
                error={errors.phone}
                leftIcon={<Phone size={16} color={theme.colors.textSecondary} />}
              />
            )}
            
            {form.preferredMethod === ContactMethod.LINE && (
              <Input
                label="LINE ID"
                value={form.line}
                onChangeText={(line) => setForm({ ...form, line })}
                placeholder="請輸入 LINE ID"
                error={errors.line}
                leftIcon={<MessageCircle size={16} color="#00B900" />}
              />
            )}
          </View>
          
          {/* 個人簡介 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>個人簡介</Text>
            
            <Input
              label={user?.role === 'terminator' ? '專業介紹' : '自我介紹'}
              value={form.bio}
              onChangeText={(bio) => setForm({ ...form, bio })}
              placeholder={
                user?.role === 'terminator' 
                  ? '介紹您的除蟲經驗、專長等...'
                  : '簡單介紹自己...'
              }
              multiline
              numberOfLines={4}
            />
          </View>
        </View>
      </ScrollView>
      
      {/* 底部按鈕 */}
      <View style={{ 
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
      }}>
        <Button
          variant="primary"
          loading={loading}
          onPress={handleSave}
          fullWidth
        >
          儲存變更
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
}