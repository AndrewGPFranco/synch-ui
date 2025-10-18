<template>
  <UTable :data="props.expenses" :columns="columns" class="w-full p-10"/>
</template>

<script setup lang="ts">
import type {IExpense} from '~/types/IExpense';
import type {TableColumn, TableRow} from '#ui/components/Table.vue';

const props = defineProps({
  expenses: {
    type: Array as PropType<IExpense[]>,
    required: true,
  }
});

const getPaymentCategory = (row: TableRow<IExpense>): string => {
  switch (row.getValue("paymentCategory")) {
    case "FIXED":
      return "Despesa FIXA";
    case "VARIABLE":
      return "Despesa variável";
    case "UNFORESEEN":
      return "Despesa imprevísivel";
    default:
      return "Categoria desconhecida";
  }
}

const getMonth = (row: TableRow<IExpense>): string => {
  switch (row.getValue("month")) {
    case "JANUARY":
      return "Janeiro";
    case "FEBRUARY":
      return "Fevereiro";
    case "MARCH":
      return "Março";
    case "APRIL":
      return "Abril";
    case "MAY":
      return "Maio";
    case "JUNE":
      return "Junho";
    case "JULY":
      return "Julho";
    case "AUGUST":
      return "Agosto";
    case "SEPTEMBER":
      return "Setembro";
    case "OCTOBER":
      return "Outubro";
    case "NOVEMBER":
      return "Novembro";
    case "DEZEMBER":
      return "Dezembro";
    default:
      return "Mês desconhecido!"
  }
}

const columns: TableColumn<IExpense>[] = [
  {accessorKey: 'name', header: 'Nome'},
  {
    accessorKey: 'month',
    header: 'Mês',
    cell: ({row}) => {
      return getMonth(row);
    }
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({row}) => {
      const value = row.getValue("amount") as number;
      return Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value)
    }
  },
  {
    accessorKey: 'paymentCategory',
    header: 'Categoria',
    cell: ({row}) => {
      return getPaymentCategory(row);
    }
  },
  {
    accessorKey: 'paymentDate',
    header: 'Data do Pagamento',
    cell: ({row}) => {
      const dateStr = row.getValue('paymentDate')
      return new Date(dateStr + 'T00:00:00').toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
  },
  {
    accessorKey: 'dueDate',
    header: 'Data de Vencimento',
    cell: ({row}) => {
      const dateStr = row.getValue('dueDate')
      return new Date(dateStr + 'T00:00:00').toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
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

const handleBackButton = () => {
  router.push('/')
}
</script>
