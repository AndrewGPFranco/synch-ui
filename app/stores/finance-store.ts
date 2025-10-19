import { defineStore } from "pinia";
import ResponseAPI from "~/utils/ResponseAPI";
import type { IExpense } from "~/types/IExpense";
import type { IAddExpense } from "~/types/IAddExpense";
import type { ITableFinance } from "~/types/ITableFinance";

interface ResponseAPILocal {
    response: any;
}

export const useFinanceStore = defineStore("finance-store", {
    actions: {
        async getTablesByUser(): Promise<ITableFinance[]> {
            const token = useCookie("token").value;

            try {
                const data = await $fetch<ResponseAPILocal>("/api/v1/finance/tables", {
                    baseURL: "http://localhost:8080",
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                return data.response;
            } catch (error) {
                console.error("Erro ao buscar tabelas:", error);
                return [];
            }
        },
        async getExpenses(id: string): Promise<IExpense[]> {
            const token = useCookie("token").value;

            try {
                const data = await $fetch<ResponseAPILocal>(`/api/v1/expense/${id}`, {
                    baseURL: "http://localhost:8080",
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                return data.response;
            } catch (error) {
                console.error("Erro ao buscar tabela:", error);
                return [];
            }
        },
        async addExpense(input: IAddExpense): Promise<ResponseAPI<string>> {
            const token = useCookie("token").value;

            try {
                await $fetch(`/api/v1/expense`, {
                    baseURL: "http://localhost:8080",
                    method: "POST",
                    body: input,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                return new ResponseAPI(false, "Despesa adicionada com sucesso!");
            } catch (error) {
                console.error("Erro ao adicionar despesa:", error);
                return new ResponseAPI(true, "Erro ao adicionar despesa");
            }
        },
        async deleteItem(id: string): Promise<ResponseAPI<string>> {
            const token = useCookie("token").value;

            try {
                await $fetch(`/api/v1/expense/${id}`, {
                    baseURL: "http://localhost:8080",
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                return new ResponseAPI(false, "Despesa adicionada com sucesso!");
            } catch (error) {
                console.error("Erro ao adicionar despesa:", error);
                return new ResponseAPI(true, "Erro ao adicionar despesa");
            }
        },
    },
});
