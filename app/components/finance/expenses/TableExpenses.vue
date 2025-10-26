<template>
  <UTable :data="expensesCopy" :columns="columns" class="w-full p-10"/>

  <ModalAsk :is-open="isOpen" message-ask="Tem certeza que deseja apagar a despesa?" title="Deletar despesa"
            @close-modal="handleCloseModal"/>
</template>

<script setup lang="ts">
import type {IExpense} from '~/types/IExpense';
import {UButton, UDropdownMenu} from "#components";
import ModalAsk from "~/components/finance/ModalAsk.vue";
import {getMonth, getPaymentCategory} from '~/utils/TableUtils';
//@ts-ignore
import type {TableColumn, TableRow} from '#ui/components/Table.vue';

const toast = useToast();
const isOpen = ref<boolean>(false);
const deletedIds = new Set<string>();
const idASerRemovido = ref<string>("");
const financeStore = useFinanceStore();

const props = defineProps({
  expenses: {
    type: Array as PropType<IExpense[]>,
    required: true,
  },
  idTable: {
    type: String,
    required: true
  }
});

const emit = defineEmits(["expense-duplicated", "despesa-paga"]);

const expensesCopy = ref<IExpense[]>([...props.expenses])

const deleteItem = async () => {
  const responseAPI = await financeStore.deleteItem(idASerRemovido.value);

  if (responseAPI.getError()) {
    toast.add({title: 'Erro', description: responseAPI.getResponse(), color: 'error'});
    return;
  }

  toast.add({title: 'Sucesso', description: responseAPI.getResponse(), color: 'success'})

  deletedIds.add(idASerRemovido.value);

  expensesCopy.value = props.expenses.filter((item: IExpense) => !deletedIds.has(item.idExpense));
}


const duplicateExpense = async (idExpense: string) => {
  const responseAPI = await financeStore.duplicateExpense(idExpense);

  if (responseAPI.getError()) {
    toast.add({title: 'Erro', description: responseAPI.getResponse(), color: 'error'});
    return;
  }

  toast.add({title: 'Sucesso', description: responseAPI.getResponse(), color: 'success'})

  emit("expense-duplicated", props.idTable);
}

async function marcarDespesaComoPaga(idDespesa: string) {
  const responseAPI = await financeStore.marcarDespesaComoPaga(idDespesa);

  if (responseAPI.getError()) {
    toast.add({title: 'Erro', description: responseAPI.getResponse(), color: 'error'});
    return;
  }

  toast.add({title: 'Info', description: responseAPI.getResponse(), color: 'info'})

  emit("despesa-paga", props.idTable);
}

const columns: TableColumn<IExpense>[] = [
  {
    accessorKey: 'idExpense',
    header: '',
    cell: () => {
      return "*"
    }
  },
  {accessorKey: 'name', header: 'Nome'},
  {
    accessorKey: 'month',
    header: 'Mês',
    cell: ({row}: { row: TableRow<IExpense> }) => {
      return getMonth(row);
    }
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({row}: { row: TableRow<IExpense> }) => {
      const value = row.getValue("amount") as number;
      return Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value)
    }
  },
  {
    accessorKey: 'paymentCategory',
    header: 'Categoria',
    cell: ({row}: { row: TableRow<IExpense> }) => {
      return getPaymentCategory(row);
    }
  },
  {
    accessorKey: 'link',
    header: 'Link',
    cell: ({row}: { row: TableRow<IExpense> }) => {
      const link = row.getValue('link') as string | null

      if (link)
        return h(
            'a',
            {
              href: link.startsWith('http') ? link : `https://${link}`,
              target: '_blank',
              rel: 'noopener noreferrer',
              class: 'text-blue-500 underline hover:text-blue-700'
            },
            'Acessar'
        )

      return 'N/D'
    }
  },
  {
    accessorKey: 'paymentDate',
    header: 'Data do Pagamento',
    cell: ({row}: { row: TableRow<IExpense> }) => {
      const dateStr = row.getValue('paymentDate')

      if (dateStr) {
        return new Date(dateStr + 'T00:00:00').toLocaleString('pt-BR', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      }

      return "Aguardando Pagamento..."
    }
  },
  {
    accessorKey: 'dueDate',
    header: 'Data de Vencimento',
    cell: ({row}: { row: TableRow<IExpense> }) => {
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
    cell: ({row}: { row: TableRow<IExpense> }) => {
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
        idASerRemovido.value = row.getValue("idExpense");
        isOpen.value = true;
      }
    },
    {
      label: 'Duplicar despesa',
      onClick: async () => {
        const idExpense = row.getValue("idExpense");
        await duplicateExpense(idExpense);
      }
    },
    {
      label: 'Marcar como Pago',
      onClick: async () => {
        const idExpense = row.getValue("idExpense");
        await marcarDespesaComoPaga(idExpense);
      }
    }
  ]
}

const handleCloseModal = (isDelete: boolean) => {
  if (isDelete)
    deleteItem();

  isOpen.value = false;
}

watch(() => props.expenses, (newVal) => {
  expensesCopy.value = [...newVal]
})
</script>
