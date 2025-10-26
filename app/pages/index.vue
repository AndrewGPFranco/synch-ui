<template>
  <main class="w-full h-screen bg-linear-to-br from-gray-900 via-gray-950 to-gray-900">
    <h1>Bem vindo!</h1>
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Synch | Finanças - Dashboard',
  meta: [
    {name: 'description', content: 'Dashboard da plataforma'},
  ],
})
</script>