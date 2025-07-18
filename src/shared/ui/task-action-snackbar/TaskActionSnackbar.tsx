import React, { FC, useEffect, useRef } from 'react'
import { Animated, Text, TouchableOpacity, View } from 'react-native'
import { Check, FileText, RotateCcw, Trash2, X, XCircle } from 'lucide-react-native'
import { useTheme } from '@/shared/theme'
import { TaskActionSnackbarProps, SnackbarConfig } from './TaskActionSnackbar.types'
import { createStyles } from './TaskActionSnackbar.styles'

/**
 * 任務操作結果 Snackbar 元件
 * 顯示操作結果並提供後續動作選項
 */
export const TaskActionSnackbar: FC<TaskActionSnackbarProps> = ({
  type,
  visible,
  onDismiss,
  onAction,
  taskTitle,
  terminatorName,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  const slideAnim = useRef(new Animated.Value(100)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  // 動畫控制
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 100,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [visible])

  // 自動隱藏
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onDismiss()
      }, 5000) // 5秒後自動隱藏

      return () => clearTimeout(timer)
    }
  }, [visible, onDismiss])

  // 根據動作類型獲取配置
  const getSnackbarConfig = (): SnackbarConfig => {
    switch (type) {
      case 'accept':
        return {
          icon: 'check',
          title: '已成功申請任務！',
          subtitle: '任務進入待確認狀態，等待客戶選擇',
          actions: [
            { label: '查看任務', type: 'view_task' },
            { label: '我的任務', type: 'my_tasks' },
          ],
          backgroundColor: theme.colors.success,
          iconColor: '#FFFFFF',
        }

      case 'select':
        return {
          icon: 'check',
          title: `已成功委託${terminatorName || '終結者'}！`,
          subtitle: '任務開始進行，可隨時查看進度',
          actions: [
            { label: '查看任務', type: 'view_task' },
          ],
          backgroundColor: theme.colors.success,
          iconColor: '#FFFFFF',
        }

      case 'withdraw':
        return {
          icon: 'rotate-ccw',
          title: '已撤回申請',
          subtitle: '任務回到待接案狀態',
          actions: [
            { label: '返回任務牆', type: 'task_wall' },
          ],
          backgroundColor: theme.colors.warning,
          iconColor: '#FFFFFF',
        }

      case 'complete':
        return {
          icon: 'check',
          title: '任務已標記完成！',
          subtitle: '等待對方確認完成',
          actions: [
            { label: '查看任務', type: 'view_task' },
          ],
          backgroundColor: theme.colors.success,
          iconColor: '#FFFFFF',
        }

      case 'delete':
        return {
          icon: 'trash-2',
          title: '已刪除任務',
          subtitle: '任務已從列表中移除',
          actions: [
            { label: '返回任務牆', type: 'task_wall' },
          ],
          backgroundColor: theme.colors.error,
          iconColor: '#FFFFFF',
        }

      case 'cancel':
        return {
          icon: 'x-circle',
          title: '任務已取消',
          subtitle: '已通知所有申請者',
          actions: [
            { label: '返回任務牆', type: 'task_wall' },
          ],
          backgroundColor: theme.colors.error,
          iconColor: '#FFFFFF',
        }

      default:
        return {
          icon: 'check',
          title: '操作成功',
          subtitle: '',
          actions: [],
          backgroundColor: theme.colors.success,
          iconColor: '#FFFFFF',
        }
    }
  }

  // 渲染圖標
  const renderIcon = (iconType: string, color: string) => {
    const iconProps = { size: 20, color }
    
    switch (iconType) {
      case 'check':
        return <Check {...iconProps} />
      case 'rotate-ccw':
        return <RotateCcw {...iconProps} />
      case 'trash-2':
        return <Trash2 {...iconProps} />
      case 'x-circle':
        return <XCircle {...iconProps} />
      default:
        return <Check {...iconProps} />
    }
  }

  if (!visible) return null

  const config = getSnackbarConfig()

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View
        style={[
          styles.snackbar,
          { backgroundColor: config.backgroundColor },
        ]}
      >
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
          ]}
        >
          {renderIcon(config.icon, config.iconColor)}
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{config.title}</Text>
          {config.subtitle ? (
            <Text style={styles.subtitle}>{config.subtitle}</Text>
          ) : null}

          {config.actions.length > 0 && (
            <View style={styles.actions}>
              {config.actions.map((action, index) => (
                <TouchableOpacity
                  key={action.type}
                  style={[
                    styles.actionButton,
                    index > 0 && styles.actionButtonSecondary,
                  ]}
                  onPress={() => onAction(action.type)}
                >
                  <Text
                    style={[
                      styles.actionText,
                      index > 0 && styles.actionTextSecondary,
                    ]}
                  >
                    {action.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
          <X size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}