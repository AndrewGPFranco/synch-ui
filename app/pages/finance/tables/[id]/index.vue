<template>
  <main class="flex flex-col w-full h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 overflow-hidden">
    <FormAddExpense
        @update-expenses="updateExpenses"
    />
    <TableExpenses
        :expenses="expenses"
    />
  </main>
</template>

<script setup lang="ts">
import type {IExpense} from "~/types/IExpense";
import TableExpenses from "~/components/finance/TableExpenses.vue";
import FormAddExpense from "~/components/finance/FormAddExpense.vue";

const route = useRoute();
const expenses = ref<IExpense[]>([]);
const financeStore = useFinanceStore();

const updateExpenses = async (id: string) => {
  expenses.value = [];
  expenses.value = await getItems(id)
}

const getItems = async (id: string): Promise<IExpense[]> => {
  return await financeStore.getExpenses(id);
}

onMounted(async () => {
  expenses.value = await getItems(route.params.id as string);
})
</script>