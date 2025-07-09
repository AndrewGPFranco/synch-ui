import { useFinanceStore } from '@/stores/finance-store'
import type { IFinanceTable } from '@/@types/IFinanceTable.ts'

class FinanceService {
  private readonly financeStore: ReturnType<typeof useFinanceStore>

  constructor() {
    this.financeStore = useFinanceStore()
  }

  async getTablesByUser(): Promise<Array<IFinanceTable>> {
    return await this.financeStore.getTablesByUser()
  }

  async createDocument(tableName: string): Promise<void> {
    try {
      await this.financeStore.createDocument(tableName)
    } catch (error) {
      console.error(error)
    }
  }
}

export default FinanceService
