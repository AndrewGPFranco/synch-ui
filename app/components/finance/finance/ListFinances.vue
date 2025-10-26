<template>
  <UTable :data="financesCopy" :columns="columns" class="w-full p-10"/>

  <ModalAsk :is-open="isOpenModalPergunta"
            message-ask="Tem certeza que deseja apagar a tabela e suas respectivas despesas?" title="Deletar tabela"
            @close-modal="handleCloseModal"/>

  <ModalConviteTabela :id-table="idTabelaParaConvite" :is-open="isOpenModalConvite"
                      @close-modal="handleCloseModalConvite"/>
</template>

<script setup lang="ts">
import type {IUser} from "~/types/IUser";
import type {IExpense} from "~/types/IExpense";
import {useFinanceStore} from "~/stores/finance-store";
import ModalAsk from "~/components/finance/ModalAsk.vue";
import ModalConviteTabela from "./ModalConviteTabela.vue";
import type {ITableFinance} from "~/types/ITableFinance";
import {NuxtLink, UButton, UDropdownMenu} from "#components";
//@ts-ignore
import type {TableColumn, TableRow} from "#ui/components/Table.vue";

const toast = useToast();
const deletedIds = new Set<string>();
const financeStore = useFinanceStore();
const isOpenModalConvite = ref<boolean>(false);
const isOpenModalPergunta = ref<boolean>(false);

const idASerRemovido = ref<string>("");
const idTabelaParaConvite = ref<string>("");

const props = defineProps({
  tables: {
    type: Array as PropType<ITableFinance[]>,
    required: true,
  }
});

const financesCopy = ref<ITableFinance[]>([...props.tables])

const columns: TableColumn<ITableFinance>[] = [
  {
    accessorKey: 'idTable',
    header: '',
    cell: () => {
      return "*"
    }
  },
  {
    accessorKey: 'tableName',
    header: 'Nome da Tabela',
    cell: ({row}: { row: TableRow<ITableFinance> }) => {
      return h(
          NuxtLink,
          {
            to: {path: `/finance/tables/${row.original.idTable}`, query: {name: row.original.tableName}},
            class: 'text-blue-300 hover:underline'
          },
          {default: () => row.getValue('tableName')}
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: ({row}: { row: TableRow<ITableFinance> }) => {
      const dateStr = row.getValue('createdAt')
      return new Date(dateStr + '').toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Última atualização',
    cell: ({row}: { row: TableRow<ITableFinance> }) => {
      const dateStr = row.getValue('updatedAt')
      return new Date(dateStr + '').toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }
  },
  {
    accessorKey: 'users',
    header: 'Usuários',
    cell: ({row}: { row: TableRow<ITableFinance> }) => {
      const users: IUser[] = row.getValue('users');
      return users.map((user: IUser) => user.nickname).join(', ');
    }
  },
  {
    accessorKey: 'expenses',
    header: 'Total de itens',
    cell: ({row}: { row: TableRow<ITableFinance> }) => {
      return row.getValue<IExpense[]>('expenses').length;
    }
  },
  {
    id: 'actions',
    cell: ({row}: { row: TableRow<ITableFinance> }) => {
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

const getRowItems = (row: TableRow<ITableFinance>) => {
  return [
    {
      type: 'label',
      label: 'Ações'
    },
    {
      type: 'separator'
    },
    {
      label: 'Convidar',
      onClick: async () => {
        idTabelaParaConvite.value = row.getValue("idTable");
        isOpenModalConvite.value = true;
      }
    },
    {
      label: 'Remover tabela',
      onClick: async () => {
        idASerRemovido.value = row.getValue("idTable");
        isOpenModalPergunta.value = true;
      }
    },
  ]
}

const handleCloseModal = (isDelete: boolean) => {
  if (isDelete)
    deleteTable();

  isOpenModalPergunta.value = false;
}

const deleteTable = async () => {
  const responseAPI = await financeStore.deleteTable(idASerRemovido.value);

  if (responseAPI.getError()) {
    toast.add({title: 'Erro', description: responseAPI.getResponse(), color: 'error'});
    return;
  }

  toast.add({title: 'Sucesso', description: responseAPI.getResponse(), color: 'success'})

  isOpenModalPergunta.value = false;

  deletedIds.add(idASerRemovido.value);

  financesCopy.value = props.tables.filter((item: ITableFinance) => !deletedIds.has(item.idTable));
}

function handleCloseModalConvite(): void {
  isOpenModalConvite.value = false;
}

watch(() => props.tables, (newVal) => {
  financesCopy.value = [...newVal]
})
</script>