<template>
  <UTable :data="expensesCopy" :columns="columns" class="w-full p-10"/>
</template>

<script setup lang="ts">
import type {IExpense} from '~/types/IExpense';
import {UButton, UDropdownMenu} from "#components";
import type {TableColumn, TableRow} from '#ui/components/Table.vue';

const toast = useToast();
const deletedIds = new Set<string>();
const financeStore = useFinanceStore();

const props = defineProps({
  expenses: {
    type: Array as PropType<IExpense[]>,
    required: true,
  }
});

const expensesCopy = ref<IExpense[]>([...props.expenses])

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

const deleteItem = async (id: string) => {
  const responseAPI = await financeStore.deleteItem(id);

  if (responseAPI.getError()) {
    toast.add({title: 'Erro', description: responseAPI.getResponse(), color: 'error'});
    return;
  }

  toast.add({title: 'Sucesso', description: responseAPI.getResponse(), color: 'success'})

  deletedIds.add(id);

  expensesCopy.value = props.expenses.filter((item: IExpense) => !deletedIds.has(item.idExpense));
}

const columns: TableColumn<IExpense>[] = [
  {accessorKey: 'idExpense', header: 'ID'},
  {accessorKey: 'name', header: 'Nome'},
  {
    accessorKey: 'month',
    header: 'Mês',
    cell: ({row}: {row: TableRow<IExpense>}) => {
      return getMonth(row);
    }
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({row}: {row: TableRow<IExpense>}) => {
      const value = row.getValue("amount") as number;
      return Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value)
    }
  },
  {
    accessorKey: 'paymentCategory',
    header: 'Categoria',
    cell: ({row}: {row: TableRow<IExpense>}) => {
      return getPaymentCategory(row);
    }
  },
  {
    accessorKey: 'paymentDate',
    header: 'Data do Pagamento',
    cell: ({row}: {row: TableRow<IExpense>}) => {
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
    cell: ({row}: {row: TableRow<IExpense>}) => {
      const dateStr = row.getValue('dueDate')
      return new Date(dateStr + 'T00:00:00').toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
  },
  {
    id: 'actions',
    cell: ({row}: {row: TableRow<IExpense>}) => {
      return h(
          'div',
          {class: 'text-right'},
          h(
              //@ts-ignore
              UDropdownMenu,
              {
                content: {
                  align: 'end'
                },
                items: getRowItems(row),
                'aria-label': 'Actions dropdown'
              },
              () =>
                  h(UButton, {
                    icon: 'i-lucide-ellipsis-vertical',
                    color: 'neutral',
                    variant: 'ghost',
                    class: 'ml-auto',
                    'aria-label': 'Actions dropdown'
                  })
          )
      )
    }
  }
];

const getRowItems = (row: TableRow<IExpense>) => {
  return [
    {
      type: 'label',
      label: 'Ações'
    },
    {
      type: 'separator'
    },
    {
      label: 'Remover despesa',
      onClick: async () => {
        await deleteItem(row.getValue("idExpense"));
      }
    }
  ]
}

watch(
    () => props.expenses,
    (newVal) => {
      expensesCopy.value = [...newVal]
    }
)
</script>
