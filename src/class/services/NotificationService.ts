import { useNotificationStore } from '@/stores/notification-store.ts'
import type { INotification } from '@/@types/INotification.ts'

class NotificationService {
  private readonly notificationStore: ReturnType<typeof useNotificationStore>

  constructor() {
    this.notificationStore = useNotificationStore()
  }

  async markAsRead(notification: INotification): Promise<void> {
    try {
      await this.notificationStore.markAsRead(notification)
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

  async clearAll(): Promise<void> {
    try {
      await this.notificationStore.clearAll()
    } catch (error) {
      console.error('Erro ao remover todas notificações:', error)
    }
  }
}

export default NotificationService
