import React, { FC, useRef, useEffect, useState } from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Animated,
  LayoutChangeEvent,
  Dimensions 
} from 'react-native'
import { useTheme } from '@/shared/theme'
import { TabsProps } from './Tabs.types'
import { createStyles } from './Tabs.styles'

/**
 * Tabs 元件
 * 支援水平滾動的標籤導航元件，適合在手機上顯示多個標籤
 */
export const Tabs: FC<TabsProps> = ({
  options,
  value,
  onChange,
  style,
  scrollable = false,
  showCount = false,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  const scrollViewRef = useRef<ScrollView>(null)
  const [tabLayouts, setTabLayouts] = useState<{ [key: string]: { x: number; width: number } }>({})
  const indicatorPosition = useRef(new Animated.Value(0)).current
  const [indicatorWidth, setIndicatorWidth] = useState(0)

  // 當選中的標籤改變時，更新指示器位置
  useEffect(() => {
    const selectedTab = tabLayouts[value]
    if (selectedTab) {
      // 使用 state 來設置寬度，避免動畫錯誤
      setIndicatorWidth(selectedTab.width)
      
      Animated.spring(indicatorPosition, {
        toValue: selectedTab.x,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start()

      // 如果是可滾動的，自動滾動到選中的標籤
      if (scrollable && scrollViewRef.current) {
        const screenWidth = Dimensions.get('window').width
        const scrollToX = selectedTab.x - (screenWidth - selectedTab.width) / 2
        scrollViewRef.current.scrollTo({ x: Math.max(0, scrollToX), animated: true })
      }
    }
  }, [value, tabLayouts, scrollable, indicatorPosition])

  const handleTabLayout = (key: string, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout
    setTabLayouts(prev => ({ ...prev, [key]: { x, width } }))
  }

  const renderTab = (option: typeof options[0], index: number) => {
    const isActive = value === option.key
    const isDisabled = option.disabled

    return (
      <TouchableOpacity
        key={option.key}
        style={[
          styles.tab,
          scrollable && styles.tabScrollable,
          isActive && styles.tabActive,
          isDisabled && styles.tabDisabled,
        ]}
        onPress={() => !isDisabled && onChange(option.key)}
        disabled={isDisabled}
        onLayout={(event) => handleTabLayout(option.key, event)}
      >
        {option.icon && <View style={styles.tabIcon}>{option.icon}</View>}
        <Text style={[
          styles.tabText,
          isActive && styles.tabTextActive,
        ]}>
          {option.title}
        </Text>
        {showCount && option.count !== undefined && option.count > 0 && (
          <Text style={[
            styles.tabCount,
            isActive && styles.tabCountActive,
          ]}>
            {option.count}
          </Text>
        )}
      </TouchableOpacity>
    )
  }

  const content = (
    <View style={styles.tabsContainer}>
      {options.map(renderTab)}
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{ translateX: indicatorPosition }],
            width: indicatorWidth, // 使用 state 值，不是動畫值
          },
        ]}
      />
    </View>
  )

  if (scrollable) {
    return (
      <View style={[styles.container, style]}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {content}
        </ScrollView>
      </View>
    )
  }

  return (
    <View style={[styles.container, style]}>
      {content}
    </View>
  )
}