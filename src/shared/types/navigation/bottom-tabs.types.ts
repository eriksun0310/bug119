// 底部導航標籤型別定義

export type MainTabParamList = {
  Home: undefined
  Tasks: undefined
  Profile: undefined
}

// 小怕星專用標籤
export type FearStarTabParamList = {
  PublishTask: undefined    // 發任務
  TaskList: { initialTab?: 'pending_confirmation' | 'in_progress' | 'pending_completion' | 'completed' } | undefined      // 任務
  Profile: undefined       // 我的
}

// 蟲蟲終結者專用標籤
export type TerminatorTabParamList = {
  TaskWall: undefined      // 任務牆
  TaskList: { initialTab?: 'pending_confirmation' | 'in_progress' | 'pending_completion' | 'completed' } | undefined      // 任務
  Profile: undefined       // 我的
}