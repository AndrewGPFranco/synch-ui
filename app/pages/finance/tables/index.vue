<template>
  <main class="flex flex-col w-full h-screen bg-linear-to-br from-gray-900 via-gray-950 to-gray-900 overflow-hidden">
    <FormAddFinanceTable @update-tables="getTables"/>
    <ListFinances :tables="data"/>
  </main>
</template>

<script setup lang="ts">
import ListFinances from "~/components/finance/finance/ListFinances.vue";
import FormAddFinanceTable from "~/components/finance/finance/FormAddFinanceTable.vue";
import type {ITableFinance} from "~/types/ITableFinance";

const data = ref<ITableFinance[]>([]);
const financeStore = useFinanceStore();

const getTables = async () => {
  data.value = [];
  data.value = await financeStore.getTablesByUser()
}

onMounted(async () => {
  data.value = await financeStore.getTablesByUser();
})

useHead({
  title: 'Synch | Finanças - Despesas',
  meta: [
    {name: 'description', content: 'Tabelas de despesas'},
  ],
})
</script>