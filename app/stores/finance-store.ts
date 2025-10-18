import {defineStore} from "pinia";
import type {IExpense} from "~/types/IExpense";
import type {ITableFinance} from "~/types/ITableFinance";

interface ResponseAPI {
    response: any;
}

export const useFinanceStore = defineStore("finance-store", {
    actions: {
        async getTablesByUser(): Promise<ITableFinance[]> {
            const token = useCookie('token').value;

            try {
                const data = await $fetch<ResponseAPI>('/api/v1/finance/tables', {
                    baseURL: 'http://localhost:8080',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                return data.response;
            } catch (error) {
                console.error('Erro ao buscar tabelas:', error);
                return [];
            }
        },
        async getExpenses(id: string): Promise<IExpense[]> {
            const token = useCookie('token').value;

            try {
                const data = await $fetch<ResponseAPI>(`/api/v1/expense/${id}`, {
                    baseURL: 'http://localhost:8080',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                return data.response;
            } catch (error) {
                console.error('Erro ao buscar tabela:', error);
                return [];
            }
        },
    }

});