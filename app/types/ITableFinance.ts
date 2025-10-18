import type {IUser} from "~/types/IUser";
import type {IExpense} from "~/types/IExpense";

export interface ITableFinance {
    idTable: string;
    tableName: string;
    users: IUser[],
    createdAt: Date | null,
    updatedAt: Date | null,
    expenses: IExpense[]
}