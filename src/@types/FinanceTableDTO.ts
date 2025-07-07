import type { ExpenseDTO } from "./ExpenseDTO";

export interface FinanceTableDTO {
    idTable: number,
    tableName: string,
    users: Array<any>,
    createdAt: Date,
    updatedAt: Date,
    expenses: ExpenseDTO
}