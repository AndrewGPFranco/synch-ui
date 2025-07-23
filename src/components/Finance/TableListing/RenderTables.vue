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
            <td v-if="editingTableId !== table.idTable">
              <router-link :to="{ name: 'table-detail', params: { id: table.idTable } }">
                {{ table.tableName }}
              </router-link>
            </td>
            <td v-else class="td-edit">
              <div class="edit-container">
                <n-input
                  v-model:value="tableNameEdit"
                  type="text"
                  placeholder="Digite um novo nome para a tabela"
                  @keydown.enter="saveEdit(table.idTable)"
                  @keydown.escape="cancelEdit()"
                  size="small"
                />
                <div class="edit-actions">
                  <n-button size="small" type="primary" @click="saveEdit(table.idTable)">
                    <i class="pi pi-check"></i>
                  </n-button>
                  <n-button size="small" @click="cancelEdit()">
                    <i class="pi pi-times"></i>
                  </n-button>
                </div>
              </div>
            </td>

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
                  @select="(action) => actionToData(table.idTable, action)"
                >
                  <n-button><i style="cursor: pointer" class="pi pi-ellipsis-v"></i></n-button>
                </n-dropdown>
              </n-space>
            </td>
          </tr>
        </tbody>
      </n-table>

      <n-modal v-model:show="showModal" @update:show="handleModalClose">
        <n-card
          style="width: 600px"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
          closable
          @close="closeModal"
        >
          <div class="container-invite">
            <label for="email">Email do Convidado:</label>
            <n-input
              v-model:value="emailGuest"
              type="text"
              placeholder="Digite o email"
              @keydown.enter="sendInvite"
            />
          </div>

          <template #footer>
            <n-space justify="end">
              <n-button type="primary" @click="sendInvite">Enviar Convite</n-button>
            </n-space>
          </template>
        </n-card>
      </n-modal>

      <div class="mobile-cards">
        <div v-for="table in tables" :key="table.idTable" class="mobile-card">
          <div class="card-header">
            <div class="document-name-container">
              <h3 v-if="editingTableId !== table.idTable" class="document-name">
                {{ table.tableName }}
              </h3>
              <div v-else class="mobile-edit-container">
                <n-input
                  v-model:value="tableNameEdit"
                  type="text"
                  placeholder="Digite um novo nome"
                  @keydown.enter="saveEdit(table.idTable)"
                  @keydown.escape="cancelEdit()"
                  size="small"
                />
                <div class="mobile-edit-actions">
                  <n-button size="small" type="primary" @click="saveEdit(table.idTable)">
                    <i class="pi pi-check"></i>
                  </n-button>
                  <n-button size="small" @click="cancelEdit()">
                    <i class="pi pi-times"></i>
                  </n-button>
                </div>
              </div>
            </div>
            <n-dropdown
              trigger="click"
              :options="options"
              @select="(action) => actionToData(table.idTable, action)"
            >
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
import { inject, ref, type Ref, watch } from 'vue'
import DataUtils from '@/class/services/DataUtils.ts'
import { useFinanceStore } from '@/stores/finance-store.ts'
import type { IFinanceTable } from '@/@types/IFinanceTable.ts'
import FinanceService from '@/class/services/FinanceService.ts'
import NotificationService from '@/class/services/NotificationService.ts'
import { NDropdown, NInput, NButton, NSpace, NModal, NCard, useMessage } from 'naive-ui'

const toast = useMessage()
const financeStore = useFinanceStore()
const emailGuest = ref<string>('')
const financeService = new FinanceService()
const showModal = ref<boolean>(false)
const tableNameEdit = ref<string>('')
const idTableClicked = ref<string>('')
const notificationService = new NotificationService()
const editingTableId = ref<string | null>(null)
const tables = inject('userTables') as Ref<IFinanceTable[]>
const options = [
  { label: 'Editar', key: 'edit' },
  { label: 'Apagar', key: 'delete' },
  { label: 'Enviar convite', key: 'send' },
]

const actionToData = async (idTable: string, action: string) => {
  if (action === 'send') {
    showModal.value = true
    console.log(idTable)
    idTableClicked.value = idTable
  } else if (action === 'delete') {
    const response = await financeService.deleteTable(idTable)

    if (response.getError() === null) {
      toast.success(String(response.getResponse()))
      return
    }

    toast.error(String(response.getError()))
  } else if (action === 'edit') {
    startEdit(idTable)
  }
}

const closeModal = () => {
  showModal.value = false
}

const handleModalClose = (value: boolean) => {
  showModal.value = value
}

const sendInvite = async () => {
  const responseAPI = await notificationService.sendInvite(emailGuest.value, idTableClicked.value)

  if (responseAPI.getError() === null) {
    toast.success(String(responseAPI.getResponse()))
    closeModal()
  } else toast.error(String(responseAPI.getError()))
}

const startEdit = (idTable: string) => {
  const table = tables.value.find((t) => t.idTable === idTable)
  if (table) {
    editingTableId.value = idTable
    tableNameEdit.value = table.tableName
  }
}

const saveEdit = async (idTable: string) => {
  if (!tableNameEdit.value.trim()) {
    toast.warning('O nome da tabela não pode estar vazio')
    return
  }

  const response = await financeService.editTableName(idTable, tableNameEdit.value)

  if (response.getError() === null) {
    toast.success(String(response.getResponse()))
    cancelEdit()
    return
  }

  toast.error(String(response.getError()))
}

const cancelEdit = () => {
  editingTableId.value = null
  tableNameEdit.value = ''
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

        a {
          text-decoration: none;
          color: black;
        }

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

        &.td-edit {
          padding: 12px 16px;
        }
      }
    }
  }
}

.edit-container {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.edit-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
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

.document-name-container {
  flex: 1;
  min-width: 0;
}

.document-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
  word-wrap: break-word;
}

.mobile-edit-container {
  width: 100%;
}

.mobile-edit-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
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

.container-invite {
  display: flex;
  gap: 12px;
  flex-direction: column;
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

      &.td-edit {
        padding: 10px 12px;
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

  .mobile-edit-actions {
    justify-content: flex-start;
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

  .edit-actions {
    gap: 2px;
  }
}
</style>
