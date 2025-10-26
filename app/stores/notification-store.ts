import {defineStore} from "pinia";
import ResponseAPI from "~/utils/ResponseAPI";
import type {INotification} from "~/types/INotification";
import type {IConviteTabela} from "~/types/IConviteTabela";

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
        async markNotificationAsReadAndAnswered(data: { idNotification: string, wasAccepted: boolean }): Promise<void> {
            const token = useCookie("token").value;

            try {
                await $fetch<Response>(`/api/v1/notification/mark-as-read-by-user`, {
                    baseURL: "http://localhost:8080",
                    method: "PUT",
                    body: data,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                await this.getNotifications();
            } catch (error) {
                console.error("Erro ao marcar notificações como lida:", error);
            }
        },
        async convidaUsuarioParaTabela(input: IConviteTabela): Promise<ResponseAPI<string>> {
            const token = useCookie("token").value;

            try {
                await $fetch(`/api/v1/notification/new/access-table`, {
                    baseURL: "http://localhost:8080",
                    method: "POST",
                    body: input,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                return new ResponseAPI(false, "Convite enviado com sucesso!");
            } catch (error: any) {
                const errorMessage = error?.data?.error || error?.response?._data?.error || error?.message
                    || "Ocorreu um erro desconhecido.";

                console.error("Erro no convite:", errorMessage);

                return new ResponseAPI(true, errorMessage);
            }
        }
    },
});