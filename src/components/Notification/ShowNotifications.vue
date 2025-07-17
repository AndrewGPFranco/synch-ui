<template>
  <section class="notifications">
    <div class="notifications-header">
      <h3 class="notifications-title">
        <i class="pi pi-bell"></i>
        Notificações
        <span class="notifications-count">{{ props.notifications.length }}</span>
        <button @click="closedNotifications" class="close-btn">
          <i class="pi pi-times"></i>
        </button>
      </h3>
    </div>

    <div class="notifications-content">
      <div v-if="props.notifications.length === 0" class="empty-state">
        <i class="pi pi-bell-slash empty-icon"></i>
        <p class="empty-text">Nenhuma notificação</p>
      </div>

      <ul v-else class="notifications-list">
        <li
          v-for="(notification, index) in props.notifications"
          :key="`${notification.messageContent}-${index}`"
          class="notification-item"
          :class="{ wasRead: notification.wasRead }"
        >
          <div class="notification-avatar">
            <span class="avatar-text">
              {{ getInitials(notification.creatorUser.name) }}
            </span>
          </div>

          <div class="notification-content">
            <div class="notification-header">
              <span class="notification-user">{{ notification.creatorUser.name }}</span>
              <span class="notification-nickname">@{{ notification.creatorUser.nickname }}</span>
              <span v-if="notification.wasRead" class="notification-read-label">LIDA</span>
            </div>
            <p class="notification-message">{{ notification.messageContent }}</p>
          </div>

          <div class="notification-actions">
            <button
              class="action-btn mark-read"
              title="Marcar como lida"
              @click="notificationService.markAsRead(notification)"
            >
              <i class="pi pi-check"></i>
            </button>
            <button
              class="action-btn remove"
              title="Remover"
              @click="notificationService.removeNotification(notification)"
            >
              <i class="pi pi-times"></i>
            </button>
          </div>
        </li>
      </ul>
    </div>

    <div class="notifications-footer" v-if="props.notifications.length > 0">
      <button class="footer-btn mark-all-read" @click="notificationService.markAllRead">
        <i class="pi pi-check-circle"></i>
        Marcar todas como lidas
      </button>
      <button
        class="footer-btn clear-all"
        @click="notificationService.clearAll(props.notifications[0])"
      >
        <i class="pi pi-trash"></i>
        Limpar todas
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { INotification } from '@/@types/INotification.ts'
import NotificationService from '@/class/services/NotificationService.ts'

interface Props {
  notifications: Array<INotification>
}

const props = defineProps<Props>()
const emit = defineEmits(['closed'])
const notificationService = new NotificationService()

const closedNotifications = () => {
  emit('closed')
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
}
</script>

<style scoped lang="scss">
.notifications {
  position: fixed;
  top: 1rem;
  right: 2rem;
  z-index: 1001;

  width: 380px;
  max-height: 70vh;

  background: white;
  border-radius: 16px;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 10px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);

  overflow: hidden;

  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.notifications-header {
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  background: linear-gradient(135deg, #f8f9ff 0%, #f1f3ff 100%);

  .notifications-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;

    font-size: 1.125rem;
    font-weight: 600;
    color: #1a1a1a;

    .pi-bell {
      color: #667eea;
      font-size: 1.25rem;
    }

    .notifications-count {
      margin-left: auto;
      padding: 0.25rem 0.5rem;

      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;

      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 700;

      min-width: 24px;
      text-align: center;
    }

    .close-btn {
      width: 32px;
      height: 32px;
      margin-left: 0.5rem;

      display: flex;
      align-items: center;
      justify-content: center;

      background: rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 50%;

      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(239, 68, 68, 0.1);
        border-color: rgba(239, 68, 68, 0.3);
        transform: scale(1.05);

        .pi-times {
          color: #ef4444;
        }
      }

      &:active {
        transform: scale(0.95);
      }

      .pi-times {
        font-size: 0.875rem;
        color: #6b7280;
        transition: color 0.2s ease;
      }
    }
  }
}

.notifications-content {
  max-height: 50vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 3px;
  }
}

.empty-state {
  padding: 3rem 1.5rem;
  text-align: center;
  color: #6b7280;

  .empty-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .empty-text {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 500;
  }
}

.notifications-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.wasRead {
  background-color: #f3f4f6;
  opacity: 0.8;

  .notification-message {
    color: #9ca3af;
    font-style: italic;
  }

  .notification-read-label {
    background-color: #10b981;
    color: white;
  }
}

.notification-read-label {
  margin-left: auto;
  background-color: #d1d5db;
  color: #374151;
  font-size: 0.625rem;
  font-weight: bold;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.5rem;

  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  transition: all 0.2s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.02);

    .notification-actions {
      opacity: 1;
    }
  }

  &:last-child {
    border-bottom: none;
  }
}

.notification-avatar {
  flex-shrink: 0;
  width: 40px;
  height: 40px;

  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  .avatar-text {
    color: white;
    font-size: 0.875rem;
    font-weight: 600;
  }
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;

  .notification-user {
    font-weight: 600;
    color: #1a1a1a;
    font-size: 0.875rem;
  }

  .notification-nickname {
    color: #6b7280;
    font-size: 0.75rem;
    font-weight: 500;
  }
}

.notification-message {
  margin: 0;
  color: #374151;
  font-size: 0.875rem;
  line-height: 1.4;

  word-wrap: break-word;
  overflow-wrap: break-word;
}

.notification-actions {
  display: flex;
  gap: 0.25rem;
  opacity: 0;
  transition: opacity 0.2s ease;

  .action-btn {
    width: 28px;
    height: 28px;

    background: none;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition: all 0.2s ease;

    .pi {
      font-size: 0.75rem;
    }

    &.mark-read {
      color: #10b981;

      &:hover {
        background: rgba(16, 185, 129, 0.1);
        border-color: #10b981;
      }
    }

    &.remove {
      color: #ef4444;

      &:hover {
        background: rgba(239, 68, 68, 0.1);
        border-color: #ef4444;
      }
    }
  }
}

.notifications-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(248, 250, 252, 0.5);

  display: flex;
  gap: 0.75rem;

  .footer-btn {
    flex: 1;
    padding: 0.5rem 1rem;

    background: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    font-size: 0.75rem;
    font-weight: 500;
    color: #6b7280;

    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #f8f9fa;
      border-color: rgba(0, 0, 0, 0.15);
      color: #374151;
    }

    &.mark-all-read:hover {
      color: #10b981;
      border-color: #10b981;
    }

    &.clear-all:hover {
      color: #ef4444;
      border-color: #ef4444;
    }

    .pi {
      font-size: 0.75rem;
    }
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 480px) {
  .notifications {
    width: calc(100vw - 2rem);
    left: 1rem;
    right: 1rem;
  }
}
</style>
