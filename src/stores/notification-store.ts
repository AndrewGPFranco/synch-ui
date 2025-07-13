import { defineStore } from 'pinia'
import type { INotification } from '@/@types/INotification.ts'
import { api } from '@/network/axiosInstance.ts'
import type AuthenticatedUserDto from '@/class/dtos/AuthenticatedUserDto.ts'
import { useAuthStore } from '@/stores/auth-store.ts'

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
  },
  getters: {
    getNotifications: (state): Array<INotification> => state.notifications,
  },
})
