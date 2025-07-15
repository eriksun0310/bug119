// 任務牆畫面 - 蟲蟲終結者專用

import React, { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  RefreshControl,
  Alert,
  Modal,
  Dimensions
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
import { useAuth, useResponsive } from '@/shared/hooks'
import { TaskCard, Input, FilterModal, ScreenHeader } from '@/shared/ui'
import { 
  getAvailableTasks, 
  getPestTypeDisplayName
} from '@/shared/mocks'
import { Task, PestType, TaskPriority, RootStackParamList } from '@/shared/types'
import { FilterModalFilters } from '@/shared/ui/filter-modal/FilterModal.types'
import { 
  TASK_WALL_PEST_FILTER_OPTIONS, 
  TASK_WALL_PRIORITY_FILTER_OPTIONS 
} from '@/shared/config/options.config'

type TaskWallNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TaskDetail'>

export const TaskWallScreen = () => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const { isTablet } = useResponsive()
  const navigation = useNavigation<TaskWallNavigationProp>()
  const insets = useSafeAreaInsets()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<FilterModalFilters>({
    pestType: null,
    priority: null,
    isImmediate: false,
  })
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  
  // 取得螢幕寬度
  const screenWidth = Dimensions.get('window').width
  
  // 取得可接的任務
  const availableTasks = getAvailableTasks()
  
  // 篩選任務
  const filteredTasks = availableTasks.filter(task => {
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
    Alert.alert(
      '確認接案',
      `您確定要接受「${task.title}」這個任務嗎？`,
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '接案', 
          onPress: () => {
            // 這裡實際會呼叫 API
            Alert.alert('成功', '已成功接案！接下來請與客戶聯繫確認詳細資訊。')
          }
        }
      ]
    )
  }
  
  // 處理任務詳情
  const handleTaskPress = (task: Task) => {
    // 導航到任務詳情頁面
    navigation.navigate('TaskDetail', { taskId: task.id })
  }
  
  // 處理重新整理
  const handleRefresh = () => {
    setRefreshing(true)
    // 模擬重新載入資料
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
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
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.md,
      paddingTop: insets.top > 0 ? insets.top + theme.spacing.xs : theme.spacing.sm,
      paddingBottom: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing.sm,
    },
    title: {
      fontSize: theme.fontSize.xl,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
      flex: 1,
    },
    filterIconButton: {
      padding: theme.spacing.xs,
    },
    bellButton: {
      padding: theme.spacing.xs,
    },
    searchContainer: {
      marginBottom: theme.spacing.sm,
    },
    clearFilterRow: {
      alignItems: 'flex-end',
      marginBottom: theme.spacing.xs,
    },
    clearFiltersButton: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.secondary,
      fontWeight: '500',
    },
    content: {
      flex: 1,
    },
    scrollContainer: {
      flex: 1,
    },
    taskListContainer: {
      flexGrow: 1,
      alignItems: isTablet ? 'center' : 'stretch',
      paddingBottom: isTablet ? theme.spacing.md : 50, // 手機版添加底部 padding 避免被導航列遮住
    },
    taskList: {
      padding: theme.spacing.md,
      width: '100%',
      maxWidth: isTablet ? 1200 : undefined, // 電腦版放寬最大寬度
      flexDirection: 'row', // 橫向排列
      flexWrap: 'wrap', // 允許換行
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      gap: theme.spacing.md,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.xl,
    },
    emptyStateText: {
      fontSize: theme.fontSize.lg,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.spacing.md,
    },
    taskCardHorizontal: {
      width: screenWidth > 600 ? '48%' : '100%', // 寬螢幕每行顯示兩個卡片，窄螢幕每行一個
    },
  })
  
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
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[theme.colors.secondary]}
              tintColor={theme.colors.secondary}
            />
          }
        >
          <View style={styles.taskList}>
            {filteredTasks.length > 0 ? (
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

