import { getAssignmentsByTaskId } from '@/shared/mocks'
import { useTheme } from '@/shared/theme'
import { Task, TaskStatus, User, UserRole } from '@/shared/types'
import { ApplicantCard, Button } from '@/shared/ui'
import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { createStyles } from './TaskStatusRenderer.styles'

interface TaskStatusRendererProps {
  task: Task
  user: User | null
  contactPerson: User | null
  contactTitle: string
  onAcceptTask: (taskId?: string) => void
  onSelectTerminator: (application: any) => void
  onMarkCompleted?: (taskId: string) => void
  onDeleteTask?: (taskId: string) => void
  onCancelTask?: (taskId: string) => void
  onDeleteRecord?: (taskId: string) => void
  onWithdrawApplication?: (applicationId: string) => void
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
  onDeleteTask,
  onCancelTask,
  onDeleteRecord,
  onWithdrawApplication,
  isTablet,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  const assignments = getAssignmentsByTaskId(task.id)

  // PENDING_CONFIRMATION 狀態：小怕星顯示所有申請者，終結者只顯示自己的申請
  if (task.status === TaskStatus.PENDING_CONFIRMATION && task?.applicants?.length > 0) {
    // 終結者只看到自己的申請
    if (user?.role === UserRole.TERMINATOR) {
      const myApplication = task.applicants.find(app => app.terminatorId === user.id)
      if (myApplication) {
        return (
          <View style={styles.container}>
            <Text style={styles.sectionTitle}>{contactTitle}</Text>
            <ApplicantCard
              application={myApplication}
              taskStatus={task.status}
              currentUserRole={user.role}
              currentUserId={user.id}
              taskCreatedBy={task.createdBy}
              onSelect={() => onSelectTerminator(myApplication)}
              style={isTablet ? styles.applicantCardTablet : {}}
            />
            {onWithdrawApplication && (
              <View style={styles.buttonContainer}>
                <Button
                  variant="danger"
                  onPress={() => onWithdrawApplication(myApplication.id)}
                  fullWidth
                >
                  撤回申請
                </Button>
              </View>
            )}
          </View>
        )
      }
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
                onSelect={() => onSelectTerminator(application)}
                onWithdraw={onWithdrawApplication}
                style={isTablet ? styles.applicantCardTablet : {}}
              />
            ))}
          </View>
          {onCancelTask && (
            <View style={styles.buttonContainer}>
              <Button variant="danger" onPress={() => onCancelTask(task.id)} fullWidth>
                取消任務
              </Button>
            </View>
          )}
        </View>
      )
    }
  }

  // 其他情況：顯示對方聯絡人資訊
  if (
    task.status !== TaskStatus.PENDING ||
    user?.role === UserRole.TERMINATOR ||
    (user?.role === UserRole.FEAR_STAR && assignments.length > 0)
  ) {
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
          onSelect={() => {}}
        />
        {task.status === TaskStatus.PENDING && user?.role === UserRole.TERMINATOR && onAcceptTask && (
          <View style={styles.buttonContainer}>
            <Button variant="secondary" onPress={() => onAcceptTask(task.id)} fullWidth>
              接受任務
            </Button>
          </View>
        )}
        {task.status === TaskStatus.IN_PROGRESS && onMarkCompleted && (
            <View style={styles.buttonContainer}>
              <Button variant="secondary" onPress={() => onMarkCompleted(task.id)} fullWidth>
                已完成
              </Button>
            </View>
          )}
        {task.status === TaskStatus.COMPLETED && onDeleteRecord && (
          <View style={styles.buttonContainer}>
            <Button variant="danger" onPress={() => onDeleteRecord(task.id)} fullWidth>
              刪除記錄
            </Button>
          </View>
        )}
      </View>
    )
  }

  // 小怕星的 PENDING 狀態且沒有申請者
  return (
    <View style={styles.container}>
      <Text style={styles.emptyApplicants}>目前還沒有終結者申請這個任務</Text>
      {user?.role === UserRole.FEAR_STAR && task.status === TaskStatus.PENDING && onDeleteTask && (
        <View style={styles.buttonContainer}>
          <Button variant="danger" onPress={() => onDeleteTask(task.id)} fullWidth>
            刪除任務
          </Button>
        </View>
      )}
    </View>
  )
}
