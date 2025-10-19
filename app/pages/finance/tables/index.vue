<template>
  <main class="flex flex-col w-full h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 overflow-hidden">
    <ListFinances/>
  </main>
</template>

<script setup lang="ts">
import ListFinances from "~/components/finance/ListFinances.vue";

useHead({
  title: 'Synch | Finanças - Despesas',
  meta: [
    {name: 'description', content: 'Tabelas de despesas'},
  ],
})
</script>