import { defineStore } from 'pinia'
import { useAuthStore } from './auth-store'
import { api } from '@/network/axiosInstance'
import type { IFinanceTable } from '@/@types/IFinanceTable'
import type AuthenticatedUserDto from '@/class/dtos/AuthenticatedUserDto'

export const useFinanceStore = defineStore('finance', {
  state: () => ({
    tablesByUser: [],
  }),
  actions: {
    async getLoggedUser(): Promise<AuthenticatedUserDto> {
      const authStore = useAuthStore()
      return authStore.loggedUser
    },
    async getTablesByUser(): Promise<Array<IFinanceTable>> {
      const { token } = await this.getLoggedUser()
      const response = await api.get('/api/v1/finance/tables', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      this.tablesByUser = response.data.response

      return response.data.response
    },
    async createDocument(tableName: string): Promise<void> {
      const { token } = await this.getLoggedUser()
      const response = await api.post(
        '/api/v1/finance',
        { tableName: tableName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    },
  },
})
