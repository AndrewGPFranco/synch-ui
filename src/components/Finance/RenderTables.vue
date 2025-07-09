<template>
  <section class="main">
    <div class="table-wrapper">
      <n-table :single-line="false" class="finance-table">
        <thead>
          <tr>
            <th id="document">Documento</th>
            <th id="createdAt">Criado em</th>
            <th id="updateAt">Última alteração</th>
            <th id="status">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="table in tables" :key="table.idTable">
            <td>{{ table.tableName }}</td>
            <td>{{ DataUtils.formatDate(table.createdAt) }}</td>
            <td>{{ DataUtils.formatDate(table.updatedAt) }}</td>
            <td>
              <span class="status-badge status-concluido">{{ table.status }}</span>
            </td>
          </tr>
        </tbody>
      </n-table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import DataUtils from '@/class/services/DataUtils'
import type { IFinanceTable } from '@/@types/IFinanceTable'
import FinanceService from '@/class/services/FinanceService.ts'
import { useFinanceStore } from '@/stores/finance-store.ts'

const financeStore = useFinanceStore()
const financeService = new FinanceService()
const tables = ref<Array<IFinanceTable>>([])

onMounted(async () => {
  tables.value = await financeService.getTablesByUser()
})

watch(
  () => financeStore.tablesByUser,
  (updatedTable: Array<IFinanceTable>) => {
    tables.value = updatedTable
  },
)
</script>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 1rem;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.finance-table {
  width: 100%;
  table-layout: fixed;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #fff;
  border: 1px solid #e5e7eb;
  border-left: none;
  border-right: none;

  thead {
    tr {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-bottom: 2px solid #e2e8f0;

      th {
        width: 25%;
        padding: 16px 20px;
        font-weight: 600;
        color: #374151;
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 0.5px;
        border-right: 1px solid #e5e7eb;
        text-align: left;

        &:last-child {
          border-right: none;
        }

        &:hover {
          background-color: rgba(59, 130, 246, 0.05);
        }
      }
    }
  }

  tbody {
    tr {
      transition: all 0.3s ease;
      border-bottom: 1px solid #f1f5f9;

      &:hover {
        background-color: #f8fafc;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }

      &:last-child {
        border-bottom: none;
      }

      td {
        width: 25%;
        padding: 16px 20px;
        color: #4b5563;
        font-size: 0.9rem;
        border-right: 1px solid #f1f5f9;
        vertical-align: middle;
        word-wrap: break-word;
        overflow-wrap: break-word;

        &:last-child {
          border-right: none;
        }

        &:first-child {
          font-weight: 500;
          color: #1f2937;
        }
      }
    }
  }
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &.status-concluido {
    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
    color: #166534;
    border: 1px solid #86efac;
  }

  &.status-andamento {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #92400e;
    border: 1px solid #fcd34d;
  }

  &.status-pendente {
    background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
    color: #991b1b;
    border: 1px solid #f87171;
  }
}

@media (max-width: 768px) {
  .finance-table {
    font-size: 0.85rem;

    thead th,
    tbody td {
      padding: 12px 8px;
      font-size: 0.8rem;
    }

    thead th {
      font-size: 0.75rem;
    }

    .status-badge {
      font-size: 0.7rem;
      padding: 4px 8px;
    }
  }
}

@media (max-width: 480px) {
  .finance-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;

    thead th,
    tbody td {
      padding: 8px 4px;
      font-size: 0.75rem;
    }

    thead th {
      font-size: 0.7rem;
    }

    .status-badge {
      font-size: 0.65rem;
      padding: 3px 6px;
    }
  }
}
</style>
