# useFormValidation Hook 使用指南

## 概述

`useFormValidation` Hook 是專案中統一的表單狀態管理和驗證解決方案。它提供了一致的表單處理方式，減少重複程式碼，並提供強大的驗證功能。

## 核心功能

- ✅ 統一的表單狀態管理
- ✅ 自動驗證和錯誤處理
- ✅ 支援多種驗證規則
- ✅ 自動清除錯誤訊息
- ✅ 型別安全的表單處理

## 基本用法

### 1. 導入必要的檔案

```typescript
import { useFormValidation } from '@/shared/hooks/useFormValidation'
import { loginValidationRules } from '@/shared/config/validation.config'
```

### 2. 在元件中使用

```typescript
const {
  form,
  errors,
  setForm,
  handleInputChange,
  validateForm,
  clearErrors,
  resetForm
} = useFormValidation(
  {
    email: '',
    password: ''
  },
  loginValidationRules
)
```

### 3. 在 JSX 中使用

```typescript
<Input
  label="電子信箱"
  value={form.email}
  onChangeText={handleInputChange('email')}
  error={errors.email}
/>

<Input
  label="密碼"
  value={form.password}
  onChangeText={handleInputChange('password')}
  error={errors.password}
/>

<Button
  onPress={() => {
    if (validateForm()) {
      // 提交表單
    }
  }}
>
  提交
</Button>
```

## 驗證規則配置

### 內建驗證規則

```typescript
export const loginValidationRules: ValidationRules<LoginForm> = {
  email: {
    required: true,
    pattern: validationPatterns.email,
    message: validationMessages.email
  },
  password: {
    required: true,
    minLength: 6,
    message: validationMessages.password
  }
}
```

### 支援的驗證選項

- `required`: 必填欄位
- `pattern`: 正則表達式驗證
- `minLength`: 最小長度
- `maxLength`: 最大長度
- `custom`: 自定義驗證函數
- `message`: 自定義錯誤訊息

### 自定義驗證範例

```typescript
const validationRules = {
  confirmPassword: {
    required: true,
    custom: (value, form) => {
      if (value !== form?.password) {
        return '密碼與確認密碼不相符'
      }
    }
  }
}
```

## 已配置的驗證規則

專案中已經預設了以下驗證規則：

- `loginValidationRules` - 登入表單
- `registerValidationRules` - 註冊表單  
- `createTaskValidationRules` - 建立任務表單
- `editProfileValidationRules` - 編輯個人資料表單

## 條件式驗證

對於需要根據其他欄位值進行驗證的情況，可以建立自訂驗證函數：

```typescript
const validateFormWithContactMethod = (): boolean => {
  // 先進行基本驗證
  if (!validateForm()) {
    return false
  }
  
  // 根據偏好聯絡方式驗證對應欄位
  if (form.preferredMethod === ContactMethod.PHONE && !form.phone.trim()) {
    return false
  }
  
  return true
}
```

## 常見使用模式

### 1. 簡單表單

```typescript
const LoginForm = () => {
  const { form, errors, handleInputChange, validateForm } = useFormValidation(
    { email: '', password: '' },
    loginValidationRules
  )
  
  const handleSubmit = () => {
    if (validateForm()) {
      // 提交邏輯
    }
  }
  
  return (
    <View>
      <Input
        value={form.email}
        onChangeText={handleInputChange('email')}
        error={errors.email}
      />
      <Button onPress={handleSubmit}>提交</Button>
    </View>
  )
}
```

### 2. 複雜表單（含複合物件）

```typescript
const ProfileForm = () => {
  const { form, errors, setForm, handleInputChange, validateForm } = useFormValidation(
    {
      name: '',
      email: '',
      city: '',
      district: '',
      preferredMethod: ContactMethod.PHONE
    },
    profileValidationRules
  )
  
  // 為 AddressSelector 建立複合物件
  const locationValue = {
    city: form.city,
    district: form.district
  }
  
  return (
    <View>
      <Input
        value={form.name}
        onChangeText={handleInputChange('name')}
        error={errors.name}
      />
      
      <AddressSelector
        value={locationValue}
        onChange={(location) => {
          setForm({ ...form, city: location.city, district: location.district })
        }}
        errors={{ city: errors.city, district: errors.district }}
      />
      
      <SegmentedControl
        value={form.preferredMethod}
        onValueChange={handleInputChange('preferredMethod')}
      />
    </View>
  )
}
```

## 最佳實踐

### 1. 表單狀態管理

❌ **錯誤做法**：
```typescript
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
```

✅ **正確做法**：
```typescript
const { form, handleInputChange } = useFormValidation({
  name: '',
  email: '',
  password: ''
}, validationRules)
```

### 2. 驗證規則配置

❌ **錯誤做法**：
```typescript
// 在元件中寫驗證邏輯
const validateForm = () => {
  if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
    // 驗證邏輯
  }
}
```

✅ **正確做法**：
```typescript
// 在 validation.config.ts 中定義
const validationRules = {
  email: {
    required: true,
    pattern: validationPatterns.email,
    message: validationMessages.email
  }
}
```

### 3. 錯誤訊息處理

❌ **錯誤做法**：
```typescript
error={errors.email ? '請輸入有效的電子郵件' : undefined}
```

✅ **正確做法**：
```typescript
error={errors.email} // 自動使用配置的錯誤訊息
```

## 故障排除

### 常見問題

1. **型別錯誤**：確保驗證規則的型別與表單初始值型別一致
2. **AddressSelector 錯誤**：確保傳遞正確的 `value` 物件格式
3. **條件式驗證**：使用自訂驗證函數處理複雜的驗證邏輯

### 除錯技巧

```typescript
// 檢查表單狀態
console.log('表單狀態:', form)
console.log('驗證錯誤:', errors)

// 檢查驗證結果
const isValid = validateForm()
console.log('驗證結果:', isValid)
```

## 未來擴展

目前 `useFormValidation` Hook 已經支援大部分常見的表單驗證需求。未來可以考慮添加：

- 異步驗證支援
- 更多內建驗證規則
- 表單提交狀態管理
- 更好的錯誤訊息國際化支援

## 總結

`useFormValidation` Hook 提供了一個強大、一致且型別安全的表單管理解決方案。通過使用這個 Hook，可以：

- 減少重複的表單處理程式碼
- 提供一致的用戶體驗
- 確保型別安全
- 簡化表單驗證邏輯
- 提高程式碼可維護性

建議所有新的表單都使用這個 Hook，並逐步將現有表單遷移到這個統一的解決方案上。