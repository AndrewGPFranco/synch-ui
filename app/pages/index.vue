<template>
  <main class="w-full h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900">
    <h1>Bem vindo!</h1>
    <USeparator/>
    <UAvatar src="https://github.com/AndrewGPFranco.png"/>
    <USeparator/>
    <NuxtLink to="/finance/tables">Tabela</NuxtLink>
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