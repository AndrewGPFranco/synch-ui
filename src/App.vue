<template>
  <n-message-provider>
    <RouterView />
    <ActionsButton v-if="isLoggedIn" />
  </n-message-provider>
</template>

<script setup lang="ts">
import router from './router'
import { computed, onMounted } from 'vue'
import { NMessageProvider } from 'naive-ui'
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store.ts'
import AuthService from '@/class/services/AuthService.ts'
import ActionsButton from '@/components/Global/ActionsButton.vue'

const route = useRoute()
const authStore = useAuthStore()
const authService = new AuthService()
const isLoggedIn = computed(() => authStore.loggedUser.token !== '')

onMounted(async () => {
  await authService.updateUserInformation()

  if (route.path !== '/auth') {
    const isValid = await authStore.validToken()

    if (!isValid) await router.push({ name: 'login' })
  }
})
</script>
