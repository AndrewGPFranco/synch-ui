import { defineStore } from "pinia";
import { useAuthStore } from "./auth-store";
import { api } from "@/network/axiosInstance";
import type { FinanceTableDTO } from "@/@types/FinanceTableDTO";
import type AuthenticatedUserDto from "@/class/dtos/AuthenticatedUserDto";

export const useFinanceStore = defineStore('finance', {
    state: () => ({
        tablesByUser: []
    }),
    actions: {
        async getLoggedUser(): Promise<AuthenticatedUserDto> {
            const authStore = useAuthStore();
            return authStore.loggedUser;
        },
        async getTablesByUser(): Promise<Array<FinanceTableDTO>> {
            const { token } = await this.getLoggedUser();
            const response = await api.get("/api/v1/finance/tables", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            return response.data.response;
        }
    },
})