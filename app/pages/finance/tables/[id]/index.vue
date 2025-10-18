<template>
  <main class="flex flex-col w-full h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 overflow-hidden">
    <TableFinance :expenses="expenses"/>
  </main>
</template>

<script setup lang="ts">
import type {IExpense} from "~/types/IExpense";
import TableFinance from "~/components/finance/TableFinance.vue";

const route = useRoute();
const expenses = ref<IExpense[]>([]);
const financeStore = useFinanceStore();

const getItems = async (id: string): Promise<IExpense[]> => {
  return await financeStore.getExpenses(id);
}

onMounted(async () => {
  expenses.value = await getItems(route.params.id as string);
})
</script>