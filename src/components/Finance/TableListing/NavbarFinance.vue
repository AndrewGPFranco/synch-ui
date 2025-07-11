<template>
  <section class="container-top">
    <div class="header-section">
      <h1 class="title">Documentos</h1>
    </div>

    <div class="actions-section">
      <button class="btn-print" @click="handlePrint" :disabled="isCreating">
        <i class="pi pi-print"></i>
        <span>Imprimir</span>
      </button>

      <div class="create-document-container">
        <button
          class="btn-create"
          @click="toggleCreateMode"
          :class="{ active: showInput }"
          :disabled="isCreating"
        >
          <i :class="showInput ? 'pi pi-times' : 'pi pi-plus'"></i>
          <span>{{ showInput ? 'Cancelar' : 'Criar Documento' }}</span>
        </button>

        <transition name="slide-down">
          <div v-if="showInput" class="input-section">
            <n-input
              ref="inputRef"
              v-model:value="tableName"
              type="text"
              placeholder="Digite o nome do documento..."
              size="medium"
              :loading="isCreating"
              @keyup.enter="handleCreateDocument"
              @keyup.escape="cancelCreate"
              maxlength="50"
              show-count
            />
            <div class="action-buttons">
              <button
                class="btn-confirm"
                @click="handleCreateDocument"
                :disabled="!isValidTableName || isCreating"
              >
                <i class="pi pi-check"></i>
                <span>{{ isCreating ? 'Criando...' : 'Confirmar' }}</span>
              </button>
              <button class="btn-cancel" @click="cancelCreate" :disabled="isCreating">
                <i class="pi pi-times"></i>
                <span>Cancelar</span>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMessage, NInput } from 'naive-ui'
import { ref, computed, nextTick, watch } from 'vue'
import FinanceService from '@/class/services/FinanceService.ts'

const toast = useMessage()
const tableName = ref<string>('')
const financeService = new FinanceService()
const showInput = ref<boolean>(false)
const isCreating = ref<boolean>(false)
const inputRef = ref<InstanceType<typeof NInput>>()

const isValidTableName = computed(() => {
  const trimmedName = tableName.value.trim()
  return trimmedName.length >= 3 && trimmedName.length <= 50
})

watch(showInput, async (newValue) => {
  if (newValue) {
    await nextTick()
    inputRef.value?.focus()
  }
})

const toggleCreateMode = () => {
  if (showInput.value) {
    cancelCreate()
  } else {
    showInput.value = true
    tableName.value = ''
  }
}

const cancelCreate = () => {
  showInput.value = false
  tableName.value = ''
  isCreating.value = false
}

const handleCreateDocument = async () => {
  if (!isValidTableName.value || isCreating.value) return

  isCreating.value = true

  try {
    await financeService.createDocument(tableName.value.trim())
    toast.success(`Documento "${tableName.value.trim()}" criado com sucesso!`)

    tableName.value = ''
    showInput.value = false
  } catch (error) {
    console.error('Erro ao criar documento:', error)
    toast.error('Erro ao criar documento. Tente novamente.')
  } finally {
    isCreating.value = false
  }
}

const handlePrint = () => {
  toast.info('Funcionalidade de impressão em desenvolvimento')
}

const cleanup = () => {
  cancelCreate()
}

defineExpose({
  cancelCreate,
  cleanup,
})
</script>

<style scoped lang="scss">
@use '@/assets/base' as *;

.container-top {
  display: flex;
  flex-direction: column;
  padding: 1.3rem;
  background: white;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
  }
}

.header-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .title {
    font-size: 1.8rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0;
  }
}

.actions-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
}

.create-document-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 200px;
  margin-bottom: -1.5em;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  gap: 0.5rem;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  i {
    font-size: 0.9rem;
  }
}

.btn-print {
  background-color: transparent;
  border: 2px solid #e0e0e0;
  color: $principal-color-blue;
  height: 40px;

  &:hover:not(:disabled) {
    border-color: $principal-color-blue;
    background-color: rgba($principal-color-blue, 0.05);
  }

  &:active {
    transform: translateY(1px);
  }
}

.btn-create {
  background-color: $principal-color-blue;
  color: white;
  position: relative;
  overflow: hidden;
  height: 40px;

  &:hover:not(:disabled) {
    background-color: darken($principal-color-blue, 10%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba($principal-color-blue, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &.active {
    background-color: #e74c3c;

    &:hover:not(:disabled) {
      background-color: darken(#e74c3c, 10%);
    }
  }
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.btn-confirm {
  background-color: #27ae60;
  color: white;
  font-size: 0.85rem;
  padding: 0.6rem 1rem;

  &:hover:not(:disabled) {
    background-color: darken(#27ae60, 10%);
  }
}

.btn-cancel {
  background-color: #95a5a6;
  color: white;
  font-size: 0.85rem;
  padding: 0.6rem 1rem;

  &:hover:not(:disabled) {
    background-color: darken(#95a5a6, 10%);
  }
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-down-enter-from {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  max-height: 200px;
  transform: translateY(0);
}

@media (max-width: 767px) {
  .container-top {
    padding: 1rem;
  }

  .actions-section {
    gap: 0.75rem;
  }

  .action-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn-confirm,
  .btn-cancel {
    width: 100%;
  }
}
</style>
