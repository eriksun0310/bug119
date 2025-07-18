import { getAssignmentsByTaskId } from '@/shared/mocks'
import { useTheme } from '@/shared/theme'
import { Task, TaskStatus, User, UserRole } from '@/shared/types'
import { ApplicantCard, Button, TaskActionResult } from '@/shared/ui'
import React, { FC, useState } from 'react'
import { Text, View } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
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
  navigation?: NativeStackNavigationProp<any>
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
  navigation,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  const assignments = getAssignmentsByTaskId(task.id)
  const [showActionResult, setShowActionResult] = useState(false)
  const [actionType, setActionType] = useState<'accept' | 'withdraw' | 'complete' | 'delete' | 'cancel'>('accept')
  
  // 處理接受任務
  const handleAcceptTaskWithUI = (taskId?: string) => {
    onAcceptTask(taskId)
    setActionType('accept')
    setShowActionResult(true)
  }
  
  // 處理撤回申請
  const handleWithdrawWithUI = (applicationId: string) => {
    if (onWithdrawApplication) {
      onWithdrawApplication(applicationId)
      setActionType('withdraw')
      setShowActionResult(true)
    }
  }
  
  // 處理標記完成
  const handleCompleteWithUI = (taskId: string) => {
    if (onMarkCompleted) {
      onMarkCompleted(taskId)
      setActionType('complete')
      setShowActionResult(true)
    }
  }
  
  // 處理刪除記錄
  const handleDeleteRecordWithUI = (taskId: string) => {
    // 先顯示 UI，不立即刪除記錄
    setActionType('delete')
    setShowActionResult(true)
  }
  
  // 處理取消任務
  const handleCancelTaskWithUI = (taskId: string) => {
    if (onCancelTask) {
      onCancelTask(taskId)
      setActionType('cancel')
      setShowActionResult(true)
    }
  }
  
  // 處理刪除任務
  const handleDeleteTaskWithUI = (taskId: string) => {
    // 先顯示 UI，不立即刪除任務
    setActionType('delete')
    setShowActionResult(true)
  }

  // 顯示撤回申請的結果 UI（終結者和小怕星共用）
  if (showActionResult && actionType === 'withdraw') {
    return (
      <TaskActionResult
        type="withdraw"
        message="已撤回申請"
        buttonText="確定"
        onViewTask={() => {
          setShowActionResult(false)
          // 撤回後返回上一頁
          navigation?.goBack()
        }}
      />
    )
  }

  // PENDING_CONFIRMATION 狀態：小怕星顯示所有申請者，終結者只顯示自己的申請
  if (task.status === TaskStatus.PENDING_CONFIRMATION && task?.applicants?.length > 0) {
    // 終結者只看到自己的申請，顯示簡潔的成功 UI
    if (user?.role === UserRole.TERMINATOR) {
      const myApplication = task.applicants.find(app => app.terminatorId === user.id)
      if (myApplication && showActionResult) {
        // 根據操作類型顯示不同的結果
        return (
          <TaskActionResult
            type="accept"
            message="已成功申請任務"
            buttonText="確定"
            onViewTask={() => {
              setShowActionResult(false)
              // 接受任務後返回上一頁（確保回到 pending_confirmation tab）
              navigation?.goBack()
            }}
          />
        )
      } else if (myApplication) {
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
                  onPress={() => handleWithdrawWithUI(myApplication.id)}
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
                onWithdraw={(appId) => {
                  if (onWithdrawApplication) {
                    onWithdrawApplication(appId)
                    setActionType('withdraw')
                    setShowActionResult(true)
                  }
                }}
                style={isTablet ? styles.applicantCardTablet : {}}
              />
            ))}
          </View>
          {onCancelTask && (
            <View style={styles.buttonContainer}>
              <Button variant="danger" onPress={() => handleCancelTaskWithUI(task.id)} fullWidth>
                取消任務
              </Button>
            </View>
          )}
        </View>
      )
    }
  }


  // 顯示已完成的 UI
  if (showActionResult && actionType === 'complete') {
    return (
      <TaskActionResult
        type="complete"
        message="任務已標記完成"
        buttonText="確定"
        onViewTask={() => {
          setShowActionResult(false)
          // 標記完成後返回上一頁（任務會移到 in_progress tab）
          navigation?.goBack()
        }}
      />
    )
  }

  // 顯示刪除的 UI（區分刪除任務和刪除記錄）
  if (showActionResult && actionType === 'delete') {
    // 根據任務狀態決定顯示訊息和跳轉位置
    const isDeleteRecord = task.status === TaskStatus.COMPLETED
    const message = isDeleteRecord ? "任務記錄已刪除" : "任務已刪除"
    const targetTab = isDeleteRecord ? 'completed' : 'pending_confirmation'
    
    return (
      <TaskActionResult
        type="delete"
        message={message}
        buttonText="確定"
        onViewTask={() => {
          // 在返回前執行實際的刪除操作
          if (isDeleteRecord && onDeleteRecord) {
            onDeleteRecord(task.id)
          } else if (!isDeleteRecord && onDeleteTask) {
            onDeleteTask(task.id)
          }
          
          setShowActionResult(false)
          
          // 刪除後返回上一頁（刪除記錄回到 completed tab，刪除任務回到上一頁）
          setTimeout(() => {
            navigation?.goBack()
          }, 100) // 短暫延遲確保資料更新
        }}
      />
    )
  }

  // 顯示取消任務的 UI
  if (showActionResult && actionType === 'cancel') {
    return (
      <TaskActionResult
        type="cancel"
        message="任務已取消"
        buttonText="確定"
        onViewTask={() => {
          setShowActionResult(false)
          // 取消任務後返回上一頁（確保回到 pending_confirmation tab）
          navigation?.goBack()
        }}
      />
    )
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
        {task.status === TaskStatus.PENDING && user?.role === UserRole.TERMINATOR && onAcceptTask ? (
          <View style={styles.buttonContainer}>
            <Button 
              variant="secondary" 
              onPress={() => handleAcceptTaskWithUI(task.id)} 
              fullWidth
            >
              接受任務
            </Button>
          </View>
        ) : null}
        {task.status === TaskStatus.IN_PROGRESS && onMarkCompleted && (
            <View style={styles.buttonContainer}>
              <Button variant="secondary" onPress={() => handleCompleteWithUI(task.id)} fullWidth>
                已完成
              </Button>
            </View>
          )}
        {task.status === TaskStatus.COMPLETED && onDeleteRecord && (
          <View style={styles.buttonContainer}>
            <Button variant="danger" onPress={() => handleDeleteRecordWithUI(task.id)} fullWidth>
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
          <Button variant="danger" onPress={() => handleDeleteTaskWithUI(task.id)} fullWidth>
            刪除任務
          </Button>
        </View>
      )}
    </View>
  )
}
