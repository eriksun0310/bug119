import React, { FC } from 'react'
import { TaskActionResult } from '@/shared/ui'
import { StatusRendererProps } from '../TaskStatusRenderer.types'
import { useStatusNavigation } from '../hooks/useStatusNavigation'

/**
 * 操作結果渲染器
 * 處理所有操作成功後的結果UI顯示
 */
export const ActionResultRenderer: FC<StatusRendererProps> = ({
  actionType = 'accept',
  setShowActionResult,
  navigation,
}) => {
  const { navigateAfterAction } = useStatusNavigation(navigation)

  const getResultConfig = () => {
    switch (actionType) {
      case 'select':
        return {
          type: 'accept' as const,
          message: '已成功選擇終結者',
          buttonText: '查看任務',
        }
      case 'accept':
        return {
          type: 'accept' as const,
          message: '已成功申請任務',
          buttonText: '查看任務',
        }
      case 'complete':
        return {
          type: 'complete' as const,
          message: '任務已標記完成',
          buttonText: '查看任務',
        }
      default:
        return {
          type: 'accept' as const,
          message: '操作成功',
          buttonText: '查看任務',
        }
    }
  }

  const config = getResultConfig()

  const handleViewTask = () => {
    setShowActionResult?.(false)
    navigateAfterAction(actionType)
  }

  return (
    <TaskActionResult
      type={config.type}
      message={config.message}
      buttonText={config.buttonText}
      onViewTask={handleViewTask}
    />
  )
}