import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '@/shared/theme'
import { UserRole } from '@/shared/types'
import { ApplicantCard } from '@/shared/ui'
import { StatusRendererProps } from '../TaskStatusRenderer.types'
import { createStyles } from '../TaskStatusRenderer.styles'

/**
 * 已完成狀態渲染器
 * 處理 COMPLETED 狀態的UI渲染
 */
export const CompletedRenderer: FC<StatusRendererProps> = ({
  task,
  user,
  contactPerson,
  contactTitle,
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
    </View>
  )
}