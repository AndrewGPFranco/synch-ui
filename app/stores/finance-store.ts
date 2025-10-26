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
        async addFinanceTable(input: string): Promise<ResponseAPI<string>> {
            const token = useCookie("token").value;
            const data = {
                tableName: input
            }

            try {
                await $fetch(`/api/v1/finance`, {
                    baseURL: "http://localhost:8080",
                    method: "POST",
                    body: data,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                return new ResponseAPI(false, "Tabela criada com sucesso!");
            } catch (error) {
                console.error("Erro ao criar tabela:", error);
                return new ResponseAPI(true, "Erro ao criar tabela");
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

                return new ResponseAPI(false, "Despesa deletada com sucesso!");
            } catch (error) {
                console.error("Erro ao adicionar despesa:", error);
                return new ResponseAPI(true, "Erro ao deletar despesa");
            }
        },
        async deleteTable(id: string): Promise<ResponseAPI<string>> {
            const token = useCookie("token").value;

            try {
                await $fetch(`/api/v1/finance/delete/${id}`, {
                    baseURL: "http://localhost:8080",
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                return new ResponseAPI(false, "Tabela removida com sucesso!");
            } catch (error) {
                console.error("Erro ao adicionar despesa:", error);
                return new ResponseAPI(true, "Erro ao remover tabela");
            }
        },
        async calculaDespesas(idTable: string): Promise<ResponseAPI<number | string>> {
            const token = useCookie("token").value;

            interface OutputReporteCalculoDespesa {
                resultado: number;
            }

            try {
                const data = await $fetch<OutputReporteCalculoDespesa>(`/api/v1/expense/calcula-despesas/${idTable}`, {
                    baseURL: "http://localhost:8080",
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                return new ResponseAPI(false, data.resultado);
            } catch (error) {
                console.error("Erro ao realizar cálculo de despesas.", error);
                return new ResponseAPI(true, "Erro ao realizar cálculo de despesas.");
            }
        },
        async duplicateExpense(idExpense: string): Promise<ResponseAPI<string>> {
            const token = useCookie("token").value;

            try {
                await $fetch(`/api/v1/expense/duplicate/${idExpense}`, {
                    baseURL: "http://localhost:8080",
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                return new ResponseAPI(false, "Despesa duplicada com sucesso!");
            } catch (error) {
                console.error("Erro ao adicionar despesa:", error);
                return new ResponseAPI(true, "Erro ao duplicar despesa");
            }
        }
    },
});
