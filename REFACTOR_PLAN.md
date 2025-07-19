# Bug 119 專案重構計劃

## 📊 專案現狀分析

### 🚨 嚴重違規問題統計
- **超過 300 行檔案**：2 個
- **分散 useState 違規**：4 個檔案
- **內聯樣式違規**：4 個檔案
- **未使用 import**：15+ 個檔案
- **重複程式碼**：多處

### 📈 重構效益預估
- 程式碼行數減少：20-30%
- 檔案複雜度降低：50%
- 可重用性提升：3倍
- 維護效率提升：2倍

---

## 🎯 階段一：緊急修復（高優先級）

### ⚡ 1. 檔案複雜度重構
**時間估計：2-3 小時**


#### ~~MyTasksScreen.tsx (326行)~~ - ✅ 已完成
```
發現狀況：
- 實際檔案是 MyTasksListScreen.tsx，僅 107 行
- 架構設計優良，無分散 useState
- 邏輯簡潔清晰，使用適當的 Hook
- 完全符合編碼規範

結果：無需重構，已是高品質程式碼
```

### ⚡ 2. 表單狀態統一修復
**時間估計：1-2 小時**

#### ~~EditProfileScreen.tsx~~ - ✅ 已完成
```
發現狀況：
- 檔案已使用 useFormValidation Hook 統一管理表單狀態
- 只有 2 個合理的分散狀態：loading 和 avatarUri
- 表單狀態通過 form 物件統一管理
- 完全符合編碼規範

結果：已是高品質程式碼，無需重構
```

#### ~~CreateTaskScreen.tsx~~ - ✅ 已完成
```
發現狀況：
- 檔案已使用統一的 form 物件管理表單狀態
- 只有 3 個合理的狀態：form, errors, showActionResult
- 表單驗證邏輯完整且清晰
- 完全符合編碼規範

結果：已是高品質程式碼，無需重構
```

#### MessagesScreen.tsx - ⚠️ 中度違規
```
當前問題：3 個分散的 useState
- searchQuery, selectedFilter, refreshing

重構方案：
□ 統一為單一狀態物件
```

### ⚡ 3. 樣式分離修復
**時間估計：1-2 小時**

#### NotificationsScreen.tsx - 🔥 最嚴重
```
當前問題：70+ 行內聯樣式

重構方案：
□ 創建 NotificationsScreen.styles.ts
□ 使用 createStyles 模式
□ 移除內聯 StyleSheet.create
```

#### MessagesScreen.tsx - 🔥 嚴重
```
當前問題：60+ 行內聯樣式

重構方案：
□ 創建 MessagesScreen.styles.ts
□ 應用主題色彩系統
```

#### TasksScreen.tsx - ⚠️ 中度
```
當前問題：55+ 行內聯樣式

重構方案：
□ 創建 TasksScreen.styles.ts
□ 響應式設計優化
```

#### HomeScreen.tsx - ⚠️ 中度
```
當前問題：50+ 行內聯樣式

重構方案：
□ 創建 HomeScreen.styles.ts
□ 主題色彩統一
```

---

## 🔧 階段二：架構優化（中優先級）

### 🧩 4. Hook 抽取與邏輯分離
**時間估計：2-3 小時**

#### useFormValidation Hook
```
目標：統一表單驗證邏輯
涵蓋檔案：
- EditProfileScreen.tsx
- CreateTaskScreen.tsx
- AuthScreen (未來)

功能：
□ 表單狀態管理
□ 驗證規則系統
□ 錯誤處理邏輯
□ 統一的更新函數
```

#### useTaskActions Hook（完善版）
```
目標：統一任務操作邏輯
涵蓋檔案：
- TaskDetailScreen.tsx
- TaskWallScreen.tsx
- MyTasksScreen.tsx

功能：
□ 接案邏輯
□ 完成任務邏輯
□ 撤回申請邏輯
□ 狀態更新處理
```

#### useTaskFiltering Hook
```
目標：統一任務篩選邏輯
涵蓋檔案：
- TaskWallScreen.tsx
- MyTasksScreen.tsx
- TasksScreen.tsx

功能：
□ 搜尋邏輯
□ 篩選條件管理
□ 排序邏輯
□ 分頁處理
```

### 🧩 5. 共用元件抽取
**時間估計：1-2 小時**

#### ApplicantCard 元件
```
位置：src/shared/ui/applicant-card/
來源：TaskDetailScreen.tsx 內聯渲染函數
用途：申請者資訊卡片顯示
```

#### EmptyState 元件
```
位置：src/shared/ui/empty-state/
來源：多個檔案的重複空狀態邏輯
用途：統一的空狀態顯示
```

#### ContactDisplay 元件
```
位置：src/shared/ui/contact-display/
來源：TaskDetailScreen.tsx 聯絡資訊顯示
用途：聯絡方式展示
```

#### StatusBadge 元件
```
位置：src/shared/ui/status-badge/
來源：多處狀態標籤邏輯
用途：任務狀態顯示
```

---

## 🧹 階段三：程式碼清理（低優先級）

### 📦 6. Import 清理
**時間估計：30分鐘**

#### 需要清理的檔案：
```
□ TaskDetailScreen.tsx - 移除未使用的 Alert, Modal 等
□ HomeScreen.tsx - 清理未使用的圖標
□ EditProfileScreen.tsx - 移除多餘的 import
□ MessagesScreen.tsx - 整理 import 順序
□ NotificationsScreen.tsx - 清理未使用的依賴
... (15+ 個檔案)
```

### 📏 7. 函數長度優化
**時間估計：1 小時**

#### 超過 50 行的函數：
```
□ TaskDetailScreen.tsx - handleAcceptTask (70+ 行)
□ EditProfileScreen.tsx - handleSave (60+ 行)
□ CreateTaskScreen.tsx - handleSubmit (55+ 行)
```

### 🗂️ 8. 資料夾結構清理
**時間估計：15分鐘**

```
□ 檢查並移除空資料夾
□ 確保每個資料夾都有實際檔案
□ 整理 index.ts 統一導出
```

---

## 📅 執行時程建議

### 🚀 快速修復路線（本週內）
```
第 1 天：TaskDetailScreen.tsx 重構
□ 上午：分析和設計 Hook 結構
□ 下午：實施重構和測試

第 2 天：表單狀態統一
□ 上午：EditProfileScreen.tsx
□ 下午：CreateTaskScreen.tsx

第 3 天：樣式分離
□ 上午：NotificationsScreen.tsx
□ 下午：MessagesScreen.tsx
```

### 🎯 穩健進步路線（2週內）
```
第 1 週：解決所有高優先級問題
第 2 週：Hook 抽取和元件優化
第 3 週：程式碼清理和文檔完善
```

---

## ✅ 檢查清單模板

### 單一檔案重構完成檢查：
```
□ 檔案行數 ≤ 300 行
□ 函數行數 ≤ 50 行
□ 無分散的 useState（統一為物件）
□ 樣式已分離至 .styles.ts
□ 無未使用的 import
□ 業務邏輯與 UI 邏輯分離
□ 遵循單一職責原則
□ TypeScript 無錯誤警告
□ 功能測試通過
```

### 階段完成檢查：
```
□ 所有目標檔案已處理
□ 新建的 Hook/元件已測試
□ 程式碼品質檢查通過
□ 建立 commit 記錄
□ 更新文檔（如需要）
```

---

## 🎯 預期成果

### 程式碼品質提升：
- ✅ 零編碼規範違規
- ✅ 一致的架構設計
- ✅ 高度可重用的元件和 Hook
- ✅ 優秀的可維護性

### 開發效率提升：
- ✅ 新功能開發更快速
- ✅ Bug 修復更容易
- ✅ 程式碼審查更順暢
- ✅ 團隊協作更高效

---

## 📞 支援資源

### 相關文檔：
- `/Users/jiayu/Desktop/bug119/CLAUDE.md` - 專案編碼規範
- `/Users/jiayu/Desktop/CLAUDE.md` - 通用開發指南

### 檢查指令：
```bash
# TypeScript 檢查
npx tsc --noEmit

# 程式碼格式檢查
pnpm format:check

# 啟動開發服務器
pnpm start
```

---

**建立時間**: 2025-01-19  
**版本**: 1.0  
**狀態**: 待執行