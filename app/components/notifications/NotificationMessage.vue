<script setup lang="ts">
import type {INotification} from "~/types/INotification";
import {formataDataBrasilAsString} from "~/utils/DataUtils";

type TimelineItem = {
  date: string
  title: string
  description: string
  icon: string
}

const notificationStore = useNotificationStore()

const notifications = computed(() => notificationStore.notifications)

const items = ref<TimelineItem[]>([])

onMounted(() => {
  notifications.value.forEach((item: INotification) => {
    items.value.push({
      date: formataDataBrasilAsString(item.createdAt),
      title: item.notificationType,
      description: item.messageContent,
      icon: 'i-lucide-rocket',
    })
  });
})
</script>

<template>
  <UTimeline :items="items"/>
</template>