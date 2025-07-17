import { defineStore } from 'pinia'
import { api } from '@/network/axiosInstance.ts'
import { useAuthStore } from '@/stores/auth-store.ts'
import type { INotification } from '@/@types/INotification.ts'
import type AuthenticatedUserDto from '@/class/dtos/AuthenticatedUserDto.ts'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Array<INotification>,
  }),
  actions: {
    async getLoggedUser(): Promise<AuthenticatedUserDto> {
      const authStore = useAuthStore()
      return authStore.loggedUser
    },
    async getNotificationsUser(): Promise<void> {
      try {
        const { token } = await this.getLoggedUser()

        if (token !== '') {
          const response = await api.get('/api/v1/notification/check-contains-notifications', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          this.notifications = response.data.response
        }
      } catch (error) {
        console.error('Erro ao buscar notificações:', error)
      }
    },
    async markAsRead(notification: INotification): Promise<void> {
      const { token } = await this.getLoggedUser()

      if (token !== '') {
        await api.put(
          `/api/v1/notification/mark-as-read-by-user/${notification.idNotification}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        await this.getNotificationsUser()
      }
    },
    async removeNotification(notification: INotification): Promise<void> {
      const { token } = await this.getLoggedUser()

      if (token !== '') {
        await api.delete(
          `/api/v1/notification/delete-notification/${notification.idNotification}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        await this.getNotificationsUser()
      }
    },
    async markAllRead(): Promise<void> {
      const { token } = await this.getLoggedUser()

      if (token !== '') {
        await api.put('/api/v1/notification/mark-all-as-read', null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        await this.getNotificationsUser()
      }
    },
    async clearAll(notification: INotification): Promise<void> {
      const { token } = await this.getLoggedUser()

      if (token !== '') {
        await api.delete(
          `/api/v1/notification/delete-all?idNotification=${notification.idNotification}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        await this.getNotificationsUser()
      }
    },
  },
  getters: {
    getNotifications: (state): Array<INotification> => state.notifications,
  },
})
