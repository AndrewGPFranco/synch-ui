import ResponseAPI from '@/class/ResponseAPI.ts'
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

  async deleteTable(idTable: number): Promise<ResponseAPI<string, string>> {
    try {
      await this.financeStore.deleteTable(idTable)
      return new ResponseAPI<string, string>(null, 'Tabela deletada com sucesso!')
    } catch (_) {
      return new ResponseAPI<string, string>(
        'Ocorreu um erro ao deletar tabela, tente novamente.',
        null,
      )
    }
  }
}

export default FinanceService
