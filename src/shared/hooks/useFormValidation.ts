import { useState, useCallback } from 'react'

export type ValidationRule<T> = {
  required?: boolean
  pattern?: RegExp
  minLength?: number
  maxLength?: number
  custom?: (value: T) => string | undefined
}

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>
}

export interface UseFormValidationReturn<T> {
  form: T
  errors: Partial<T>
  setForm: (form: T) => void
  setErrors: (errors: Partial<T>) => void
  handleInputChange: (field: keyof T) => (value: T[keyof T]) => void
  validateField: (field: keyof T) => boolean
  validateForm: () => boolean
  clearErrors: () => void
  resetForm: () => void
}

/**
 * 表單驗證 Hook
 * 統一處理表單狀態、驗證邏輯、錯誤處理
 */
export const useFormValidation = <T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules<T> = {}
): UseFormValidationReturn<T> => {
  const [form, setForm] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<T>>({})

  // 處理輸入變更
  const handleInputChange = useCallback((field: keyof T) => (value: T[keyof T]) => {
    setForm(prev => ({ ...prev, [field]: value }))
    
    // 清除該欄位的錯誤
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }, [errors])

  // 驗證單一欄位
  const validateField = useCallback((field: keyof T): boolean => {
    const value = form[field]
    const rule = validationRules[field]
    
    if (!rule) return true

    let error: string | undefined

    // 必填驗證
    if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
      error = `請輸入${String(field)}`
    }

    // 最小長度驗證
    if (!error && rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
      error = `${String(field)}至少需要${rule.minLength}個字元`
    }

    // 最大長度驗證
    if (!error && rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
      error = `${String(field)}不能超過${rule.maxLength}個字元`
    }

    // 正則表達式驗證
    if (!error && rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      error = `${String(field)}格式不正確`
    }

    // 自定義驗證
    if (!error && rule.custom) {
      error = rule.custom(value)
    }

    if (error) {
      setErrors(prev => ({ ...prev, [field]: error as T[keyof T] }))
      return false
    }

    return true
  }, [form, validationRules])

  // 驗證整個表單
  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<T> = {}
    let isValid = true

    Object.keys(validationRules).forEach(fieldKey => {
      const field = fieldKey as keyof T
      const value = form[field]
      const rule = validationRules[field]

      if (!rule) return

      let error: string | undefined

      // 必填驗證
      if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
        error = `請輸入${String(field)}`
      }

      // 最小長度驗證
      if (!error && rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
        error = `${String(field)}至少需要${rule.minLength}個字元`
      }

      // 最大長度驗證
      if (!error && rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
        error = `${String(field)}不能超過${rule.maxLength}個字元`
      }

      // 正則表達式驗證
      if (!error && rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
        error = `${String(field)}格式不正確`
      }

      // 自定義驗證
      if (!error && rule.custom) {
        error = rule.custom(value)
      }

      if (error) {
        newErrors[field] = error as T[keyof T]
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [form, validationRules])

  // 清除所有錯誤
  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  // 重置表單
  const resetForm = useCallback(() => {
    setForm(initialValues)
    setErrors({})
  }, [initialValues])

  return {
    form,
    errors,
    setForm,
    setErrors,
    handleInputChange,
    validateField,
    validateForm,
    clearErrors,
    resetForm,
  }
}