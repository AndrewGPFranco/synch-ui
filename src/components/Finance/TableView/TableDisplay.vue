<template>
  <div class="expense-table-container">
    <div class="table-header">
      <div class="header-content">
        <div class="header-info">
          <h2 class="table-title">💰 Controle de Despesas</h2>
          <p class="table-subtitle">Gerenciamento das despesas mensais</p>
        </div>
        <div class="header-stats">
          <div class="stat-card">
            <div class="stat-label">Total de Despesas</div>
            <div class="stat-value">{{ tableData.length }}</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Valor Total</div>
            <div class="stat-value">{{ formatCurrency(totalAmount) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-wrapper desktop-view">
      <n-data-table
        :columns="columns"
        :data="tableData"
        :loading="loading"
        :row-key="(row) => row.idTable"
        striped
        size="medium"
        :scroll-x="1200"
        class="expense-table"
        :row-class-name="getRowClassName"
      >
        <template #empty>
          <div class="empty-state">
            <div class="empty-illustration">
              <div class="empty-circle">
                <div class="empty-icon">💸</div>
              </div>
            </div>
            <div class="empty-content">
              <h3 class="empty-title">Nenhuma despesa encontrada</h3>
              <p class="empty-description">
                Comece adicionando suas primeiras despesas para ter um controle melhor das suas
                finanças.
              </p>
            </div>
          </div>
        </template>
      </n-data-table>
    </div>

    <div class="mobile-view">
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Carregando despesas...</p>
      </div>
      <div v-else-if="tableData.length === 0" class="empty-state">
        <div class="empty-illustration">
          <div class="empty-circle">
            <div class="empty-icon">💸</div>
          </div>
        </div>
        <div class="empty-content">
          <h3 class="empty-title">Nenhuma despesa encontrada</h3>
          <p class="empty-description">
            Comece adicionando suas primeiras despesas para ter um controle melhor das suas
            finanças.
          </p>
        </div>
      </div>
      <div v-else class="mobile-cards">
        <div
          v-for="expense in tableData"
          :key="expense.idExpense"
          class="expense-card"
          :class="getCardClassName(expense)"
        >
          <div class="card-header">
            <div class="expense-name">{{ expense.name }}</div>
            <div class="expense-month">
              <n-tag type="info" size="small" round>
                {{ formatMonth(expense.month) }}
              </n-tag>
            </div>
          </div>

          <div class="card-body">
            <div class="amount-section">
              <div class="amount-label">Valor</div>
              <div class="amount-display">
                <span class="amount-value" :class="getAmountColor(expense.amount)">
                  {{ formatCurrency(expense.amount) }}
                </span>
                <n-tag :type="getAmountCategory(expense.amount).color" size="small" round>
                  {{ getAmountCategory(expense.amount).label }}
                </n-tag>
              </div>
            </div>

            <div class="dates-section">
              <div class="date-item">
                <div class="date-label">📅 Vencimento</div>
                <div class="date-value">{{ DataUtils.formatDate(expense.dueDate) }}</div>
              </div>
              <div v-if="expense.paymentDate" class="date-item">
                <div class="date-label">✅ Pagamento</div>
                <div class="date-value">{{ DataUtils.formatDate(expense.paymentDate) }}</div>
              </div>
            </div>

            <div v-if="expense.paymentCategory" class="category-section">
              <div class="category-label">Categoria</div>
              <n-tag size="small" round>
                {{ formatCategory(expense.paymentCategory) }}
              </n-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IExpense } from '@/@types/IExpense.ts'
import { monthToNumber } from '@/@types/MonthType.ts'
import DataUtils from '@/class/services/DataUtils.ts'
import { computed, h, onMounted, ref, watch } from 'vue'
import { useFinanceStore } from '@/stores/finance-store.ts'
import type { IFinanceTable } from '@/@types/IFinanceTable.ts'
import FinanceService from '@/class/services/FinanceService.ts'
import { getDescriptionPaymentType } from '@/@types/PaymentCategoryType.ts'
import { NDataTable, NTag, NButton, NSpace, NTooltip, type DataTableColumns } from 'naive-ui'

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

const totalAmount = computed(() => {
  return tableData.value.reduce((sum, expense) => sum + expense.amount, 0)
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

const formatCategory = (category: string | null): string => {
  if (category !== null) return getDescriptionPaymentType(category)
  return '-'
}

const sortByMonth = (row1: IExpense, row2: IExpense): number => {
  const month1 = monthToNumber(row1.month)
  const month2 = monthToNumber(row2.month)
  return month1 - month2
}

const sortByAmount = (row1: IExpense, row2: IExpense): number => {
  return row1.amount - row2.amount
}

const sortByDueDate = (row1: IExpense, row2: IExpense): number => {
  if (!row1.dueDate && !row2.dueDate) return 0
  if (!row1.dueDate) return 1
  if (!row2.dueDate) return -1

  const date1 = new Date(row1.dueDate)
  const date2 = new Date(row2.dueDate)
  return date1.getTime() - date2.getTime()
}

const sortByPaymentDate = (row1: IExpense, row2: IExpense): number => {
  if (!row1.paymentDate && !row2.paymentDate) return 0
  if (!row1.paymentDate) return 1
  if (!row2.paymentDate) return -1

  const date1 = new Date(row1.paymentDate)
  const date2 = new Date(row2.paymentDate)
  return date1.getTime() - date2.getTime()
}

const getAmountColor = (amount: number): string => {
  if (amount >= 1000) return 'text-red-500'
  if (amount >= 500) return 'text-orange-500'
  if (amount >= 100) return 'text-yellow-600'
  return 'text-green-500'
}

const getAmountCategory = (amount: number) => {
  if (amount >= 1000) return { color: 'error' as const, label: 'Alto' }
  if (amount >= 500) return { color: 'warning' as const, label: 'Médio' }
  if (amount >= 100) return { color: 'info' as const, label: 'Baixo' }
  return { color: 'success' as const, label: 'Mínimo' }
}

const getRowClassName = (row: IExpense): string => {
  if (row.amount >= 1000) return 'high-expense-row'
  if (row.amount >= 500) return 'medium-expense-row'
  return 'low-expense-row'
}

const getCardClassName = (expense: IExpense): string => {
  if (expense.amount >= 1000) return 'high-expense-card'
  if (expense.amount >= 500) return 'medium-expense-card'
  return 'low-expense-card'
}

const handleDelete = async (row: IExpense) => {
  if (row.idExpense !== undefined) await financeService.deleteExpense(row.idExpense)
}

const columns: DataTableColumns<IExpense> = [
  {
    title: 'Despesa',
    key: 'name',
    minWidth: 200,
    sorter: 'default',
    ellipsis: { tooltip: true },
    render: (row) =>
      h('div', { class: 'expense-name-cell' }, [h('div', { class: 'expense-name' }, row.name)]),
  },
  {
    title: 'Período',
    key: 'month',
    width: 120,
    sorter: sortByMonth,
    render: (row) =>
      h(
        NTag,
        {
          type: 'info',
          size: 'medium',
          bordered: false,
          round: true,
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
      h('div', { class: 'amount-cell' }, [
        h(
          'span',
          { class: `amount-value ${getAmountColor(row.amount)}` },
          formatCurrency(row.amount),
        ),
        h(
          NTag,
          {
            size: 'small',
            round: true,
            type: getAmountCategory(row.amount).color,
          },
          { default: () => getAmountCategory(row.amount).label },
        ),
      ]),
  },
  {
    title: 'Vencimento',
    key: 'dueDate',
    width: 150,
    sorter: sortByDueDate,
    render: (row) =>
      h('div', { class: 'date-cell' }, [
        h('span', { class: 'date-value' }, DataUtils.formatDate(row.dueDate)),
      ]),
  },
  {
    title: 'Pagamento',
    key: 'paymentDate',
    width: 150,
    sorter: sortByPaymentDate,
    render: (row) =>
      h('div', { class: 'date-cell' }, [
        h(
          'span',
          {
            class: row.paymentDate ? 'date-value paid' : 'date-value unpaid',
          },
          row.paymentDate ? DataUtils.formatDate(row.paymentDate) : 'Pendente',
        ),
      ]),
  },
  {
    title: 'Categoria',
    key: 'paymentCategory',
    width: 150,
    sorter: 'default',
    render: (row) =>
      row.paymentCategory
        ? h(
            NTag,
            {
              size: 'small',
              round: true,
            },
            { default: () => formatCategory(row.paymentCategory) },
          )
        : h('span', { class: 'no-category' }, '-'),
  },
  {
    key: 'actions',
    width: 90,
    fixed: 'right',
    render: (row) =>
      h(
        NSpace,
        { size: 'small', justify: 'center' },
        {
          default: () => [
            h(
              NTooltip,
              {},
              {
                trigger: () =>
                  h(
                    NButton,
                    {
                      size: 'small',
                      type: 'error',
                      ghost: true,
                      round: true,
                      onClick: () => handleDelete(row),
                    },
                    { default: () => '🗑️' },
                  ),
                default: () => 'Excluir despesa',
              },
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
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  border: 1px solid #e2e8f0;
  padding: 10px;

  .table-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 24px 32px;

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }

    .header-info {
      .table-title {
        font-size: 24px;
        font-weight: 700;
        margin: 0 0 8px 0;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .table-subtitle {
        font-size: 14px;
        opacity: 0.9;
        margin: 0;
      }
    }

    .header-stats {
      display: flex;
      gap: 16px;

      .stat-card {
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border-radius: 12px;
        padding: 16px 20px;
        min-width: 120px;
        text-align: center;

        .stat-label {
          font-size: 12px;
          opacity: 0.8;
          margin-bottom: 4px;
        }

        .stat-value {
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }

  .desktop-view {
    display: block;
  }

  .mobile-view {
    display: none;
  }

  .table-wrapper {
    padding: 0;
    background: white;
  }

  .expense-table {
    :deep(.n-data-table-thead) {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);

      .n-data-table-th {
        font-weight: 600;
        color: #374151;
        border-bottom: 2px solid #e5e7eb;
        padding: 20px 16px;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }

    :deep(.n-data-table-tbody) {
      .n-data-table-tr {
        transition: all 0.3s ease;
        border-left: 4px solid transparent;

        &:hover {
          background-color: #f8fafc;
          transform: translateX(2px);
          box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
        }

        &.high-expense-row {
          border-left-color: #ef4444;
          background-color: #fef2f2;
        }

        &.medium-expense-row {
          border-left-color: #f59e0b;
          background-color: #fffbeb;
        }

        &.low-expense-row {
          border-left-color: #10b981;
          background-color: #f0fdf4;
        }
      }

      .n-data-table-td {
        padding: 16px;
        border-bottom: 1px solid #f3f4f6;
        vertical-align: middle;
      }
    }

    :deep(.n-data-table-tr--striped) {
      background-color: #fafbfc;
    }
  }

  .expense-name-cell {
    .expense-name {
      font-weight: 600;
      font-size: 14px;
      color: #374151;
      margin-bottom: 4px;
    }
  }

  .amount-cell {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .amount-value {
      font-weight: 700;
      font-size: 16px;
    }
  }

  .date-cell {
    .date-value {
      font-size: 13px;
      color: #374151;

      &.paid {
        color: #10b981;
        font-weight: 600;
      }

      &.unpaid {
        color: #ef4444;
        font-style: italic;
      }
    }
  }

  .no-category {
    color: #9ca3af;
    font-style: italic;
  }

  .mobile-cards {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: white;
  }

  .expense-card {
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
    border-left: 4px solid transparent;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.15);
    }

    &.high-expense-card {
      border-left-color: #ef4444;
      background-color: #fef2f2;
    }

    &.medium-expense-card {
      border-left-color: #f59e0b;
      background-color: #fffbeb;
    }

    &.low-expense-card {
      border-left-color: #10b981;
      background-color: #f0fdf4;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
      gap: 12px;

      .expense-name {
        font-weight: 600;
        font-size: 16px;
        color: #374151;
        flex: 1;
        line-height: 1.4;
      }

      .expense-month {
        flex-shrink: 0;
      }
    }

    .card-body {
      margin-bottom: 16px;

      .amount-section {
        margin-bottom: 16px;

        .amount-label {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .amount-display {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;

          .amount-value {
            font-weight: 700;
            font-size: 20px;
          }
        }
      }

      .dates-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 16px;

        .date-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f3f4f6;

          .date-label {
            font-size: 12px;
            color: #6b7280;
            font-weight: 500;
          }

          .date-value {
            font-size: 13px;
            color: #374151;
            font-weight: 600;
          }
        }
      }

      .category-section {
        .category-label {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }
    }
  }

  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
    background: white;

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e5e7eb;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }

    p {
      color: #6b7280;
      font-size: 14px;
      margin: 0;
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
    background: white;

    .empty-illustration {
      margin-bottom: 24px;

      .empty-circle {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;
        animation: pulse 2s ease-in-out infinite;

        .empty-icon {
          font-size: 32px;
          filter: grayscale(100%);
        }
      }
    }

    .empty-content {
      .empty-title {
        font-size: 18px;
        font-weight: 600;
        color: #374151;
        margin: 0 0 8px 0;
      }

      .empty-description {
        font-size: 14px;
        color: #6b7280;
        margin: 0;
        line-height: 1.5;
        max-width: 400px;
      }
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@media (max-width: 768px) {
  .expense-table-container {
    margin: 0;
    border-radius: 0;
    border-left: none;
    border-right: none;
    padding: 0;

    .desktop-view {
      display: none;
    }

    .mobile-view {
      display: block;
    }

    .table-header {
      padding: 20px 16px;
      border-radius: 0;

      .header-content {
        flex-direction: column;
        text-align: center;
        gap: 16px;
      }

      .header-info {
        .table-title {
          font-size: 20px;
          flex-direction: column;
          gap: 8px;
        }

        .table-subtitle {
          font-size: 13px;
        }
      }

      .header-stats {
        justify-content: center;
        width: 100%;

        .stat-card {
          flex: 1;
          min-width: 0;
          padding: 12px 16px;

          .stat-label {
            font-size: 11px;
          }

          .stat-value {
            font-size: 16px;
          }
        }
      }
    }

    .mobile-cards {
      padding: 12px;
      gap: 12px;
    }

    .expense-card {
      padding: 16px;
      border-radius: 12px;

      .card-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        margin-bottom: 12px;

        .expense-name {
          font-size: 15px;
        }
      }

      .card-body {
        margin-bottom: 12px;

        .amount-display {
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;

          .amount-value {
            font-size: 18px;
          }
        }
      }
    }

    .empty-state {
      padding: 40px 16px;

      .empty-illustration .empty-circle {
        width: 60px;
        height: 60px;

        .empty-icon {
          font-size: 24px;
        }
      }

      .empty-content {
        .empty-title {
          font-size: 16px;
        }

        .empty-description {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
