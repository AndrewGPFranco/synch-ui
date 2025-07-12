import type PaymentCategoryType from '@/@types/PaymentCategoryType.ts'

export interface IExpense {
  idTable: string
  idExpense?: string,
  name: string
  month: string
  amount: number,
  paymentDate?: Date,
  paymentCategory: keyof typeof PaymentCategoryType | null,
  dueDate: Date,
}
