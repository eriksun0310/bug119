import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '@/shared/theme'
import { UserRole } from '@/shared/types'
import { ApplicantCard, Button } from '@/shared/ui'
import { StatusRendererProps } from '../TaskStatusRenderer.types'
import { createStyles } from '../TaskStatusRenderer.styles'

/**
 * 進行中狀態渲染器
 * 處理 IN_PROGRESS 狀態的UI渲染
 */
export const InProgressRenderer: FC<StatusRendererProps> = ({
  task,
  user,
  contactPerson,
  contactTitle,
  actionHandlers,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{contactTitle}</Text>
      {contactPerson && (
        <ApplicantCard
          application={{
            id: `contact-${contactPerson.id}`,
            taskId: task.id,
            terminatorId: contactPerson.id,
            appliedAt: task.createdAt,
            status: 'pending',
          }}
          taskStatus={task.status}
          currentUserRole={user?.role || UserRole.FEAR_STAR}
          currentUserId={user?.id || '1'}
          taskCreatedBy={task.createdBy}
          onSelect={() => {}}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button 
          variant="secondary" 
          onPress={() => actionHandlers?.handleCompleteWithUI(task.id)} 
          fullWidth
        >
          已完成
        </Button>
      </View>
    </View>
  )
}