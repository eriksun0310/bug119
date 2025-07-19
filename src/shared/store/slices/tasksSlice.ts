// Tasks Slice - 任務狀態管理

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { 
  Task, 
  TaskStatus, 
  TaskPriority, 
  PestType, 
  TaskApplication, 
  TaskAssignment 
} from '@/shared/types'
import { AsyncState, LoadingState } from '@/shared/types'

// 任務篩選參數介面
export interface TaskFilter {
  status?: TaskStatus[]
  priority?: TaskPriority[]
  pestType?: PestType[]
  city?: string
  district?: string
  minBudget?: number
  maxBudget?: number
  isImmediate?: boolean
  createdBy?: string // 用於篩選特定用戶創建的任務
  assignedTo?: string // 用於篩選特定終結者的任務
}

// 任務排序參數
export interface TaskSort {
  field: 'createdAt' | 'budget' | 'priority' | 'updatedAt'
  order: 'asc' | 'desc'
}

// 任務狀態介面
export interface TasksState {
  // 任務列表
  tasks: AsyncState<Task[]>
  
  // 目前查看的任務詳情
  currentTask: AsyncState<Task>
  
  // 任務申請列表
  applications: AsyncState<TaskApplication[]>
  
  // 任務指派列表
  assignments: AsyncState<TaskAssignment[]>
  
  // 篩選與排序設定
  filter: TaskFilter
  sort: TaskSort
  
  // 創建任務狀態
  createTask: {
    loading: LoadingState
    error: string | null
  }
  
  // 任務操作狀態
  operations: {
    completeTask: AsyncState<string> // 完成任務
    selectTerminator: AsyncState<string> // 選擇終結者
  }
}

// 初始狀態
const initialState: TasksState = {
  tasks: {
    data: [],
    loading: 'idle',
    error: null,
  },
  currentTask: {
    data: null,
    loading: 'idle',
    error: null,
  },
  applications: {
    data: [],
    loading: 'idle',
    error: null,
  },
  assignments: {
    data: [],
    loading: 'idle',
    error: null,
  },
  filter: {
    status: undefined,
    priority: undefined,
    pestType: undefined,
    city: undefined,
    district: undefined,
    minBudget: undefined,
    maxBudget: undefined,
    isImmediate: undefined,
    createdBy: undefined,
    assignedTo: undefined,
  },
  sort: {
    field: 'createdAt',
    order: 'desc',
  },
  createTask: {
    loading: 'idle',
    error: null,
  },
  operations: {
    completeTask: {
      data: null,
      loading: 'idle',
      error: null,
    },
    selectTerminator: {
      data: null,
      loading: 'idle',
      error: null,
    },
  },
}

// 創建 tasksSlice
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // ===== 任務列表管理 =====
    fetchTasksStart: (state) => {
      state.tasks.loading = 'loading'
      state.tasks.error = null
    },
    
    fetchTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.tasks.loading = 'success'
      state.tasks.data = action.payload
      state.tasks.error = null
    },
    
    fetchTasksError: (state, action: PayloadAction<string>) => {
      state.tasks.loading = 'error'
      state.tasks.error = action.payload
    },

    // ===== 任務詳情管理 =====
    fetchTaskDetailStart: (state) => {
      state.currentTask.loading = 'loading'
      state.currentTask.error = null
    },
    
    fetchTaskDetailSuccess: (state, action: PayloadAction<Task>) => {
      state.currentTask.loading = 'success'
      state.currentTask.data = action.payload
      state.currentTask.error = null
    },
    
    fetchTaskDetailError: (state, action: PayloadAction<string>) => {
      state.currentTask.loading = 'error'
      state.currentTask.error = action.payload
    },

    // ===== 創建任務 =====
    createTaskStart: (state) => {
      state.createTask.loading = 'loading'
      state.createTask.error = null
    },
    
    createTaskSuccess: (state, action: PayloadAction<Task>) => {
      state.createTask.loading = 'success'
      state.createTask.error = null
      // 將新任務添加到任務列表的開頭
      if (state.tasks.data) {
        state.tasks.data = [action.payload, ...state.tasks.data]
      }
    },
    
    createTaskError: (state, action: PayloadAction<string>) => {
      state.createTask.loading = 'error'
      state.createTask.error = action.payload
    },

    // ===== 任務操作 =====

    // 選擇終結者
    selectTerminatorStart: (state) => {
      state.operations.selectTerminator.loading = 'loading'
      state.operations.selectTerminator.error = null
    },
    
    selectTerminatorSuccess: (state, action: PayloadAction<{ taskId: string; terminatorId: string }>) => {
      state.operations.selectTerminator.loading = 'success'
      state.operations.selectTerminator.data = action.payload.taskId
      state.operations.selectTerminator.error = null
      
      // 更新任務狀態為進行中
      if (state.tasks.data) {
        const taskIndex = state.tasks.data.findIndex(task => task.id === action.payload.taskId)
        if (taskIndex !== -1) {
          state.tasks.data[taskIndex] = {
            ...state.tasks.data[taskIndex],
            status: TaskStatus.IN_PROGRESS,
            assignedTo: action.payload.terminatorId,
            updatedAt: new Date().toISOString(),
          }
        }
      }
      
      if (state.currentTask.data?.id === action.payload.taskId) {
        state.currentTask.data = {
          ...state.currentTask.data,
          status: TaskStatus.IN_PROGRESS,
          assignedTo: action.payload.terminatorId,
          updatedAt: new Date().toISOString(),
        }
      }
    },
    
    selectTerminatorError: (state, action: PayloadAction<string>) => {
      state.operations.selectTerminator.loading = 'error'
      state.operations.selectTerminator.error = action.payload
    },

    // 完成任務
    completeTaskStart: (state) => {
      state.operations.completeTask.loading = 'loading'
      state.operations.completeTask.error = null
    },
    
    completeTaskSuccess: (state, action: PayloadAction<{ taskId: string; completedBy: 'fear_star' | 'terminator' }>) => {
      state.operations.completeTask.loading = 'success'
      state.operations.completeTask.data = action.payload.taskId
      state.operations.completeTask.error = null
      
      // 更新任務完成狀態
      const updateTaskCompletion = (task: Task) => {
        const updatedTask = { ...task }
        
        if (!updatedTask.completionStatus) {
          updatedTask.completionStatus = {
            fearStarConfirmed: false,
            terminatorConfirmed: false,
          }
        }
        
        if (action.payload.completedBy === 'fear_star') {
          updatedTask.completionStatus.fearStarConfirmed = true
        } else {
          updatedTask.completionStatus.terminatorConfirmed = true
        }
        
        // 如果雙方都確認完成，則將任務狀態設為已完成
        if (updatedTask.completionStatus.fearStarConfirmed && updatedTask.completionStatus.terminatorConfirmed) {
          updatedTask.status = TaskStatus.COMPLETED
          updatedTask.completedAt = new Date().toISOString()
        } else if (updatedTask.completionStatus.fearStarConfirmed || updatedTask.completionStatus.terminatorConfirmed) {
          // 如果只有一方確認完成，設為待完成確認狀態
          updatedTask.status = TaskStatus.PENDING_COMPLETION
        }
        
        updatedTask.updatedAt = new Date().toISOString()
        return updatedTask
      }
      
      // 更新任務列表
      if (state.tasks.data) {
        const taskIndex = state.tasks.data.findIndex(task => task.id === action.payload.taskId)
        if (taskIndex !== -1) {
          state.tasks.data[taskIndex] = updateTaskCompletion(state.tasks.data[taskIndex])
        }
      }
      
      // 更新當前任務詳情
      if (state.currentTask.data?.id === action.payload.taskId) {
        state.currentTask.data = updateTaskCompletion(state.currentTask.data)
      }
    },
    
    completeTaskError: (state, action: PayloadAction<string>) => {
      state.operations.completeTask.loading = 'error'
      state.operations.completeTask.error = action.payload
    },


    // ===== 申請任務 =====
    applyForTaskStart: (state) => {
      state.applications.loading = 'loading'
      state.applications.error = null
    },
    
    applyForTaskSuccess: (state, action: PayloadAction<{ taskId: string; application: TaskApplication }>) => {
      state.applications.loading = 'success'
      state.applications.error = null
      
      // 添加申請到申請列表
      if (state.applications.data) {
        state.applications.data = [...state.applications.data, action.payload.application]
      }
      
      // 更新任務的申請者列表
      if (state.tasks.data) {
        const taskIndex = state.tasks.data.findIndex(task => task.id === action.payload.taskId)
        if (taskIndex !== -1) {
          const task = state.tasks.data[taskIndex]
          state.tasks.data[taskIndex] = {
            ...task,
            applicants: [...task.applicants, action.payload.application],
            status: TaskStatus.PENDING_CONFIRMATION,
            updatedAt: new Date().toISOString(),
          }
        }
      }
      
      if (state.currentTask.data?.id === action.payload.taskId) {
        state.currentTask.data = {
          ...state.currentTask.data,
          applicants: [...state.currentTask.data.applicants, action.payload.application],
          status: TaskStatus.PENDING_CONFIRMATION,
          updatedAt: new Date().toISOString(),
        }
      }
    },
    
    applyForTaskError: (state, action: PayloadAction<string>) => {
      state.applications.loading = 'error'
      state.applications.error = action.payload
    },


    // ===== 篩選與排序 =====
    setTaskFilter: (state, action: PayloadAction<Partial<TaskFilter>>) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      }
    },
    
    clearTaskFilter: (state) => {
      state.filter = initialState.filter
    },
    
    setTaskSort: (state, action: PayloadAction<TaskSort>) => {
      state.sort = action.payload
    },

    // ===== 重置狀態 =====
    resetTasksState: () => initialState,
    
    resetTaskOperations: (state) => {
      state.operations = initialState.operations
    },
    
    resetCreateTaskState: (state) => {
      state.createTask = initialState.createTask
    },

    // ===== 更新單個任務 =====
    updateTask: (state, action: PayloadAction<Task>) => {
      const updatedTask = action.payload
      
      // 更新任務列表中的任務
      if (state.tasks.data) {
        const taskIndex = state.tasks.data.findIndex(task => task.id === updatedTask.id)
        if (taskIndex !== -1) {
          state.tasks.data[taskIndex] = updatedTask
        }
      }
      
      // 更新當前任務詳情
      if (state.currentTask.data?.id === updatedTask.id) {
        state.currentTask.data = updatedTask
      }
    },

  },
})

// 匯出 actions
export const {
  // 任務列表
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksError,
  
  // 任務詳情
  fetchTaskDetailStart,
  fetchTaskDetailSuccess,
  fetchTaskDetailError,
  
  // 創建任務
  createTaskStart,
  createTaskSuccess,
  createTaskError,
  
  // 任務操作
  selectTerminatorStart,
  selectTerminatorSuccess,
  selectTerminatorError,
  completeTaskStart,
  completeTaskSuccess,
  completeTaskError,
  
  // 申請任務
  applyForTaskStart,
  applyForTaskSuccess,
  applyForTaskError,
  
  // 篩選與排序
  setTaskFilter,
  clearTaskFilter,
  setTaskSort,
  
  // 重置狀態
  resetTasksState,
  resetTaskOperations,
  resetCreateTaskState,
  
  // 更新任務
  updateTask,
} = tasksSlice.actions

// 匯出 reducer
export default tasksSlice.reducer