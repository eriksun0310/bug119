import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '@/shared/theme'
import { UserRole } from '@/shared/types'
import { ApplicantCard, Button } from '@/shared/ui'
import { StatusRendererProps } from '../TaskStatusRenderer.types'
import { createStyles } from '../TaskStatusRenderer.styles'

/**
 * 待申請狀態渲染器
 * 處理 PENDING 狀態的UI渲染
 */
export const PendingRenderer: FC<StatusRendererProps> = ({
  task,
  user,
  contactPerson,
  contactTitle,
  actionHandlers,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  // PENDING 狀態：終結者看到小怕星基本資料，可申請任務
  if (user?.role === UserRole.TERMINATOR) {
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
            currentUserRole={user.role}
            currentUserId={user.id}
            taskCreatedBy={task.createdBy}
            onSelect={() => {}}
          />
        )}
        <View style={styles.buttonContainer}>
          <Button 
            variant="secondary" 
            onPress={() => actionHandlers?.handleAcceptWithUI(task.id)} 
            fullWidth
          >
            接受任務
          </Button>
        </View>
      </View>
    )
  }

  // 小怕星的 PENDING 狀態且沒有申請者
  return (
    <View style={styles.container}>
      <Text style={styles.emptyApplicants}>目前還沒有終結者申請這個任務</Text>
    </View>
  )
}