import { useCallback } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ActionType, NavigationHandlers } from '../TaskStatusRenderer.types'

/**
 * 狀態導航邏輯 Hook
 * 統一處理操作完成後的導航邏輯
 */
export const useStatusNavigation = (
  navigation?: NativeStackNavigationProp<any>
): NavigationHandlers => {
  
  const navigateAfterAction = useCallback((actionType: ActionType) => {
    if (!navigation) return

    const tabMap: Record<ActionType, string> = {
      accept: 'pending_confirmation',
      complete: 'pending_completion',
      select: 'in_progress'
    }

    navigation.navigate('Main', {
      screen: 'TaskList',
      params: { initialTab: tabMap[actionType] }
    })
  }, [navigation])

  return {
    navigateAfterAction
  }
}