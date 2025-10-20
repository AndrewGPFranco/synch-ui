<template>
  <div class="relative">
    <UTooltip text="Abrir Notificações">
      <UButton
          color="neutral"
          variant="ghost"
          @click="showNotifications"
          icon="i-lucide-bell"
          aria-label="Abrir Notificações"
          class="cursor-pointer"
      />
    </UTooltip>
    <span
        v-if="unreadCountComputed > 0"
        class="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"
    />

    <UModal title="Notificações" class="w-full max-w-[40vw]" v-model:open="isOpen">
      <template #body>
        <UButton v-if="unreadCountComputed > 0"
                 class="cursor-pointer bg-transparent underline hover:bg-gray-600 mb-10 text-white"
                 @click="markAllAsRead">
          Marcar todas como lida
        </UButton>
        <div class="flex flex-col items-center gap-4 text-center">
          <NotificationMessage/>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import {UButton} from "#components";
import NotificationMessage from "~/components/notifications/NotificationMessage.vue";

const isOpen = ref<boolean>(false);
const notificationStore = useNotificationStore()

const unreadCountComputed = computed(() => notificationStore.notifications.filter(n => !n.wasRead).length)

const showNotifications = () => {
  isOpen.value = !isOpen.value;
}

const markAllAsRead = async () => {
  await notificationStore.markAllAsRead();
}
</script>