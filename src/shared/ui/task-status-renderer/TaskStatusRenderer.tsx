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
  onAcceptTask: (taskId?: string, onSuccess?: () => void) => void
  onSelectTerminator: (application: any, onSuccess?: () => void) => void
  onMarkCompleted?: (taskId: string, onSuccess?: () => void) => void
  onDeleteTask?: (taskId: string, onSuccess?: () => void) => void
  onCancelTask?: (taskId: string, onSuccess?: () => void) => void
  onDeleteRecord?: (taskId: string, onSuccess?: () => void) => void
  onWithdrawApplication?: (applicationId: string, onSuccess?: () => void) => void
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
  const [actionType, setActionType] = useState<'accept' | 'withdraw' | 'complete' | 'delete' | 'cancel' | 'select'>('accept')
  
  // 處理接受任務
  const handleAcceptTaskWithUI = (taskId?: string) => {
    onAcceptTask(taskId, () => {
      setActionType('accept')
      setShowActionResult(true)
    })
  }
  
  // 處理撤回申請
  const handleWithdrawWithUI = (applicationId: string) => {
    if (onWithdrawApplication) {
      onWithdrawApplication(applicationId, () => {
        setActionType('withdraw')
        setShowActionResult(true)
      })
    }
  }
  
  // 處理標記完成
  const handleCompleteWithUI = (taskId: string) => {
    if (onMarkCompleted) {
      onMarkCompleted(taskId, () => {
        setActionType('complete')
        setShowActionResult(true)
      })
    }
  }
  
  // 處理刪除記錄
  const handleDeleteRecordWithUI = (taskId: string) => {
    if (onDeleteRecord) {
      onDeleteRecord(taskId, () => {
        setActionType('delete')
        setShowActionResult(true)
      })
    }
  }
  
  // 處理取消任務
  const handleCancelTaskWithUI = (taskId: string) => {
    if (onCancelTask) {
      onCancelTask(taskId, () => {
        setActionType('cancel')
        setShowActionResult(true)
      })
    }
  }
  
  // 處理刪除任務
  const handleDeleteTaskWithUI = (taskId: string) => {
    if (onDeleteTask) {
      onDeleteTask(taskId, () => {
        setActionType('delete')
        setShowActionResult(true)
      })
    }
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

  // 顯示選擇終結者的結果 UI（小怕星選擇終結者成功）
  if (showActionResult && actionType === 'select') {
    return (
      <TaskActionResult
        type="accept"
        message="已成功選擇終結者"
        buttonText="查看任務"
        onViewTask={() => {
          setShowActionResult(false)
          // 選擇終結者後跳轉到 TaskList 的 in_progress tab
          navigation?.navigate('Main', { 
            screen: 'TaskList',
            params: { initialTab: 'in_progress' }
          })
        }}
      />
    )
  }

  // 顯示接受任務的結果 UI（終結者申請任務成功）
  if (showActionResult && actionType === 'accept') {
    return (
      <TaskActionResult
        type="accept"
        message="已成功申請任務"
        buttonText="查看任務"
        onViewTask={() => {
          setShowActionResult(false)
          // 接受任務後跳轉到 TaskList 的 pending_confirmation tab
          navigation?.navigate('Main', { 
            screen: 'TaskList',
            params: { initialTab: 'pending_confirmation' }
          })
        }}
      />
    )
  }

  // 顯示取消任務的結果 UI（移到前面，和接受任務一樣的位置）
  if (showActionResult && actionType === 'cancel') {
    return (
      <TaskActionResult
        type="cancel"
        message="任務已取消"
        buttonText="確定"
        onViewTask={() => {
          setShowActionResult(false)
          // 取消任務後返回上一頁
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
              onSelect={() => onSelectTerminator(myApplication, () => {
                setActionType('select')
                setShowActionResult(true)
              })}
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
                onSelect={() => onSelectTerminator(application, () => {
                  setActionType('select')
                  setShowActionResult(true)
                })}
                onWithdraw={(appId) => {
                  if (onWithdrawApplication) {
                    onWithdrawApplication(appId, () => {
                      setActionType('withdraw')
                      setShowActionResult(true)
                    })
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
        buttonText="查看任務"
        onViewTask={() => {
          setShowActionResult(false)
          // 標記完成後跳轉到 TaskList 的 completed tab
          navigation?.navigate('Main', { 
            screen: 'TaskList',
            params: { initialTab: 'completed' }
          })
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
          // 不需要再次執行刪除操作，因為已經在 handleDeleteRecordWithUI 中完成了
          setShowActionResult(false)
          
          // 刪除後返回上一頁（刪除記錄回到 completed tab，刪除任務回到上一頁）
          setTimeout(() => {
            navigation?.goBack()
          }, 100) // 短暫延遲確保資料更新
        }}
      />
    )
  }


  // 如果任務已取消，且不是顯示結果UI，顯示已取消狀態
  if (task.status === TaskStatus.CANCELLED && !showActionResult) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>任務狀態</Text>
        <Text style={styles.emptyApplicants}>此任務已被取消</Text>
      </View>
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
        {task.status === TaskStatus.PENDING && user?.role === UserRole.TERMINATOR && (
          <View style={styles.buttonContainer}>
            <Button 
              variant="secondary" 
              onPress={() => handleAcceptTaskWithUI(task.id)} 
              fullWidth
            >
              接受任務
            </Button>
          </View>
        )}
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
