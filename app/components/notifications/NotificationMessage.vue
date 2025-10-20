<script setup lang="ts">
import type {INotification} from "~/types/INotification";
import {formataDataBrasilAsString} from "~/utils/DataUtils";

type TimelineItem = {
  date: string
  title: string
  description: string
  icon: string
  notification: INotification
}

const notificationStore = useNotificationStore()

const items = ref<TimelineItem[]>([])

const notifications = computed(() => notificationStore.notifications)

const timelineColor = computed(() => notificationStore.notifications.filter(n => !n.wasRead).length > 0 ? 'neutral' : 'success')

const handleAccept = async (notification: INotification) => {
  await notificationStore.markNotificationAsReadAndAnswered({
    idNotification: notification.idNotification,
    wasAccepted: true
  });
}

const handleReject = async (notification: INotification) => {
  await notificationStore.markNotificationAsReadAndAnswered({
    idNotification: notification.idNotification,
    wasAccepted: false
  });
}

onMounted(() => {
  notifications.value.forEach((item: INotification) => {
    items.value.push({
      date: formataDataBrasilAsString(item.createdAt),
      title: item.notificationType,
      description: item.messageContent,
      icon: 'i-lucide-rocket',
      notification: item
    })
  });
})
</script>

<template>
  <UTimeline
      :items="items"
      :default-value="2"
      :color="timelineColor"
      :ui="{ item: 'even:flex-row-reverse even:-translate-x-[calc(100%-2rem)] even:text-right' }"
      class="translate-x-[calc(50%-1rem)]"
  >
    <template #description="{ item }">
      <div>
        <p class="mb-3">{{ item.description }}</p>
        <div class="flex gap-2" v-if="!item.notification.wasAnswered">
          <UButton
              class="cursor-pointer"
              color="success"
              size="xs"
              @click="handleAccept(item.notification)"
          >
            Aceitar
          </UButton>
          <UButton
              class="cursor-pointer"
              color="warning"
              size="xs"
              @click="handleReject(item.notification)"
          >
            Negar
          </UButton>
        </div>
      </div>
    </template>
  </UTimeline>
</template>