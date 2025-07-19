# Bug 119 角色流程圖

## 小怕星 (Fear Star) 任務流程

```mermaid
flowchart TD
    Start([小怕星開始]) --> CreateTask[建立任務]
    CreateTask --> Stage1[階段1: PENDING<br/>發布中]
    
    Stage1 --> WaitApplicants{有終結者申請?}
    WaitApplicants -->|否| WaitApplicants
    WaitApplicants -->|是| Stage2[階段2: PENDING_CONFIRMATION<br/>待確認]
    
    Stage2 --> ViewApplicants[查看申請者資料<br/>- 完整個人資料]
    ViewApplicants --> SelectTerminator{選擇終結者?}
    SelectTerminator -->|否| ViewApplicants
    SelectTerminator -->|是| Stage3[階段3: IN_PROGRESS<br/>進行中]
    
    Stage3 --> ViewContactInfo[查看終結者聯絡資訊<br/>- 電話/Line]
    ViewContactInfo --> TaskCompleted{確認任務完成?}
    TaskCompleted -->|否| ViewContactInfo
    TaskCompleted -->|是| Stage4[階段4: PENDING_COMPLETION<br/>待完成確認]
    
    Stage4 --> WaitTerminatorConfirm{終結者確認完成?}
    WaitTerminatorConfirm -->|否| WaitingConfirmation[等待對方確認]
    WaitingConfirmation --> WaitTerminatorConfirm
    WaitTerminatorConfirm -->|是| Stage5[階段5: COMPLETED<br/>已完成]
    
    Stage5 --> End([任務結束])
```

## 蟲蟲終結者 (Terminator) 任務流程

```mermaid
flowchart TD
    Start([終結者開始]) --> BrowseTasks[瀏覽任務牆]
    BrowseTasks --> ViewTaskDetail[查看任務詳情<br/>- 任務資訊<br/>- 任務地點<br/>- 小怕星基本資料]
    
    ViewTaskDetail --> AcceptTask{接受任務?}
    AcceptTask -->|否| BrowseTasks
    AcceptTask -->|是| ApplyTask[申請任務]
    
    ApplyTask --> Stage2[階段2: PENDING_CONFIRMATION<br/>待確認]
    Stage2 --> WaitResult{等待結果}
    
    WaitResult -->|被選中| Stage3[階段3: IN_PROGRESS<br/>進行中]
    WaitResult -->|未被選中| BrowseTasks
    
    Stage3 --> ViewFearStarContact[查看小怕星聯絡資訊<br/>- 電話/Line]
    
    ViewFearStarContact --> ExecuteTask[執行除蟲任務]
    ExecuteTask --> TaskDone{任務完成?}
    TaskDone -->|否| ExecuteTask
    TaskDone -->|是| ConfirmComplete[點擊完成任務]
    
    ConfirmComplete --> Stage4[階段4: PENDING_COMPLETION<br/>待完成確認]
    Stage4 --> WaitFearStarConfirm{小怕星確認完成?}
    WaitFearStarConfirm -->|否| WaitingConfirmation[等待對方確認]
    WaitingConfirmation --> WaitFearStarConfirm
    WaitFearStarConfirm -->|是| Stage5[階段5: COMPLETED<br/>已完成]
    
    Stage5 --> End([任務結束])
```


## 重要權限控制

### 聯絡資訊可見性
- **PENDING**: 雙方都看不到對方聯絡資訊
- **PENDING_CONFIRMATION**: 雙方都看不到對方聯絡資訊
- **IN_PROGRESS**: 雙方都能看到完整聯絡資訊（電話/Line）
- **COMPLETED**: 聯絡資訊自動隱藏

### 個人資料可見性
- **PENDING**: 終結者只能看到小怕星基本資料
- **PENDING_CONFIRMATION**: 小怕星可查看申請者完整個人資料
- **IN_PROGRESS**: 雙方都能查看對方完整聯絡資訊
- **COMPLETED**: 恢復基本資料可見性

### 操作權限
- **小怕星**: 
  - 在 PENDING_CONFIRMATION 狀態可選擇終結者
  - 在 IN_PROGRESS 狀態可確認任務完成
- **終結者**: 
  - 在 PENDING 狀態可申請任務
  - 在 IN_PROGRESS 狀態可確認任務完成

### 完成確認機制
- 任務完成需要雙方都確認
- 任一方確認後，需等待對方也確認
- 只有雙方都確認後，任務才正式完成 (COMPLETED)






## 任務狀態變化流程圖

```mermaid
flowchart TD
    %% 定義樣式
    classDef pending fill:#FFE4B5,stroke:#FF8C00,stroke-width:2px,color:#000000
    classDef pendingConfirm fill:#F0E68C,stroke:#DAA520,stroke-width:2px,color:#000000
    classDef inProgress fill:#87CEEB,stroke:#4682B4,stroke-width:2px,color:#000000
    classDef pendingCompletion fill:#DDA0DD,stroke:#9370DB,stroke-width:2px,color:#000000
    classDef completed fill:#90EE90,stroke:#228B22,stroke-width:2px,color:#000000
    
    %% 開始
    Start([任務建立]) --> PENDING
    
    %% PENDING 狀態
    PENDING[["PENDING<br/>發布中"]]:::pending
    
    PENDING -->|終結者申請任務| PENDING_CONFIRMATION
    
    %% PENDING_CONFIRMATION 狀態
    PENDING_CONFIRMATION[["PENDING_CONFIRMATION<br/>待確認"]]:::pendingConfirm
    
    PENDING_CONFIRMATION -->|小怕星選擇終結者| IN_PROGRESS
    
    %% IN_PROGRESS 狀態
    IN_PROGRESS[["IN_PROGRESS<br/>進行中"]]:::inProgress
    
    IN_PROGRESS -->|任一方確認完成| PENDING_COMPLETION
    
    %% PENDING_COMPLETION 狀態
    PENDING_COMPLETION[["PENDING_COMPLETION<br/>待完成確認"]]:::pendingCompletion
    
    PENDING_COMPLETION -->|另一方也確認| COMPLETED
    
    %% COMPLETED 狀態
    COMPLETED[["COMPLETED<br/>已完成"]]:::completed
    
    COMPLETED --> End([結束])
```

### 狀態說明

1. **PENDING（發布中）**
   - 初始狀態，任務剛被小怕星建立
   - 終結者可以申請任務

2. **PENDING_CONFIRMATION（待確認）**
   - 有終結者申請後進入此狀態
   - 小怕星可以選擇終結者

3. **IN_PROGRESS（進行中）**
   - 小怕星選擇終結者後進入此狀態
   - 雙方都可以確認任務完成

4. **PENDING_COMPLETION（待完成確認）**
   - 一方確認完成後進入此狀態
   - 等待另一方也確認完成

5. **COMPLETED（已完成）**
   - 雙方都確認完成後的最終狀態
   - 任務正式結束

