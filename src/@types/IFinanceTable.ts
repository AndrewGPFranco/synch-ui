import type { IExpense } from './IExpense'
import type { IUser } from '@/@types/IUser.ts'

export interface IFinanceTable {
  idTable: string
  tableName: string
  users: Array<IUser>
  createdAt: Date
  updatedAt: Date
  expenses: Array<IExpense>
  status: string
}
