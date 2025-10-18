<template>
  <section class="p-10">
    <UTable :data="data" :columns="columns" class="w-full"/>
  </section>
</template>

<script setup lang="ts">
import {useFinanceStore} from "~/stores/finance-store";
import type {ITableFinance} from "~/types/ITableFinance";
import type {TableColumn} from "#ui/components/Table.vue";

const data = ref<ITableFinance[]>([]);
const financeStore = useFinanceStore();

const columns: TableColumn<ITableFinance>[] = [
  {
    accessorKey: 'tableName',
    header: 'Nome da Tabela'
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: ({row}) => {
      return new Date(row.getValue('createdAt')).toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Última atualização',
    cell: ({row}) => {
      return new Date(row.getValue('createdAt')).toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
];

onMounted(async () => {
  data.value = await financeStore.getTablesByUser()
});
</script>