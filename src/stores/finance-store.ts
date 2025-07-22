import { defineStore } from 'pinia'
import { useAuthStore } from './auth-store'
import { api } from '@/network/axiosInstance'
import type { IExpense } from '@/@types/IExpense.ts'
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
      await api.post(
        '/api/v1/finance',
        { tableName: tableName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      await this.getTablesByUser()
    },
    async deleteTable(idTable: string): Promise<void> {
      const { token } = await this.getLoggedUser()
      await api.delete(`/api/v1/finance/delete/${idTable}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await this.getTablesByUser()
    },
    async editTableName(idTable: string, newName: string): Promise<void> {
      const { token } = await this.getLoggedUser()

      const data: { idTable: string; newName: string } = {
        idTable,
        newName,
      }

      await api.put(`/api/v1/finance/edit`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await this.getTablesByUser()
    },
    async addExpense(data: IExpense): Promise<void> {
      const { token } = await this.getLoggedUser()

      await api.post(`/api/v1/expense`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await this.getTablesByUser()
    },
    async deleteExpense(idExpense: string): Promise<void> {
      const { token } = await this.getLoggedUser()

      await api.delete(`/api/v1/expense/${idExpense}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      await this.getTablesByUser()
    }
  },
})
