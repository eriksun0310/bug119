import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@/shared/theme'
import { Task, User, UserRole, TaskStatus } from '@/shared/types'
import { ApplicantCard } from '@/shared/ui'
import { getAssignmentsByTaskId } from '@/shared/mocks'
import { createStyles } from './TaskStatusRenderer.styles'

interface TaskStatusRendererProps {
  task: Task
  user: User | null
  contactPerson: User | null
  contactTitle: string
  onAcceptTask: (taskId?: string) => void
  onSelectTerminator: (application: any) => void
  onMarkCompleted?: (taskId: string) => void
  isTablet: boolean
}

/**
 * 任務狀態渲染器
 * 根據任務狀態和用戶角色決定渲染內容
 */
export const TaskStatusRenderer: FC<TaskStatusRendererProps> = ({
  task,
  user,
  contactPerson,
  contactTitle,
  onAcceptTask,
  onSelectTerminator,
  onMarkCompleted,
  isTablet
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  const assignments = getAssignmentsByTaskId(task.id)

  // 小怕星在 PENDING_CONFIRMATION 狀態：顯示所有申請者
  if (task.status === TaskStatus.PENDING_CONFIRMATION &&
      user?.role === UserRole.FEAR_STAR &&
      task?.applicants?.length > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{contactTitle}</Text>
        <View style={styles.applicantsList}>
          {task.applicants.map(application => (
            <ApplicantCard
              key={application.id}
              application={application}
              taskStatus={task.status}
              currentUserRole={user?.role || UserRole.FEAR_STAR}
              currentUserId={user?.id || '1'}
              taskCreatedBy={task.createdBy}
              onSelect={() => onSelectTerminator(application)}
              style={isTablet ? styles.applicantCardTablet : {}}
            />
          ))}
        </View>
      </View>
    )
  }

  // 其他情況：顯示對方聯絡人資訊
  if (task.status !== TaskStatus.PENDING || 
      (user?.role === UserRole.TERMINATOR) ||
      (user?.role === UserRole.FEAR_STAR && assignments.length > 0)) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{contactTitle}</Text>
        <ApplicantCard
          application={{
            id: `contact-${contactPerson?.id}`,
            taskId: task.id,
            terminatorId: contactPerson?.id || '',
            appliedAt: task.createdAt,
            status: 'pending',
          }}
          taskStatus={task.status}
          currentUserRole={user?.role || UserRole.FEAR_STAR}
          currentUserId={user?.id || '1'}
          taskCreatedBy={task.createdBy}
          onSelect={() => {
            console.log('接受任務   1111111')
            if (user?.role === UserRole.TERMINATOR && task.status === TaskStatus.PENDING) {

              console.log('接受任務 2222222', task.id)
              onAcceptTask(task.id)
            } else if (task.status === TaskStatus.IN_PROGRESS && onMarkCompleted) {
              onMarkCompleted(task.id)
            }
          }}
        />
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