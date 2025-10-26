<template>
  <main class="flex flex-col w-full h-screen bg-linear-to-br from-gray-900 via-gray-950 to-gray-900 overflow-hidden">
    <section class="flex flex-col gap-3">
      <ReporteCalculoDespesas 
        :idTable="route.params.id as string"
      />
      <FormAddExpense
        @update-expenses="updateExpenses"
      />
    </section>
    <TableExpenses
        :expenses="expenses"
        :idTable="route.params.id as string"
        @expense-duplicated="updateExpenses"
    />
  </main>
</template>

<script setup lang="ts">
import type {IExpense} from "~/types/IExpense";
import TableExpenses from "~/components/finance/expenses/TableExpenses.vue";
import FormAddExpense from "~/components/finance/expenses/FormAddExpense.vue";
import ReporteCalculoDespesas from "~/components/finance/expenses/ReporteCalculoDespesas.vue";

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

useHead({
  title: `Synch | Finanças - ${route.query.name}`,
  meta: [
    {name: 'description', content: 'Tabela com as despesas'},
  ],
})
</script>