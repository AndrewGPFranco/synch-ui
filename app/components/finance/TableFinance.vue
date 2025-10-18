<template>
  <UTable :data="props.expenses" :columns="columns" class="w-full p-10"/>
</template>

<script setup lang="ts">
import type {IExpense} from '~/types/IExpense';
import type {TableColumn} from '#ui/components/Table.vue';

const props = defineProps({
  expenses: {
    type: Array as PropType<IExpense[]>,
    required: true,
  }
});

const columns: TableColumn<IExpense>[] = [
  {accessorKey: 'name', header: 'Nome'},
  {accessorKey: 'month', header: 'Mês'},
  {accessorKey: 'amount', header: 'Valor'},
  {accessorKey: 'paymentCategory', header: 'Categoria'},
  {
    accessorKey: 'paymentDate',
    header: 'Data do Pagamento',
    cell: ({row}) => new Date(row.getValue('paymentDate')).toLocaleString('pt-BR', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    })
  },
  {
    accessorKey: 'dueDate',
    header: 'Data de Vencimento',
    cell: ({row}) => new Date(row.getValue('dueDate')).toLocaleString('pt-BR', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    })
  },
];

const router = useRouter()

onMounted(() => {
  window.history.pushState({page: 'finance'}, '', window.location.href)

  window.addEventListener('popstate', handleBackButton)
})

onUnmounted(() => {
  window.removeEventListener('popstate', handleBackButton)
})

const handleBackButton = (event: PopStateEvent) => {
  router.push('/')
}
</script>
