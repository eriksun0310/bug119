import React, { FC } from 'react'
import { TaskStatus } from '@/shared/types'
import { useTaskStatusActions } from './hooks'
import {
  ActionResultRenderer,
  PendingRenderer,
  PendingConfirmationRenderer,
  InProgressRenderer,
  PendingCompletionRenderer,
  CompletedRenderer,
  CancelledRenderer,
  EmptyStateRenderer,
} from './components'
import { TaskStatusRendererProps } from './TaskStatusRenderer.types'

/**
 * 任務狀態渲染器 (重構版)
 * 簡化為路由器模式，根據任務狀態和用戶角色路由到對應的渲染元件
 * 
 * 從 379行 簡化為 ~60行，遵循單一職責原則
 */
export const TaskStatusRenderer: FC<TaskStatusRendererProps> = (props) => {
  const { task } = props
  
  // 統一的操作邏輯
  const statusActions = useTaskStatusActions({
    onAcceptTask: props.onAcceptTask,
    onMarkCompleted: props.onMarkCompleted,
    onSelectTerminator: props.onSelectTerminator,
  })

  // 組合 props，傳遞給子元件
  const statusProps = {
    ...props,
    ...statusActions,
    actionHandlers: statusActions.actionHandlers,
  }

  // 優先處理操作結果UI（現在在 TaskDetailScreen 層級管理）
  if (statusActions.showActionResult) {
    return <ActionResultRenderer {...statusProps} />
  }

  // 狀態路由器 - 單一職責：根據狀態分發到對應元件
  switch (task.status) {
    case TaskStatus.PENDING:
      return <PendingRenderer {...statusProps} />
      
    case TaskStatus.PENDING_CONFIRMATION:
      return <PendingConfirmationRenderer {...statusProps} />
      
    case TaskStatus.IN_PROGRESS:
      return <InProgressRenderer {...statusProps} />
      
    case TaskStatus.PENDING_COMPLETION:
      return <PendingCompletionRenderer {...statusProps} />
      
    case TaskStatus.COMPLETED:
      return <CompletedRenderer {...statusProps} />
      
    case TaskStatus.CANCELLED:
      return <CancelledRenderer {...statusProps} />
      
    default:
      return <EmptyStateRenderer {...statusProps} />
  }
}