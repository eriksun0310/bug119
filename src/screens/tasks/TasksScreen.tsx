// 任務列表畫面

import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@/shared/theme'
import { Card } from '@/shared/ui'

export const TasksScreen = () => {
  const { theme } = useTheme()
  const insets = useSafeAreaInsets()
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingTop: insets.top + theme.spacing.lg,
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.lg,
    },
    title: {
      fontSize: theme.fontSize.xl,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
      textAlign: 'center',
    },
    taskCard: {
      marginBottom: theme.spacing.md,
    },
    taskTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    taskStatus: {
      fontSize: theme.fontSize.sm,
      color: theme.colors.textSecondary,
    },
  })
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>我的任務</Text>
        
        <Card style={styles.taskCard}>
          <Text style={styles.taskTitle}>客廳蟑螂處理</Text>
          <Text style={styles.taskStatus}>狀態：進行中</Text>
        </Card>
        
        <Card style={styles.taskCard}>
          <Text style={styles.taskTitle}>廚房螞蟻清除</Text>
          <Text style={styles.taskStatus}>狀態：已完成</Text>
        </Card>
      </ScrollView>
    </View>
  )
}