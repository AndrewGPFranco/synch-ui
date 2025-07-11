<template>
  <div class="expense-table-container">
    <n-data-table
      :columns="columns"
      :data="tableData"
      :loading="loading"
      :row-key="(row) => row.idTable"
      striped
      size="medium"
      :scroll-x="800"
      class="expense-table"
    >
      <template #empty>
        <div class="empty-state">
          <div class="empty-icon">💰</div>
          <div class="empty-text">Nenhuma despesa encontrada</div>
        </div>
      </template>
    </n-data-table>
  </div>
</template>

<script setup lang="ts">
import type { IExpense } from '@/@types/IExpense.ts'
import { monthToNumber } from '@/@types/MonthType.ts'
import { computed, h, onMounted, ref, watch } from 'vue'
import { useFinanceStore } from '@/stores/finance-store.ts'
import type { IFinanceTable } from '@/@types/IFinanceTable.ts'
import FinanceService from '@/class/services/FinanceService.ts'
import { NDataTable, NTag, NButton, NSpace, type DataTableColumns } from 'naive-ui'

const financeStore = useFinanceStore()
const data = ref<Array<IFinanceTable>>()
const financeService = new FinanceService()
const loadingRef = ref<boolean>(false)

const tableData = computed(() => {
  if (!data.value) return []

  const allExpenses: IExpense[] = []
  data.value.forEach((table) => {
    table.expenses.forEach((expense) => {
      allExpenses.push(expense)
    })
  })

  return allExpenses
})

const loading = computed(() => loadingRef.value ?? false)

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

const formatMonth = (month: string): string => {
  const monthMap: Record<string, string> = {
    '01': 'Janeiro',
    '02': 'Fevereiro',
    '03': 'Março',
    '04': 'Abril',
    '05': 'Maio',
    '06': 'Junho',
    '07': 'Julho',
    '08': 'Agosto',
    '09': 'Setembro',
    '10': 'Outubro',
    '11': 'Novembro',
    '12': 'Dezembro',
  }

  if (month.includes('-')) {
    const [year, monthNum] = month.split('-')
    return `${monthMap[monthNum] || monthNum}/${year}`
  }

  return monthMap[month] || month
}

const sortByMonth = (row1: IExpense, row2: IExpense): number => {
  const month1 = monthToNumber(row1.month)
  const month2 = monthToNumber(row2.month)
  return month1 - month2
}

const sortByAmount = (row1: IExpense, row2: IExpense): number => {
  return row1.amount - row2.amount
}

const getAmountColor = (amount: number): string => {
  if (amount >= 1000) return 'text-red-600'
  if (amount >= 500) return 'text-orange-600'
  if (amount >= 100) return 'text-yellow-600'
  return 'text-green-600'
}

const handleDelete = async (row: IExpense) => {
  await financeService.deleteExpense(row.idExpense)
}

const columns: DataTableColumns<IExpense> = [
  {
    title: 'Nome da Despesa',
    key: 'name',
    minWidth: 200,
    sorter: 'default',
    ellipsis: { tooltip: true },
    render: (row) => h('span', { class: 'font-medium' }, row.name),
  },
  {
    title: 'Mês',
    key: 'month',
    width: 150,
    sorter: sortByMonth,
    render: (row) =>
      h(
        NTag,
        {
          type: 'info',
          size: 'small',
        },
        { default: () => formatMonth(row.month) },
      ),
  },
  {
    title: 'Valor',
    key: 'amount',
    width: 150,
    sorter: sortByAmount,
    render: (row) =>
      h('span', { class: `font-bold ${getAmountColor(row.amount)}` }, formatCurrency(row.amount)),
  },
  {
    title: 'Ações',
    key: 'actions',
    width: 180,
    fixed: 'right',
    render: (row) =>
      h(
        NSpace,
        { size: 'small' },
        {
          default: () => [
            h(
              NButton,
              {
                size: 'small',
                type: 'warning',
                ghost: true,
              },
              { default: () => 'Editar' },
            ),
            h(
              NButton,
              {
                size: 'small',
                type: 'error',
                ghost: true,
                onClick: () => handleDelete(row),
              },
              { default: () => 'Excluir' },
            ),
          ],
        },
      ),
  },
]

onMounted(async () => {
  loadingRef.value = true
  try {
    data.value = await financeService.getTablesByUser()
  } catch (error) {
    console.error('Erro ao carregar despesas:', error)
  } finally {
    loadingRef.value = false
  }
})

watch(
  () => financeStore.tablesByUser,
  (updatedTable: Array<IFinanceTable>) => {
    data.value = updatedTable
  },
)
</script>

<style scoped lang="scss">
.expense-table-container {
  background: white;
  border-radius: 12px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  border: 1px solid #e5e7eb;

  .expense-table {
    :deep(.n-data-table-thead) {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);

      .n-data-table-th {
        font-weight: 600;
        color: #374151;
        border-bottom: 2px solid #e5e7eb;
        padding: 16px 12px;
      }
    }

    :deep(.n-data-table-tbody) {
      .n-data-table-tr {
        transition: all 0.2s ease;

        &:hover {
          background-color: #f8fafc;
        }
      }

      .n-data-table-td {
        padding: 14px 12px;
        border-bottom: 1px solid #f3f4f6;
      }
    }

    :deep(.n-data-table-tr--striped) {
      background-color: #fafbfc;
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 20px;
    color: #6b7280;

    .empty-icon {
      font-size: 48px;
      margin-bottom: 16px;
      opacity: 0.6;
    }

    .empty-text {
      font-size: 16px;
      font-weight: 500;
    }
  }
}

@media (max-width: 768px) {
  .expense-table-container {
    margin: 16px;
    border-radius: 8px;

    .expense-table {
      :deep(.n-data-table-thead) {
        .n-data-table-th {
          padding: 12px 8px;
          font-size: 14px;
        }
      }

      :deep(.n-data-table-tbody) {
        .n-data-table-td {
          padding: 12px 8px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
