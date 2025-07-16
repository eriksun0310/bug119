import { ValidationRules } from '@/shared/hooks/useFormValidation'
import { validationPatterns, validationMessages } from '@/shared/utils/validation'

// 登入表單驗證規則
export const loginValidationRules: ValidationRules<{
  email: string
  password: string
}> = {
  email: {
    required: true,
    pattern: validationPatterns.email,
    message: validationMessages.email
  },
  password: {
    required: true,
    minLength: 6,
    message: validationMessages.password
  }
}

// 註冊表單驗證規則
export const registerValidationRules: ValidationRules<{
  name: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  line: string
  telegram: string
  preferredMethod: any
}> = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    required: true,
    pattern: validationPatterns.email,
    message: validationMessages.email
  },
  password: {
    required: true,
    minLength: 6,
    message: validationMessages.password
  },
  confirmPassword: {
    required: true,
    custom: (value, form) => {
      if (value !== form?.password) {
        return validationMessages.passwordMatch
      }
    }
  },
  phone: {
    // 不設為必填，由條件式驗證處理
    pattern: validationPatterns.phone,
    message: validationMessages.phone
  },
  line: {
    pattern: validationPatterns.lineId,
    message: validationMessages.lineId
  },
  telegram: {
    pattern: validationPatterns.telegramUsername,
    message: validationMessages.telegramUsername
  }
}

// 建立任務表單驗證規則
export const createTaskValidationRules: ValidationRules<{
  title: string
  description: string
  city: string
  district: string
}> = {
  title: {
    required: true,
    minLength: 3,
    maxLength: 100
  },
  description: {
    required: true,
    minLength: 10,
    maxLength: 1000
  },
  city: {
    required: true
  },
  district: {
    required: true
  }
}

// 編輯個人資料表單驗證規則
export const editProfileValidationRules: ValidationRules<{
  name: string
  email: string
  phone: string
  line: string
  telegram: string
  city: string
  district: string
  preferredMethod: any
}> = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    required: true,
    pattern: validationPatterns.email,
    message: validationMessages.email
  },
  phone: {
    // 不設為必填，由條件式驗證處理
    pattern: validationPatterns.phone,
    message: validationMessages.phone
  },
  line: {
    pattern: validationPatterns.lineId,
    message: validationMessages.lineId
  },
  telegram: {
    pattern: validationPatterns.telegramUsername,
    message: validationMessages.telegramUsername
  },
  city: {
    required: true
  },
  district: {
    required: true
  }
}