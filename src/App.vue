<template>
  <n-message-provider>
    <RouterView />
    <ActionsButton v-if="isLoggedIn" />
  </n-message-provider>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { NMessageProvider } from 'naive-ui'
import AuthService from '@/class/services/AuthService.ts'
import ActionsButton from '@/components/Global/ActionsButton.vue'
import { useAuthStore } from '@/stores/auth-store.ts'

const authStore = useAuthStore()
const authService = new AuthService()
const isLoggedIn = computed(() => authStore.loggedUser.token !== '')

onMounted(async () => {
  await authService.updateUserInformation()
})
</script>
