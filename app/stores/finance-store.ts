import {defineStore} from "pinia";
import type {ITableFinance} from "~/types/ITableFinance";

interface ResponseAPI {
    response: [];
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
        }
    }

});