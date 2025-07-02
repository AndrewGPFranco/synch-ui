<template>
  <main>
    <h1>Home aqui</h1>
    <p>Conteúdo aqui</p>
    <router-link :to="{ name: 'login' }">Login</router-link>
    <button @click="logout">Logout</button>
  </main>
</template>

<script setup lang="ts">
import router from '@/router'
import AuthService from '@/class/services/AuthService.ts'

const authService = new AuthService()

const logout = async () => {
  authService.logout()
  await router.push({ name: 'login' })
}
</script>
