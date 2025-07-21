// 任務牆畫面 - 蟲蟲終結者專用

import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { 
  Search, 
  Filter, 
  Bell
} from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { useAuthRedux, useTasksRedux, useResponsive, useTaskActions } from '@/shared/hooks'
import { TaskCard, Input, FilterModal } from '@/shared/ui'
import { ScreenHeader } from '@/shared/ui/screen-header'
import { 
  getPestTypeDisplayName
} from '@/shared/mocks'
import { Task, RootStackParamList } from '@/shared/types'
import { FilterModalFilters } from '@/shared/ui/filter-modal/FilterModal.types'
import { createStyles } from './TaskWallScreen.styles'

type TaskWallNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskDetail'>

export const TaskWallScreen = () => {
  const { theme } = useTheme()
  const { user } = useAuthRedux()
  const { 
    availableTasks, 
    tasksLoading, 
    tasksError, 
    loadTasks 
  } = useTasksRedux()
  const { isTablet, screenWidth } = useResponsive()
  const navigation = useNavigation<TaskWallNavigationProp>()
  const insets = useSafeAreaInsets()
  const { handleAcceptTask: acceptTask } = useTaskActions()
  // 統一的表單狀態管理
  const [formState, setFormState] = useState({
    searchQuery: '',
    selectedFilters: {
      pestType: null,
      priority: null,
      isImmediate: false,
      location: { city: '', district: '' },
    } as FilterModalFilters,
    showFilterModal: false,
  })

  // 統一的狀態更新函數
  const updateFormState = (field: keyof typeof formState, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }))
  }
  
  // 載入任務資料
  useEffect(() => {
    loadTasks()
  }, [loadTasks])
  
  // 設定定期重新整理（每30秒）
  useEffect(() => {
    const interval = setInterval(() => {
      loadTasks()
    }, 30000) // 每30秒重新載入一次
    
    return () => clearInterval(interval)
  }, [loadTasks])
  
  // 篩選任務
  const filteredTasks = (availableTasks || []).filter(task => {
    // 搜尋篩選
    if (formState.searchQuery) {
      const query = formState.searchQuery.toLowerCase()
      const matchesSearch = 
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.location.city.toLowerCase().includes(query) ||
        task.location.district.toLowerCase().includes(query) ||
        getPestTypeDisplayName(task.pestType).includes(query)
      if (!matchesSearch) return false
    }
    
    // 害蟲類型篩選
    if (formState.selectedFilters.pestType && task.pestType !== formState.selectedFilters.pestType) {
      return false
    }
    
    // 優先程度篩選
    if (formState.selectedFilters.priority && task.priority !== formState.selectedFilters.priority) {
      return false
    }
    
    // 立即處理篩選
    if (formState.selectedFilters.isImmediate && !task.isImmediate) {
      return false
    }
    
    // 地址篩選
    if (formState.selectedFilters.location.city && task.location.city !== formState.selectedFilters.location.city) {
      return false
    }
    
    if (formState.selectedFilters.location.district && task.location.district !== formState.selectedFilters.location.district) {
      return false
    }
    
    return true
  })
  
  // 處理接案
  const handleAcceptTask = (task: Task) => {
    // 使用 useTaskActions Hook 的接案功能
    acceptTask(task.id, () => {
      // 接案成功後重新載入任務資料 - 不顯示 Alert，讓用戶導航到任務詳情看結果
      loadTasks()
    })
  }
  
  // 處理任務詳情
  const handleTaskPress = (task: Task) => {
    // 導航到任務詳情頁面
    navigation.navigate('TaskDetail', { taskId: task.id })
  }
  
  // 處理重新整理
  const handleRefresh = async () => {
    await loadTasks()
  }
  
  // 清除篩選
  const clearFilters = () => {
    updateFormState('selectedFilters', {
      pestType: null,
      priority: null,
      isImmediate: false,
      location: { city: '', district: '' },
    })
    updateFormState('searchQuery', '')
  }
  
  // 處理通知按鈕點擊
  const handleNotificationPress = () => {
    navigation.navigate('Notifications')
  }
  
  // 處理篩選按鈕點擊
  const handleFilterPress = () => {
    updateFormState('showFilterModal', true)
  }
  
  // 應用篩選
  const applyFilters = (filters: FilterModalFilters) => {
    updateFormState('selectedFilters', filters)
  }
  
  // 重置篩選
  const resetFilters = () => {
    updateFormState('selectedFilters', {
      pestType: null,
      priority: null,
      isImmediate: false,
      location: { city: '', district: '' },
    })
  }
  
  const styles = createStyles(theme, isTablet, screenWidth, insets)
  
  return (
    <View style={styles.container}>
      {/* 標題和控制區 */}
      <ScreenHeader
        title="任務牆"
        showBackButton={false}
        leftActions={
          <TouchableOpacity 
            onPress={handleFilterPress}
          >
            <Filter size={24} color={
              (formState.selectedFilters.pestType || 
               formState.selectedFilters.priority || 
               formState.selectedFilters.isImmediate ||
               formState.selectedFilters.location.city ||
               formState.selectedFilters.location.district) 
                ? theme.colors.secondary 
                : theme.colors.text
            } />
          </TouchableOpacity>
        }
        rightActions={
          <TouchableOpacity onPress={handleNotificationPress}>
            <Bell size={24} color={theme.colors.text} />
          </TouchableOpacity>
        }
      />
      
      {/* 搜尋和篩選區 */}
      <View style={styles.searchAndFilterContainer}>
        {/* 搜尋框 */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="搜尋任務、地點或害蟲類型..."
            value={formState.searchQuery}
            onChangeText={(text) => updateFormState('searchQuery', text)}
            leftIcon={<Search size={20} color={theme.colors.textSecondary} />}
          />
        </View>
        
        {/* 清除篩選 */}
        {(formState.searchQuery || 
          formState.selectedFilters.pestType || 
          formState.selectedFilters.priority || 
          formState.selectedFilters.isImmediate ||
          formState.selectedFilters.location.city ||
          formState.selectedFilters.location.district) && (
          <View style={styles.clearFilterRow}>
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.clearFiltersButton}>清除篩選</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {/* 任務列表 */}
      <View style={styles.content}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.taskListContainer}
          refreshControl={
            <RefreshControl
              refreshing={tasksLoading === 'loading'}
              onRefresh={handleRefresh}
              colors={[theme.colors.secondary]}
              tintColor={theme.colors.secondary}
            />
          }
        >
          <View style={styles.taskList}>
            {tasksError ? (
              <View style={styles.emptyState}>
                <Search size={48} color={theme.colors.error} />
                <Text style={styles.emptyStateText}>載入任務失敗</Text>
                <Text style={styles.emptyStateSubtext}>{tasksError}</Text>
              </View>
            ) : filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onPress={handleTaskPress}
                  onAccept={handleAcceptTask}
                  currentUserRole={user?.role}
                  style={styles.taskCardHorizontal}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Search size={48} color={theme.colors.textSecondary} />
                <Text style={styles.emptyStateText}>
                  {formState.searchQuery || Object.values(formState.selectedFilters).some(Boolean)
                    ? '沒有符合條件的任務'
                    : '目前沒有可接的任務\n請稍後再查看'
                  }
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      
      {/* 篩選模態框 */}
      <FilterModal 
        visible={formState.showFilterModal}
        filters={formState.selectedFilters}
        onApply={applyFilters}
        onReset={resetFilters}
        onClose={() => updateFormState('showFilterModal', false)}
      />
    </View>
  )
}

