<template>
  <section class="main">
    <div class="table-wrapper">
      <n-table :single-line="false" class="finance-table desktop-table">
        <thead>
          <tr>
            <th id="document">Documento</th>
            <th id="createdAt">Criado em</th>
            <th id="updateAt">Última alteração</th>
            <th id="status">Status</th>
            <th id="actions"></th>
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
            <td>
              <n-space>
                <n-dropdown
                  trigger="click"
                  :options="options"
                  @select="actionToData(table.idTable)"
                >
                  <n-button><i style="cursor: pointer" class="pi pi-ellipsis-v"></i></n-button>
                </n-dropdown>
              </n-space>
            </td>
          </tr>
        </tbody>
      </n-table>

      <div class="mobile-cards">
        <div v-for="table in tables" :key="table.idTable" class="mobile-card">
          <div class="card-header">
            <h3 class="document-name">{{ table.tableName }}</h3>
            <n-dropdown trigger="click" :options="options" @select="actionToData(table.idTable)">
              <n-button size="small" class="card-menu-btn">
                <i class="pi pi-ellipsis-v"></i>
              </n-button>
            </n-dropdown>
          </div>

          <div class="card-content">
            <div class="card-row">
              <span class="card-label">Criado em:</span>
              <span class="card-value">{{ DataUtils.formatDate(table.createdAt) }}</span>
            </div>

            <div class="card-row">
              <span class="card-label">Última alteração:</span>
              <span class="card-value">{{ DataUtils.formatDate(table.updatedAt) }}</span>
            </div>

            <div class="card-row">
              <span class="card-label">Status:</span>
              <span class="status-badge status-concluido">{{ table.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { inject, type Ref, watch } from 'vue'
import { NDropdown, useMessage } from 'naive-ui'
import DataUtils from '@/class/services/DataUtils'
import type { IFinanceTable } from '@/@types/IFinanceTable'
import { useFinanceStore } from '@/stores/finance-store.ts'
import FinanceService from '@/class/services/FinanceService.ts'

const toast = useMessage()
const financeStore = useFinanceStore()
const financeService = new FinanceService()
const options = [{ label: 'Apagar', key: 'delete' }]
const tables = inject('userTables') as Ref<IFinanceTable[]>

const actionToData = async (idTable: number) => {
  const response = await financeService.deleteTable(idTable)

  if (response.getError() === null) {
    toast.success(String(response.getResponse()))
    return
  }

  toast.error(String(response.getError()))
}

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

.desktop-table {
  display: table;
}

.mobile-cards {
  display: none;
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

        &#actions {
          width: 80px;
          text-align: center;
          padding: 16px 8px;
        }

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
          width: 80px;
          text-align: center;
          padding: 16px 8px;
          border-right: none;
        }

        &:nth-child(4) {
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

.mobile-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;
}

.document-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
  flex: 1;
  word-wrap: break-word;
}

.card-menu-btn {
  flex-shrink: 0;
  padding: 8px;
  min-width: auto;

  i {
    font-size: 14px;
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  &:not(:last-child) {
    padding-bottom: 8px;
    border-bottom: 1px solid #f1f5f9;
  }
}

.card-label {
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 500;
  flex-shrink: 0;
}

.card-value {
  font-size: 0.9rem;
  color: #374151;
  text-align: right;
  word-wrap: break-word;
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

@media (max-width: 1024px) {
  .finance-table {
    font-size: 0.9rem;

    thead th {
      padding: 14px 16px;
      font-size: 0.8rem;

      &#actions {
        width: 70px;
        padding: 14px 8px;
      }
    }

    tbody td {
      padding: 14px 16px;
      font-size: 0.85rem;

      &:last-child {
        width: 70px;
        padding: 14px 8px;
      }
    }

    .status-badge {
      font-size: 0.7rem;
      padding: 5px 10px;
    }
  }
}

@media (max-width: 768px) {
  .main {
    padding: 0.75rem;
  }

  .desktop-table {
    display: none;
  }

  .mobile-cards {
    display: block;
  }

  .status-badge {
    font-size: 0.7rem;
    padding: 4px 8px;
  }
}

@media (max-width: 480px) {
  .main {
    padding: 0.5rem;
  }

  .mobile-card {
    padding: 12px;
  }

  .document-name {
    font-size: 1rem;
  }

  .card-label {
    font-size: 0.8rem;
  }

  .card-value {
    font-size: 0.85rem;
  }

  .status-badge {
    font-size: 0.65rem;
    padding: 3px 6px;
  }

  .card-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}

@media (max-width: 360px) {
  .main {
    padding: 0.25rem;
  }

  .mobile-card {
    padding: 10px;
    margin-bottom: 12px;
  }

  .card-header {
    margin-bottom: 12px;
  }

  .document-name {
    font-size: 0.95rem;
  }
}
</style>
