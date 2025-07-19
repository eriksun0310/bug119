import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '@/shared/theme'
import { UserRole } from '@/shared/types'
import { ApplicantCard } from '@/shared/ui'
import { StatusRendererProps } from '../TaskStatusRenderer.types'
import { createStyles } from '../TaskStatusRenderer.styles'

/**
 * 待確認狀態渲染器
 * 處理 PENDING_CONFIRMATION 狀態的UI渲染
 */
export const PendingConfirmationRenderer: FC<StatusRendererProps> = ({
  task,
  user,
  contactTitle,
  isTablet,
  actionHandlers,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)

  if (!task?.applicants?.length) {
    return null
  }

  // 終結者只看到自己的申請，顯示簡潔的成功 UI
  if (user?.role === UserRole.TERMINATOR) {
    const myApplication = task.applicants.find(app => app.terminatorId === user.id)
    
    if (!myApplication) {
      return null
    }

    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{contactTitle}</Text>
        <ApplicantCard
          application={myApplication}
          taskStatus={task.status}
          currentUserRole={user.role}
          currentUserId={user.id}
          taskCreatedBy={task.createdBy}
          onSelect={() => actionHandlers?.handleSelectWithUI(myApplication)}
          style={isTablet ? styles.applicantCardTablet : {}}
        />
      </View>
    )
  }

  // 小怕星看到所有申請者
  if (user?.role === UserRole.FEAR_STAR) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{contactTitle}</Text>
        <View style={styles.applicantsList}>
          {task.applicants.map(application => (
            <ApplicantCard
              key={application.id}
              application={application}
              taskStatus={task.status}
              currentUserRole={user.role}
              currentUserId={user.id}
              taskCreatedBy={task.createdBy}
              onSelect={() => actionHandlers?.handleSelectWithUI(application)}
              style={isTablet ? styles.applicantCardTablet : {}}
            />
          ))}
        </View>
      </View>
    )
  }

  return null
}