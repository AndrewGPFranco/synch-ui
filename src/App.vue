<template>
  <n-message-provider>
    <RouterView />
  </n-message-provider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { NMessageProvider } from 'naive-ui'
import AuthService from '@/class/services/AuthService.ts'

const authService = new AuthService()

onMounted(async () => {
  await authService.updateUserInformation()
})
</script>
