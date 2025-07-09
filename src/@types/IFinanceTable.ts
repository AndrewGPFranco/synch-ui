import type { IExpense } from "./IExpense";

export interface IFinanceTable {
    idTable: number,
    tableName: string,
    users: Array<any>,
    createdAt: Date,
    updatedAt: Date,
    expenses: IExpense,
    status: string
}