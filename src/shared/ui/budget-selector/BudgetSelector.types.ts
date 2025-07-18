// 預算選擇器型別定義

export interface BudgetSelectorProps {
  value?: number
  onChange: (budget: number) => void
  error?: string
  label?: string
  required?: boolean
}