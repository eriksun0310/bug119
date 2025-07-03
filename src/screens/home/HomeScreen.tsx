// 首頁畫面 - 發任務

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Plus } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { Button, Card } from '@/shared/ui'

export const HomeScreen = () => {
  const { theme } = useTheme()
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
    },
    title: {
      fontSize: theme.fontSize.xl,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
    },
    section: {
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      fontSize: theme.fontSize.lg,
      fontWeight: '600',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    quickActionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.sm,
    },
    quickActionText: {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
      fontWeight: '500',
    },
  })
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>發布除蟲任務</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>快速發布</Text>
        <Card>
          <View style={styles.quickActionContainer}>
            <Plus size={24} color={theme.colors.text} />
            <Text style={styles.quickActionText}>快速發布除蟲任務</Text>
          </View>
          <Button variant="primary" fullWidth style={{ marginTop: theme.spacing.md }}>
            立即發布任務
          </Button>
        </Card>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>常見害蟲</Text>
        <Card>
          <Text style={{ color: theme.colors.text }}>
            蟑螂、螞蟻、蚊子、蜘蛛等害蟲處理
          </Text>
        </Card>
      </View>
    </View>
  )
}