<template>
  <div>
    <h1>Bem vindo!</h1>
    <USeparator/>
    <UAvatar src="https://github.com/AndrewGPFranco.png"/>
    <USeparator/>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Synch | Finanças - Dashboard',
  meta: [
    { name: 'description', content: 'Dashboard da plataforma' },
  ],
})
</script>