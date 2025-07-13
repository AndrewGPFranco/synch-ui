<template>
  <section class="actions">
    <div>
      <ShowNotifications
        :notifications="notifications"
        v-if="showNotifications"
        @closed="handlerClosedNotification"
      />
    </div>

    <div>
      <button class="button-notifications" :class="{ isHome: isHome }" @click="show">
        <div class="notification-icon-wrapper">
          <i class="pi pi-bell notification-icon"></i>
          <span
            class="notification-badge"
            v-if="hasNotification"
            :class="{ pulse: hasNotification }"
          >
            {{ notifications.length > 99 ? '99+' : notifications.length }}
          </span>
        </div>
      </button>
      <button
        v-if="!isHome"
        class="button-home"
        @click="goHome"
        :class="{ 'button-home--hidden': isHome }"
      >
        <svg class="home-icon" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
        <span class="home-text">HOME</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useNotificationStore } from '@/stores/notification-store.ts'
import ShowNotifications from '@/components/Notification/ShowNotifications.vue'

const route = useRoute()
const router = useRouter()
const notificationStore = useNotificationStore()

let intervalId: number | undefined
const showNotifications = ref<boolean>(false)
const isHome = computed(() => route.name === 'home')
const notifications = computed(() => notificationStore.notifications)
const hasNotification = computed(() => notificationStore.notifications.length > 0)

const getNotifications = async () => {
  await notificationStore.getNotificationsUser()
}

const show = () => {
  showNotifications.value = !showNotifications.value
}

const handlerClosedNotification = () => {
  showNotifications.value = false
}

onMounted(() => {
  getNotifications()
  intervalId = setInterval(getNotifications, 120000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

const goHome = () => {
  router.push({ name: 'home' })
}

watch(
  () => route.path,
  () => {
    showNotifications.value = false
  },
)
</script>

<style scoped lang="scss">
.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  .isHome {
    bottom: 2rem !important;
  }

  .button-notifications {
    bottom: 5.5rem;
    position: relative;

    .notification-icon-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .notification-icon {
      font-size: 1.25rem;
      transition: transform 0.3s ease;
    }

    .notification-badge {
      position: absolute;
      top: -8px;
      right: -8px;

      min-width: 20px;
      height: 20px;

      display: flex;
      align-items: center;
      justify-content: center;

      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
      color: white;

      border-radius: 50%;
      border: 2px solid white;

      font-size: 0.75rem;
      font-weight: 700;
      line-height: 1;

      box-shadow: 0 2px 8px rgba(238, 90, 36, 0.4);

      &.pulse {
        animation: pulse 2s infinite;
      }
    }

    &:hover {
      .notification-icon {
        transform: rotate(15deg) scale(1.1);
      }

      .notification-badge {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(238, 90, 36, 0.6);
      }
    }
  }

  .button-home {
    bottom: 2rem;

    .home-icon {
      width: 1.2rem;
      height: 1.2rem;
      stroke-width: 2;
      flex-shrink: 0;
    }

    .home-text {
      font-family:
        'Inter',
        -apple-system,
        BlinkMacSystemFont,
        sans-serif;
    }
  }

  .button-notifications,
  .button-home {
    position: fixed;
    right: 2rem;
    z-index: 1000;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50px;

    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.05em;

    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
      background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 10px rgba(102, 126, 234, 0.4);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
