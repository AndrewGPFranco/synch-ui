<template>
  <UTable :data="financesCopy" :columns="columns" class="w-full p-10"/>
</template>

<script setup lang="ts">
import type {IUser} from "~/types/IUser";
import type {IExpense} from "~/types/IExpense";
import {useFinanceStore} from "~/stores/finance-store";
import type {ITableFinance} from "~/types/ITableFinance";
import {NuxtLink, UButton, UDropdownMenu} from "#components";
//@ts-ignore
import type {TableColumn, TableRow} from "#ui/components/Table.vue";

const toast = useToast();
const deletedIds = new Set<string>();
const data = ref<ITableFinance[]>([]);
const financeStore = useFinanceStore();
const financesCopy = ref<ITableFinance[]>([] as ITableFinance[])

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
    cell: ({row}: {row: TableRow<ITableFinance>}) => {
      return h(
          NuxtLink,
          {
            to: `/finance/tables/${row.original.idTable}`,
            class: 'text-blue-300 hover:underline'
          },
          {default: () => row.getValue('tableName')}
      )
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
    cell: ({row}: {row: TableRow<ITableFinance>}) => {
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
    cell: ({row}: {row: TableRow<ITableFinance>}) => {
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
    cell: ({row}: {row: TableRow<ITableFinance>}) => {
      const users: IUser[] = row.getValue('users');
      return users.map((user: IUser) => user.nickname).join(', ');
    }
  },
  {
    accessorKey: 'expenses',
    header: 'Total de itens',
    cell: ({row}: {row: TableRow<ITableFinance>}) => {
      return row.getValue<IExpense[]>('expenses').length;
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
      label: 'Remover tabela',
      onClick: async () => {
        await deleteTable(row.getValue("idTable"));
      }
    }
  ]
}

const deleteTable = async (id: string) => {
  const responseAPI = await financeStore.deleteTable(id);

  if (responseAPI.getError()) {
    toast.add({title: 'Erro', description: responseAPI.getResponse(), color: 'error'});
    return;
  }

  toast.add({title: 'Sucesso', description: responseAPI.getResponse(), color: 'success'})

  deletedIds.add(id);

  financesCopy.value = data.value.filter((item: ITableFinance) => !deletedIds.has(item.idTable));
}

onMounted(async () => {
  data.value = await financeStore.getTablesByUser()
  financesCopy.value = data.value
});
</script>