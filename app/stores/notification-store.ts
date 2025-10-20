import {defineStore} from "pinia";
import type {INotification} from "~/types/INotification";

interface Response {
    response: any;
}

export const useNotificationStore = defineStore("notifications-store", {
    state: () => ({
        notifications: [] as INotification[],
    }),
    actions: {
        async getNotifications(): Promise<void> {
            const token = useCookie("token").value;

            try {
                const response = await $fetch<Response>(`/api/v1/notification/check-contains-notifications`, {
                    baseURL: "http://localhost:8080",
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.notifications = response.response;
            } catch (error) {
                console.error("Erro ao obter notificações:", error);
            } finally {
                setTimeout(() => {
                    this.getNotifications();
                }, 120000)
            }
        },
        async markAllAsRead(): Promise<void> {
            const token = useCookie("token").value;

            try {
                await $fetch<Response>(`/api/v1/notification/mark-all-as-read`, {
                    baseURL: "http://localhost:8080",
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                await this.getNotifications();
            } catch (error) {
                console.error("Erro ao marcar notificações como lidas:", error);
            }
        },
    },
});