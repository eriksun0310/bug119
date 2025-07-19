// import { getAssignmentsByTaskId } from '@/shared/mocks' // 已不需要
import { useTheme } from '@/shared/theme'
import { Task, TaskStatus, User, UserRole } from '@/shared/types'
import { ApplicantCard, Button, TaskActionResult } from '@/shared/ui'
import { taskStatusValidator } from '@/shared/utils'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { FC, useState } from 'react'
import { Text, View } from 'react-native'
import { createStyles } from './TaskStatusRenderer.styles'

interface TaskStatusRendererProps {
  task: Task
  user: User | null
  contactPerson: User | null
  contactTitle: string
  onAcceptTask: (taskId?: string, onSuccess?: () => void) => void
  onSelectTerminator: (application: any, onSuccess?: () => void) => void
  onMarkCompleted?: (taskId: string, onSuccess?: () => void) => void
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
  isTablet,
  navigation,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  // const assignments = getAssignmentsByTaskId(task.id) // 已不需要
  const [showActionResult, setShowActionResult] = useState(false)
  const [actionType, setActionType] = useState<'accept' | 'complete' | 'select'>('accept')
  
  // 處理接受任務
  const handleAcceptTaskWithUI = (taskId?: string) => {
    onAcceptTask(taskId, () => {
      setActionType('accept')
      setShowActionResult(true)
    })
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
                style={isTablet ? styles.applicantCardTablet : {}}
              />
            ))}
          </View>
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
          // 標記完成後跳轉到 TaskList 的 pending_completion 或 completed tab
          const targetTab = task.status === 'completed' ? 'completed' : 'pending_completion'
          navigation?.navigate('Main', { 
            screen: 'TaskList',
            params: { initialTab: targetTab }
          })
        }}
      />
    )
  }

  // PENDING_COMPLETION 狀態：顯示雙方確認進度
  if (task.status === TaskStatus.PENDING_COMPLETION) {
    const isUserConfirmed = taskStatusValidator.isUserConfirmed(
      task.status, 
      user?.role || UserRole.FEAR_STAR, 
      task.completionStatus
    )
    const isOtherPartyConfirmed = taskStatusValidator.isOtherPartyConfirmed(
      task.status, 
      user?.role || UserRole.FEAR_STAR, 
      task.completionStatus
    )

    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>任務完成確認</Text>
        
        {/* 顯示確認狀態 */}
        <View style={styles.completionStatusContainer}>
          <View style={styles.confirmationItem}>
            <Text style={styles.confirmationLabel}>
              {user?.role === UserRole.FEAR_STAR ? '您的確認' : '您的確認'}
            </Text>
            <Text style={[
              styles.confirmationStatus,
              isUserConfirmed ? styles.confirmedStatus : styles.pendingStatus
            ]}>
              {isUserConfirmed ? '已確認' : '待確認'}
            </Text>
          </View>
          
          <View style={styles.confirmationItem}>
            <Text style={styles.confirmationLabel}>
              {user?.role === UserRole.FEAR_STAR ? '終結者確認' : '小怕星確認'}
            </Text>
            <Text style={[
              styles.confirmationStatus,
              isOtherPartyConfirmed ? styles.confirmedStatus : styles.pendingStatus
            ]}>
              {isOtherPartyConfirmed ? '已確認' : '待確認'}
            </Text>
          </View>
        </View>

        {/* 顯示聯絡人資訊（維持 IN_PROGRESS 權限）*/}
        {contactPerson && (
          <>
            <Text style={styles.sectionTitle}>{contactTitle}</Text>
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
          </>
        )}

        {/* 如果當前用戶還未確認，顯示確認按鈕 */}
        {!isUserConfirmed && onMarkCompleted && (
          <View style={styles.buttonContainer}>
            <Button 
              variant="secondary" 
              onPress={() => handleCompleteWithUI(task.id)} 
              fullWidth
            >
              確認完成
            </Button>
          </View>
        )}

        {/* 如果當前用戶已確認但對方未確認，顯示等待提示 */}
        {isUserConfirmed && !isOtherPartyConfirmed && (
          <View style={styles.waitingContainer}>
            <Text style={styles.waitingText}>
              等待{user?.role === UserRole.FEAR_STAR ? '終結者' : '小怕星'}確認完成...
            </Text>
          </View>
        )}
      </View>
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

  // IN_PROGRESS 狀態：雙方都能看到完整聯絡資訊
  if (task.status === TaskStatus.IN_PROGRESS) {
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
        {onMarkCompleted && (
          <View style={styles.buttonContainer}>
            <Button 
              variant="secondary" 
              onPress={() => handleCompleteWithUI(task.id)} 
              fullWidth
            >
              已完成
            </Button>
          </View>
        )}
      </View>
    )
  }

  // PENDING 狀態：終結者看到小怕星基本資料，可申請任務
  if (task.status === TaskStatus.PENDING && user?.role === UserRole.TERMINATOR) {
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
            onPress={() => handleAcceptTaskWithUI(task.id)} 
            fullWidth
          >
            接受任務
          </Button>
        </View>
      </View>
    )
  }

  // COMPLETED 狀態：顯示基本資訊，提供刪除記錄選項
  if (task.status === TaskStatus.COMPLETED) {
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

  // 小怕星的 PENDING 狀態且沒有申請者
  return (
    <View style={styles.container}>
      <Text style={styles.emptyApplicants}>目前還沒有終結者申請這個任務</Text>
    </View>
  )
}
