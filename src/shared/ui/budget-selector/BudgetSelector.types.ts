// 預算範圍選擇器型別定義

export interface BudgetRange {
  min: number
  max: number
}

export interface BudgetSelectorProps {
  value?: BudgetRange
  onChange: (budget: BudgetRange) => void
  error?: string
  label?: string
}