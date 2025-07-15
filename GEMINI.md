# Bug 119 專案開發指南

## 專案概述
Bug 119 是一個幫助怕蟲人士（小怕星）媒合附近除蟲專家（蟲蟲終結者）的即時任務平台 App。

## 重要開發原則

### 1. 語言要求
- **所有回覆必須使用繁體中文**
- 程式碼註解使用繁體中文
- 錯誤訊息使用繁體中文
- 文件撰寫使用繁體中文

### 2. 程式碼架構原則

#### 避免重複程式碼
- 相同功能必須抽出為共用元件
- 重複的邏輯抽取為自定義 hooks
- 共用的樣式使用 StyleSheet.create 並抽取為主題系統
- API 呼叫邏輯集中管理

#### 前端架構 - Feature-Sliced Design (FSD) for React Native
**重要：只建立實際需要的資料夾，避免空資料夾**

目前專案實際結構：
```
src/
├── app/                 # 應用程式層級配置
│   └── navigation/     # React Navigation 設定
│
├── screens/            # 畫面層
│   ├── auth/          # 認證相關畫面
│   ├── create-task/   # 建立任務
│   ├── edit-profile/  # 編輯個人資料
│   ├── home/          # 首頁
│   ├── loading/       # 載入頁面
│   ├── message-detail/# 訊息詳細
│   ├── messages/      # 訊息列表
│   ├── my-tasks/      # 我的任務
│   ├── notifications/ # 通知
│   ├── profile/       # 個人資料
│   ├── splash/        # 啟動畫面
│   ├── task-detail/   # 任務詳細
│   ├── task-wall/     # 任務牆
│   └── tasks/         # 任務列表
│
└── shared/             # 共用層
    ├── config/        # 統一配置檔案
    ├── hooks/         # 自定義 hooks
    ├── mocks/         # 假資料
    ├── theme/         # 主題系統
    ├── types/         # TypeScript 型別定義
    │   ├── common/    # 共用型別
    │   ├── entities/  # 實體型別
    │   └── navigation/# 導航型別
    ├── ui/            # 基礎 UI 元件
    │   ├── budget-selector/
    │   ├── button/
    │   ├── card/
    │   ├── gender-selector/
    │   ├── input/
    │   ├── message-item/
    │   ├── pest-selector/
    │   ├── priority-selector/
    │   ├── segmented-control/
    │   └── task-card/
    └── utils/         # 工具函式
```

**未來擴展原則**：
- 只有在實際需要功能時才建立 `features/`、`entities/`、`widgets/` 等資料夾
- 每個新資料夾必須包含實際檔案，不允許空資料夾
- 遵循「有功能才建資料夾」的原則

### 3. TypeScript 型別定義管理

#### 型別定義分類結構
目前實際結構（只建立有實際檔案的資料夾）：
```
src/shared/types/
├── common/             # 共用基礎型別
│   └── index.ts       # 包含 Gender、LoadingState、AsyncState 等
│
├── entities/           # 實體型別
│   ├── task.types.ts  # 任務相關型別
│   ├── user.types.ts  # 用戶相關型別
│   └── index.ts       # 統一導出
│
├── navigation/         # React Navigation 型別
│   ├── index.ts       # 導航型別定義
│   └── stack.types.ts # Stack 導航型別
│
└── index.ts            # 統一導出所有型別
```

**未來擴展型別結構**（僅在需要時建立）：
```
src/shared/types/
├── api/                # API 相關型別（未來需要時建立）
├── ui/                 # UI 元件型別（未來需要時建立）
└── ...                 # 其他型別（按需建立）
```

#### React Navigation 型別定義範例
```typescript
// src/shared/types/navigation/root-stack.types.ts
export type RootStackParamList = {
  Splash: undefined
  Auth: undefined
  Main: undefined
  TaskDetail: { taskId: string }
  Chat: { conversationId: string }
}

// src/shared/types/navigation/bottom-tabs.types.ts
export type MainTabParamList = {
  Home: undefined
  Tasks: undefined
  Messages: undefined
  Profile: undefined
}
```

### 4. 共用元件管理（React Native）

#### 元件分類原則
- **全域共用元件**：放在 `src/shared/ui/` 下，這些元件在整個應用程式中都可使用
- **功能特定元件**：放在各自的 feature 或 widget 目錄下
- **所有在 `src/shared/ui/` 下的元件都視為全域共用元件**

#### 目前共用元件結構
實際存在的元件（按功能建立）：
```
src/shared/ui/
├── budget-selector/    # 預算選擇器
│   ├── BudgetSelector.tsx
│   ├── BudgetSelector.types.ts
│   └── index.ts
│
├── button/             # 按鈕元件
│   ├── Button.tsx
│   ├── Button.types.ts
│   └── index.ts
│
├── card/               # 卡片元件
│   ├── Card.tsx
│   ├── Card.types.ts
│   └── index.ts
│
├── gender-selector/    # 性別選擇器
│   ├── GenderSelector.tsx
│   └── index.ts
│
├── input/              # 輸入框元件
│   ├── Input.tsx
│   ├── Input.types.ts
│   └── index.ts
│
├── message-item/       # 訊息項目元件
│   ├── MessageItem.tsx
│   ├── MessageItem.types.ts
│   └── index.ts
│
├── pest-selector/      # 害蟲類型選擇器
│   ├── PestSelector.tsx
│   ├── PestSelector.types.ts
│   └── index.ts
│
├── priority-selector/  # 優先程度選擇器
│   ├── PrioritySelector.tsx
│   ├── PrioritySelector.types.ts
│   └── index.ts
│
├── segmented-control/  # 分段控制器
│   ├── SegmentedControl.tsx
│   ├── SegmentedControl.types.ts
│   └── index.ts
│
├── task-card/          # 任務卡片元件
│   ├── TaskCard.tsx
│   ├── TaskCard.types.ts
│   └── index.ts
│
├── SwipeableRow.tsx    # 滑動行元件
│
└── index.ts            # 統一導出所有全域共用元件
```

**新增元件原則**：
- 只有在實際需要該元件時才建立對應資料夾
- 避免建立空的 form/、layout/ 等預設資料夾
- 每個元件資料夾必須包含實際的元件檔案

#### React Native 共用元件範例
```tsx
// src/shared/ui/button/Button.types.ts
import { TouchableOpacityProps } from 'react-native'

export interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
  children: React.ReactNode
  onPress?: () => void
}
```

```tsx
// src/shared/ui/button/Button.tsx
import React, { FC } from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { ButtonProps } from './Button.types'
import { styles } from './Button.styles'

/**
 * 全域共用按鈕元件
 * 可在任何畫面或功能中使用
 */
export const Button: FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  onPress,
  ...props 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled
      ]}
      disabled={disabled || loading}
      onPress={onPress}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <Text style={[styles.text, styles[`text${variant}`]]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  )
}
```

```tsx
// src/shared/ui/button/Button.styles.ts
import { StyleSheet } from 'react-native'
import { theme } from '@/shared/theme'

export const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  danger: {
    backgroundColor: theme.colors.danger,
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  textprimary: {
    color: '#FFFFFF',
  },
  textsecondary: {
    color: '#000000',
  },
  textdanger: {
    color: '#FFFFFF',
  },
})
```

### 5. 主題系統管理

#### 主題切換功能
- 支援亮色主題（Light Mode）和暗色主題（Dark Mode）
- 亮色主題：白色為主色，黑色為輔色
- 暗色主題：黑色為主色，白色為輔色
- 主題設定需持久化儲存在 AsyncStorage

#### 主題結構設計
```typescript
// src/shared/theme/types.ts
export type ThemeMode = 'light' | 'dark'

export interface ThemeColors {
  primary: string        // 主要顏色（按鈕、重點元素）
  secondary: string      // 次要顏色
  background: string     // 背景顏色
  surface: string        // 卡片、元件表面顏色
  text: string          // 主要文字顏色
  textSecondary: string // 次要文字顏色
  border: string        // 邊框顏色
  error: string         // 錯誤狀態顏色
  success: string       // 成功狀態顏色
  warning: string       // 警告狀態顏色
}

export interface Theme {
  colors: ThemeColors
  spacing: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
  fontSize: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
  borderRadius: {
    sm: number
    md: number
    lg: number
    full: number
  }
}
```

```typescript
// src/shared/theme/themes.ts
import { Theme } from './types'

export const lightTheme: Theme = {
  colors: {
    primary: '#FFFFFF',      // 白色主色
    secondary: '#000000',    // 黑色輔色
    background: '#FFFFFF',   // 白色背景
    surface: '#F5F5F5',      // 淺灰色表面
    text: '#000000',         // 黑色文字
    textSecondary: '#666666', // 灰色次要文字
    border: '#E0E0E0',       // 淺灰邊框
    error: '#FF3B30',        // 紅色錯誤
    success: '#34C759',      // 綠色成功
    warning: '#FF9500',      // 橘色警告
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
}

export const darkTheme: Theme = {
  colors: {
    primary: '#000000',      // 黑色主色
    secondary: '#FFFFFF',    // 白色輔色
    background: '#000000',   // 黑色背景
    surface: '#1C1C1E',      // 深灰色表面
    text: '#FFFFFF',         // 白色文字
    textSecondary: '#8E8E93', // 灰色次要文字
    border: '#38383A',       // 深灰邊框
    error: '#FF453A',        // 紅色錯誤
    success: '#32D74B',      // 綠色成功
    warning: '#FF9F0A',      // 橘色警告
  },
  spacing: lightTheme.spacing,      // 間距保持一致
  fontSize: lightTheme.fontSize,    // 字體大小保持一致
  borderRadius: lightTheme.borderRadius, // 圓角保持一致
}
```

#### 主題 Context 實作
```typescript
// src/shared/theme/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Theme, ThemeMode } from './types'
import { lightTheme, darkTheme } from './themes'

interface ThemeContextType {
  theme: Theme
  themeMode: ThemeMode
  toggleTheme: () => void
  setThemeMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light')

  useEffect(() => {
    // 載入儲存的主題設定
    loadThemeMode()
  }, [])

  const loadThemeMode = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('themeMode')
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeModeState(savedTheme)
      }
    } catch (error) {
      console.error('載入主題失敗:', error)
    }
  }

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem('themeMode', mode)
      setThemeModeState(mode)
    } catch (error) {
      console.error('儲存主題失敗:', error)
    }
  }

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(newMode)
  }

  const theme = themeMode === 'light' ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme 必須在 ThemeProvider 內使用')
  }
  return context
}
```

#### 主題化元件範例
```tsx
// src/shared/ui/button/Button.styles.ts
import { StyleSheet } from 'react-native'
import { Theme } from '@/shared/theme/types'

export const createStyles = (theme: Theme) => StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  danger: {
    backgroundColor: theme.colors.error,
  },
  // ... 其他樣式
  text: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
  },
  textPrimary: {
    color: theme.colors.secondary, // 主按鈕文字使用輔色
  },
  textSecondary: {
    color: theme.colors.primary, // 次按鈕文字使用主色
  },
  textDanger: {
    color: '#FFFFFF',
  },
})
```

```tsx
// src/shared/ui/button/Button.tsx - 更新版
import React, { FC } from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { useTheme } from '@/shared/theme'
import { ButtonProps } from './Button.types'
import { createStyles } from './Button.styles'

export const Button: FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  onPress,
  ...props 
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  
  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled
      ]}
      disabled={disabled || loading}
      onPress={onPress}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? theme.colors.primary : theme.colors.secondary} />
      ) : (
        <Text style={[styles.text, styles[`text${variant.charAt(0).toUpperCase() + variant.slice(1)}`]]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  )
}
```

### 6. 假資料管理
所有假資料必須集中在 `src/shared/mocks/` 目錄下：

```typescript
// src/shared/mocks/users.mock.ts
import { User, UserRole } from '@/shared/types'

export const mockUsers: User[] = [
  {
    id: '1',
    name: '張小明',
    email: 'xiaoming@example.com',
    role: UserRole.FEAR_STAR,
    avatar: 'https://example.com/avatar1.jpg',
    // ...
  }
]
```

### 7. API 整合規範（未來實作）

**注意：目前專案使用假資料，API 客戶端待後端開發完成後建立**

#### 未來 API 客戶端配置範例
```typescript
// 未來建立：src/shared/api/base.ts
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 自動附加 token
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### 8. 導航管理
```tsx
// src/app/navigation/RootNavigator.tsx
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/shared/types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
```

### 9. 狀態管理
- 使用 Redux Toolkit 進行全域狀態管理
- 使用 React Query (TanStack Query) 進行伺服器狀態管理
- 本地狀態優先使用 React hooks
- 持久化儲存使用 AsyncStorage

#### 表單狀態管理原則
**重要：絕對不允許分開定義多個 useState**

❌ **錯誤寫法**：
```typescript
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [phone, setPhone] = useState('')
// ... 更多個別狀態
```

✅ **正確寫法**：
```typescript
// 表單狀態必須用物件統一管理
const [form, setForm] = useState({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  line: '',
  telegram: '',
  preferredMethod: ContactMethod.PHONE
})

// 錯誤狀態也用物件管理
const [errors, setErrors] = useState<Partial<typeof form>>({})

// 統一的更新函數
const updateForm = (field: keyof typeof form, value: any) => {
  setForm(prev => ({ ...prev, [field]: value }))
}

// 或使用解構更新
const handleInputChange = (field: keyof typeof form) => (value: string) => {
  setForm(prev => ({ ...prev, [field]: value }))
}
```

**表單驗證範例**：
```typescript
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
  
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}
```

**使用方式**：
```typescript
<Input
  label="姓名"
  value={form.name}
  onChangeText={handleInputChange('name')}
  error={errors.name}
/>
```

### 10. 套件管理器
本專案使用 **pnpm** 作為套件管理器：
```bash
pnpm install        # 安裝依賴套件
pnpm add <package>  # 新增套件
pnpm dev           # 開發模式
pnpm build         # 建置專案
```

### 11. 測試要求
執行測試指令：
```bash
pnpm test        # 單元測試
pnpm test:e2e    # E2E 測試 (使用 Detox)
pnpm lint        # ESLint 檢查
pnpm type-check  # TypeScript 型別檢查
```

### 12. Expo 特定配置
```json
// app.json
{
  "expo": {
    "name": "Bug 119",
    "slug": "bug119",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#000000"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.bug119.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#000000"
      },
      "package": "com.bug119.app"
    }
  }
}
```

### 13. 程式碼品質與複雜度管理

#### 檔案複雜度限制
**重要：嚴格控制檔案複雜度，確保程式碼可讀性和可維護性**

✅ **檔案行數限制**：
- **單一檔案最多 300 行**（包含 import、註解、空行）
- **函數最多 50 行**（複雜邏輯必須拆分）
- **元件最多 200 行**（超過則必須拆分為子元件）

❌ **禁止的複雜度模式**：
- 超過 300 行的單一檔案
- 超過 50 行的函數
- 內聯定義複雜的渲染函數（如 `renderApplicantCard`）
- 在主元件中定義大型的模態框或子元件

#### 強制性元件抽取規則
**重要：以下情況必須抽取為共用元件**

✅ **必須抽取的情況**：
- **重複程式碼超過 20 行**
- **相同邏輯在 2 個以上檔案中出現**
- **內聯渲染函數超過 30 行**
- **相同的 UI 模式在多處使用**

✅ **抽取時機**：
```typescript
// ❌ 錯誤：內聯複雜渲染函數
const renderApplicantCard = (assignment: TaskAssignment) => {
  // 50+ 行的複雜邏輯
  return (
    <View>
      {/* 複雜的 UI 結構 */}
    </View>
  )
}

// ✅ 正確：抽取為共用元件
import { ApplicantCard } from '@/shared/ui'

// 在元件中使用
<ApplicantCard 
  assignment={assignment} 
  onSelect={handleSelect}
/>
```

#### 重複程式碼識別標準
**重要：主動識別並消除重複程式碼**

✅ **需要抽取的重複模式**：
- **相同的表單處理邏輯**
- **相同的樣式定義**
- **相同的資料處理函數**
- **相同的 Hook 使用模式**

✅ **抽取方式**：
```typescript
// ❌ 錯誤：重複的表單處理
// 在多個檔案中重複
const handleInputChange = (field: keyof typeof form) => (value: string) => {
  setForm(prev => ({ ...prev, [field]: value }))
  if (errors[field]) {
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }
}

// ✅ 正確：抽取為共用 Hook
import { useFormValidation } from '@/shared/hooks'

const { form, errors, handleInputChange, validateForm } = useFormValidation(
  initialValues,
  validationRules
)
```

#### 程式碼組織規範
**重要：保持程式碼結構清晰**

✅ **檔案結構標準**：
```typescript
// 1. Imports（按順序）
import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@/shared/theme'
import { Button } from '@/shared/ui'
import { UserRole } from '@/shared/types'

// 2. 型別定義（僅限此檔案）
interface LocalProps {
  // ...
}

// 3. 主要元件
export const MyComponent: FC<LocalProps> = ({ ... }) => {
  // 3a. Hook 使用
  const { theme } = useTheme()
  const navigation = useNavigation()
  
  // 3b. 狀態定義
  const [loading, setLoading] = useState(false)
  
  // 3c. 事件處理函數（最多 20 行）
  const handlePress = () => {
    // 簡單邏輯
  }
  
  // 3d. 複雜邏輯（必須抽取為 Hook 或工具函數）
  const complexLogic = useComplexLogic()
  
  // 3e. 樣式定義
  const styles = createStyles(theme)
  
  // 3f. 渲染
  return (
    <View>
      {/* 簡潔的 JSX */}
    </View>
  )
}

// 4. 樣式定義
const createStyles = (theme: Theme) => StyleSheet.create({
  // 最多 50 行樣式
})
```

#### 重構檢查清單
**重要：開發過程中必須遵循的檢查項目**

✅ **每次提交前檢查**：
- [ ] 檔案行數是否超過 300 行
- [ ] 是否有重複的程式碼模式
- [ ] 是否有超過 50 行的函數
- [ ] 是否有未使用的 import
- [ ] 是否有內聯的複雜渲染函數
- [ ] 是否有可以抽取的共用邏輯

✅ **重構優先順序**：
1. **高優先級**：重複程式碼超過 20 行
2. **中優先級**：檔案行數超過 250 行
3. **低優先級**：函數行數超過 30 行

#### 資料夾管理
**重要：基於實際功能需求建立資料夾，避免空資料夾**

✅ **正確做法**：
- 只有在實際需要該功能時才建立對應資料夾
- 定期清理未使用的空資料夾
- 遵循 Feature-Sliced Design，但僅建立有實際功能的層級

❌ **錯誤做法**：
- 預先建立一堆空的功能資料夾
- 保留沒有檔案的空資料夾
- 建立過度複雜的資料夾結構

#### Import 語句管理
**重要：保持 import 語句整潔，移除未使用的 import**

✅ **正確做法**：
```typescript
// 只導入實際使用的項目
import { Plus } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { Button, Input } from '@/shared/ui'

// 合併同來源的 import
import { User, Bell, Settings } from 'lucide-react-native'
```

❌ **錯誤做法**：
```typescript
// 導入未使用的項目
import { Plus, Bug, Shield, Star } from 'lucide-react-native' // Bug, Shield, Star 未使用
import { useTheme } from '@/shared/theme'
import { Button, Input } from '@/shared/ui'

// 分開寫同來源的 import
import { User } from 'lucide-react-native'
import { Bell } from 'lucide-react-native'
import { Settings } from 'lucide-react-native'
```

#### Import 順序規範
```typescript
// 1. React 相關
import React, { useState, useEffect } from 'react'

// 2. 第三方套件 (React Native)
import { View, Text, StyleSheet } from 'react-native'

// 3. 第三方套件 (其他)
import { useNavigation } from '@react-navigation/native'

// 4. 內部套件 (hooks, utils, ui)
import { useTheme } from '@/shared/theme'
import { useAuth } from '@/shared/hooks'
import { Button, Input } from '@/shared/ui'

// 5. 類型定義
import { UserRole, RootStackParamList } from '@/shared/types'

// 6. 類型定義 (僅限於此檔案)
type LocalType = ...
```

### 14. 開發流程
1. **需求分析** - 確認實際需要的功能
2. **設計元件結構** - 遵循 FSD 架構，按需建立資料夾
3. **定義 TypeScript 型別** - 按功能分類管理
4. **撰寫共用元件** - 放在 src/shared/ui/（僅建立實際需要的）
5. **設定導航結構** - 配置實際使用的畫面
6. **實作畫面功能** - 在 screens/ 中實作具體功能
7. **統一配置管理** - 所有選項配置放在 options.config.ts
8. **表單狀態管理** - 使用統一的物件管理表單狀態
9. **加入測試** - 確保功能正確性
10. **執行 lint 和 type-check** - 確保程式碼品質
11. **清理未使用的 import 和空資料夾** - 保持程式碼整潔

## 技術棧
- **前端框架**: React Native + Expo SDK 50+
- **程式語言**: TypeScript 5+
- **導航**: React Navigation 6
- **狀態管理**: Redux Toolkit + React Query (TanStack Query)
- **UI 元件**: 自定義元件 + React Native Elements
- **樣式系統**: StyleSheet + 主題系統
- **即時通訊**: Socket.io-client
- **地圖服務**: React Native Maps (Expo)
- **推送通知**: Expo Push Notifications
- **後端框架**: ASP.NET Core (.NET 9+)
- **資料庫**: PostgreSQL + Redis
- **即時通訊**: SignalR

## 重要提醒
1. **語言要求** - 所有回覆必須使用繁體中文
2. **程式碼整潔** - 避免重複程式碼，抽取共用元件
3. **架構原則** - 遵循 Feature-Sliced Design，但只建立實際需要的資料夾
4. **型別管理** - TypeScript 型別按功能分類管理
5. **元件管理** - `src/shared/ui/` 下的所有元件都是全域共用元件
6. **配置統一** - 所有選項配置集中在 `src/shared/config/options.config.ts`
7. **表單狀態** - 絕對不允許分開定義多個 useState，必須用物件統一管理
8. **假資料管理** - 集中在 `src/shared/mocks/` 管理
9. **樣式系統** - 使用 StyleSheet.create 並遵循主題系統
10. **主題支援** - 支援亮暗主題切換，所有元件必須使用主題系統的顏色
11. **Import 管理** - 保持 import 語句整潔，移除未使用的 import，遵循標準順序
12. **資料夾管理** - 基於實際功能需求建立資料夾，定期清理空資料夾
13. **程式碼複雜度** - 單一檔案最多 300 行，函數最多 50 行，強制抽取重複程式碼
14. **元件抽取** - 重複程式碼超過 20 行必須抽取，內聯渲染函數超過 30 行必須抽取
15. **重構檢查** - 每次提交前必須檢查檔案複雜度、重複程式碼、未使用 import

## 聯絡資訊
如有任何問題，請參考專案文件或聯繫技術負責人。