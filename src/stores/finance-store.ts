import { defineStore } from "pinia";
import { api } from "@/network/axiosInstance";
import type AuthenticatedUserDto from "@/class/dtos/AuthenticatedUserDto";
import { useAuthStore } from "./auth-store";

export const useFinanceStore = defineStore('finance', {
    state: () => ({
        tablesByUser: []
    }),
    actions: {
        async getLoggedUser(): Promise<AuthenticatedUserDto> {
            const authStore = useAuthStore();
            return authStore.loggedUser;
        },
        async getTablesByUser() {
            const { token } = await this.getLoggedUser();
            const response = await api.get("/api/v1/finance/tables", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response);
        }
    },
})