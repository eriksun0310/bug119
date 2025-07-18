// 任務牆畫面 - 蟲蟲終結者專用

import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl,
  Alert,
  Modal
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { 
  Search, 
  Filter, 
  Bell,
  X
} from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { useAuthRedux, useTasksRedux, useResponsive, useTaskActions } from '@/shared/hooks'
import { TaskCard, Input, FilterModal, ScreenHeader } from '@/shared/ui'
import { 
  getPestTypeDisplayName
} from '@/shared/mocks'
import { Task, PestType, TaskPriority, RootStackParamList } from '@/shared/types'
import { FilterModalFilters } from '@/shared/ui/filter-modal/FilterModal.types'
import { 
  TASK_WALL_PEST_FILTER_OPTIONS, 
  TASK_WALL_PRIORITY_FILTER_OPTIONS 
} from '@/shared/config/options.config'
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
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<FilterModalFilters>({
    pestType: null,
    priority: null,
    isImmediate: false,
  })
  const [showFilterModal, setShowFilterModal] = useState(false)
  
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
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch = 
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.location.city.toLowerCase().includes(query) ||
        task.location.district.toLowerCase().includes(query) ||
        getPestTypeDisplayName(task.pestType).includes(query)
      if (!matchesSearch) return false
    }
    
    // 害蟲類型篩選
    if (selectedFilters.pestType && task.pestType !== selectedFilters.pestType) {
      return false
    }
    
    // 優先程度篩選
    if (selectedFilters.priority && task.priority !== selectedFilters.priority) {
      return false
    }
    
    // 立即處理篩選
    if (selectedFilters.isImmediate && !task.isImmediate) {
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
    setSelectedFilters({
      pestType: null,
      priority: null,
      isImmediate: false,
    })
    setSearchQuery('')
  }
  
  // 處理通知按鈕點擊
  const handleNotificationPress = () => {
    navigation.navigate('Notifications')
  }
  
  // 處理篩選按鈕點擊
  const handleFilterPress = () => {
    setShowFilterModal(true)
  }
  
  // 應用篩選
  const applyFilters = (filters: FilterModalFilters) => {
    setSelectedFilters(filters)
  }
  
  // 重置篩選
  const resetFilters = () => {
    setSelectedFilters({
      pestType: null,
      priority: null,
      isImmediate: false,
    })
  }
  
  const styles = createStyles(theme, isTablet, screenWidth, insets)
  
  return (
    <View style={styles.container}>
      {/* 標題和控制區 */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <TouchableOpacity 
            style={styles.filterIconButton}
            onPress={handleFilterPress}
          >
            <Filter size={24} color={
              (selectedFilters.pestType || selectedFilters.priority || selectedFilters.isImmediate) 
                ? theme.colors.secondary 
                : theme.colors.text
            } />
          </TouchableOpacity>
          <Text style={styles.title}>任務牆</Text>
          <TouchableOpacity style={styles.bellButton} onPress={handleNotificationPress}>
            <Bell size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        
        {/* 搜尋框 */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="搜尋任務、地點或害蟲類型..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<Search size={20} color={theme.colors.textSecondary} />}
          />
        </View>
        
        {/* 清除篩選 */}
        {(searchQuery || selectedFilters.pestType || selectedFilters.priority || selectedFilters.isImmediate) && (
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
                  {searchQuery || Object.values(selectedFilters).some(Boolean)
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
        visible={showFilterModal}
        filters={selectedFilters}
        onApply={applyFilters}
        onReset={resetFilters}
        onClose={() => setShowFilterModal(false)}
      />
    </View>
  )
}

