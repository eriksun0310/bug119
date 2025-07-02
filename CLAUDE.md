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
```
src/
├── app/                 # 應用程式層級配置
│   ├── navigation/     # React Navigation 設定
│   ├── providers/      # 全域 Provider
│   ├── store/         # Redux store 設定
│   └── App.tsx        # 應用程式入口
│
├── screens/            # 畫面層（原 pages）
│   ├── home/
│   ├── tasks/
│   ├── chat/
│   └── profile/
│
├── widgets/            # 組合元件層（畫面區塊）
│   ├── task-list/
│   ├── task-map/
│   ├── chat-room/
│   └── user-profile/
│
├── features/           # 功能層（業務邏輯）
│   ├── auth/
│   ├── create-task/
│   ├── accept-task/
│   ├── send-message/
│   └── submit-review/
│
├── entities/           # 實體層（業務實體）
│   ├── user/
│   ├── task/
│   ├── message/
│   ├── review/
│   └── transaction/
│
├── shared/             # 共用層
│   ├── api/           # API 客戶端
│   ├── ui/            # 基礎 UI 元件
│   ├── lib/           # 工具函式
│   ├── hooks/         # 自定義 hooks
│   ├── config/        # 設定檔
│   ├── mocks/         # 假資料
│   ├── theme/         # 主題系統（顏色、字體、間距）
│   └── types/         # TypeScript 型別定義
```

### 3. TypeScript 型別定義管理

#### 型別定義分類結構
```
src/shared/types/
├── api/                # API 相關型別
│   ├── auth.types.ts
│   ├── task.types.ts
│   ├── user.types.ts
│   ├── message.types.ts
│   └── index.ts
│
├── entities/           # 實體型別
│   ├── user.types.ts
│   ├── task.types.ts
│   ├── message.types.ts
│   └── index.ts
│
├── navigation/         # React Navigation 型別
│   ├── root-stack.types.ts
│   ├── bottom-tabs.types.ts
│   └── index.ts
│
├── ui/                 # UI 元件型別
│   ├── form.types.ts
│   ├── layout.types.ts
│   └── index.ts
│
├── common/             # 共用基礎型別
│   ├── pagination.types.ts
│   ├── response.types.ts
│   └── index.ts
│
└── index.ts            # 統一導出
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

#### 共用元件結構
```
src/shared/ui/
├── button/             # 按鈕元件（全域共用）
│   ├── Button.tsx
│   ├── Button.types.ts
│   ├── Button.styles.ts
│   └── index.ts
│
├── input/              # 輸入框元件（全域共用）
│   ├── Input.tsx
│   ├── Input.types.ts
│   ├── Input.styles.ts
│   └── index.ts
│
├── modal/              # 彈窗元件（全域共用）
│   ├── Modal.tsx
│   ├── Modal.types.ts
│   └── index.ts
│
├── card/               # 卡片元件（全域共用）
│   ├── Card.tsx
│   ├── Card.types.ts
│   └── index.ts
│
├── form/               # 表單相關元件（全域共用）
│   ├── FormField/
│   ├── FormLabel/
│   ├── FormError/
│   └── index.ts
│
├── layout/             # 布局元件（全域共用）
│   ├── Container/
│   ├── Row/
│   ├── Column/
│   └── index.ts
│
└── index.ts            # 統一導出所有全域共用元件
```

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

### 7. API 整合規範

#### API 客戶端配置
```typescript
// src/shared/api/base.ts
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

### 13. 開發流程
1. 先設計元件結構，遵循 FSD 架構
2. 定義 TypeScript 型別，並按功能分類
3. 撰寫全域共用元件（src/shared/ui/）
4. 設定導航結構
5. 實作業務邏輯（features）
6. 組合成畫面（screens）
7. 加入測試
8. 執行 lint 和 type-check

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
1. 所有回覆必須使用繁體中文
2. 避免重複程式碼，抽取共用元件
3. 遵循 Feature-Sliced Design 架構
4. TypeScript 型別按功能分類管理
5. `src/shared/ui/` 下的所有元件都是全域共用元件
6. 假資料集中在 `src/shared/mocks/` 管理
7. 樣式使用 StyleSheet.create 並遵循主題系統
8. 支援亮暗主題切換，所有元件必須使用主題系統的顏色

## 聯絡資訊
如有任何問題，請參考專案文件或聯繫技術負責人。