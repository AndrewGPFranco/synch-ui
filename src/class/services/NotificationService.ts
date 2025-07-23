import ResponseAPI from '@/class/ResponseAPI.ts'
import { useFinanceStore } from '@/stores/finance-store.ts'
import type { INotification } from '@/@types/INotification.ts'
import { useNotificationStore } from '@/stores/notification-store.ts'

class NotificationService {
  private readonly financeStore: ReturnType<typeof useFinanceStore>
  private readonly notificationStore: ReturnType<typeof useNotificationStore>

  constructor() {
    this.notificationStore = useNotificationStore()
    this.financeStore = useFinanceStore()
  }

  async markAsRead(notification: INotification): Promise<void> {
    try {
      await this.notificationStore.markAsRead(notification)
      await this.financeStore.getTablesByUser()
    } catch (error) {
      console.error('Erro ao marcar notificação como lida!', error)
    }
  }

  async removeNotification(notification: INotification): Promise<void> {
    try {
      await this.notificationStore.removeNotification(notification)
    } catch (error) {
      console.error('Erro ao remover notificação!', error)
    }
  }

  async markAllRead(): Promise<void> {
    try {
      await this.notificationStore.markAllRead()
    } catch (error) {
      console.error('Erro ao marcar todas notificações como lida!', error)
    }
  }

  async clearAll(notification: INotification): Promise<void> {
    try {
      await this.notificationStore.clearAll(notification)
    } catch (error) {
      console.error('Erro ao remover todas notificações:', error)
    }
  }

  async sendInvite(
    emailGuest: string,
    idFinanceTable: string,
  ): Promise<ResponseAPI<string, string>> {
    try {
      await this.notificationStore.sendInvite(emailGuest, idFinanceTable)
      return new ResponseAPI<string, string>(null, 'Convite enviado com sucesso!')
    } catch (error) {
      console.log(error)
      return new ResponseAPI<string, string>(
        `Ocorreu um erro ao enviar convite para o email: ${emailGuest}`,
        null,
      )
    }
  }
}

export default NotificationService
