import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '@/shared/theme'
import { UserRole } from '@/shared/types'
import { ApplicantCard, Button } from '@/shared/ui'
import { taskStatusValidator } from '@/shared/utils'
import { StatusRendererProps } from '../TaskStatusRenderer.types'
import { createStyles } from '../TaskStatusRenderer.styles'

/**
 * 待完成確認狀態渲染器
 * 處理 PENDING_COMPLETION 狀態的雙方確認UI
 */
export const PendingCompletionRenderer: FC<StatusRendererProps> = ({
  task,
  user,
  contactPerson,
  contactTitle,
  actionHandlers,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)

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
      {!isUserConfirmed && (
        <View style={styles.buttonContainer}>
          <Button 
            variant="secondary" 
            onPress={() => actionHandlers?.handleCompleteWithUI(task.id)} 
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