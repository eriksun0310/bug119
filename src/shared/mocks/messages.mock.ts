// 聊天室假資料

export interface ChatItem {
  id: string
  name: string
  lastMessage: string
  time: string
  unreadCount?: number
}

export const mockChatList: ChatItem[] = [
  {
    id: 'conversation_1',
    name: '李師傅除蟲專家',
    lastMessage: '好的，明天下午2點我會準時到達。請確保家中有人，我會帶專業工具處理。',
    time: '2分鐘前',
    unreadCount: 3
  },
  {
    id: 'conversation_2',
    name: '小怕星用戶',
    lastMessage: '謝謝您的幫助！螞蟻問題已經解決了，服務很專業。',
    time: '1小時前'
  },
  {
    id: 'conversation_3',
    name: '王師傅',
    lastMessage: '您好，關於蟑螂處理的問題，我下週三有空檔可以過去處理。',
    time: '昨天',
    unreadCount: 1
  },
  {
    id: 'conversation_4',
    name: '陳大哥除蟲達人',
    lastMessage: '白蟻問題比較嚴重，需要先做環境評估，大概要2-3天的處理時間。',
    time: '2天前',
    unreadCount: 2
  },
  {
    id: 'conversation_5',
    name: '小怕星阿美',
    lastMessage: '家裡發現很多小蟲子，不知道是什麼蟲，可以請您來看看嗎？',
    time: '3天前'
  },
  {
    id: 'conversation_6',
    name: '林師傅蟲蟲終結者',
    lastMessage: '跳蚤問題已經處理完畢，記得要定期清潔保持環境乾燥。',
    time: '4天前'
  },
  {
    id: 'conversation_7',
    name: '小怕星小明',
    lastMessage: '蚊子太多了！請問有什麼快速有效的解決方法嗎？',
    time: '5天前',
    unreadCount: 1
  },
  {
    id: 'conversation_8',
    name: '張師傅專業除蟲',
    lastMessage: '果蠅的處理需要找到源頭，通常是廚房或垃圾桶附近。',
    time: '1週前'
  },
  {
    id: 'conversation_9',
    name: '小怕星小華',
    lastMessage: '謝謝您上次的幫忙，蟑螂問題真的解決了，推薦給朋友們！',
    time: '1週前'
  },
  {
    id: 'conversation_10',
    name: '劉師傅害蟲防治',
    lastMessage: '蜘蛛的話建議先清理網狀物，然後噴灑專用藥劑在角落。',
    time: '1週前',
    unreadCount: 4
  },
  {
    id: 'conversation_11',
    name: '小怕星小玲',
    lastMessage: '床蝨問題很困擾，請問處理費用大概多少？需要多久時間？',
    time: '2週前'
  },
  {
    id: 'conversation_12',
    name: '黃師傅蟲害專家',
    lastMessage: '蟎蟲問題需要深度清潔，建議更換寢具並使用除蟎機。',
    time: '2週前',
    unreadCount: 1
  },
  {
    id: 'conversation_13',
    name: '小怕星大雄',
    lastMessage: '飛蛾一直在燈具附近飛，有什麼方法可以驅趕嗎？',
    time: '2週前'
  },
  {
    id: 'conversation_14',
    name: '吳師傅環境清潔',
    lastMessage: '木蠹蟲的問題比較複雜，需要檢查所有木製家具的狀況。',
    time: '3週前'
  },
  {
    id: 'conversation_15',
    name: '小怕星小菁',
    lastMessage: '衣蛾把我的毛衣都咬壞了，請問要怎麼預防和處理？',
    time: '3週前',
    unreadCount: 2
  }
]