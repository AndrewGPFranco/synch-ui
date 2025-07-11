<template>
  <form class="container-form">
    <div class="form-content">
      <div class="input-group">
        <n-input
          class="input-field"
          v-model:value="name"
          type="text"
          placeholder="Descrição..."
          size="large"
        />
        <n-select
          class="input-field"
          v-model:value="month"
          :options="options"
          size="large"
          placeholder="Mês..."
        />
        <n-input-number
          class="input-field"
          v-model:value="amount"
          clearable
          placeholder="Valor..."
          size="large"
          :precision="2"
          :show-button="false"
        />
      </div>

      <n-button
        type="primary"
        size="large"
        class="submit-button"
        :loading="false"
        @click="addExpense"
      >
        <template #icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
            />
          </svg>
        </template>
        Adicionar
      </n-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { IExpense } from '@/@types/IExpense.ts'
import { NInput, NInputNumber, NButton, NSelect } from 'naive-ui'
import FinanceService from '@/class/services/FinanceService.ts'
import MonthType, { getMonthType } from '@/@types/MonthType.ts'

const route = useRoute()
const month = ref<MonthType>()
const name = ref<string>('')
const amount = ref<number>(0)
const idTable = computed(() => route.params.id)
const financeService = new FinanceService()

const options = Object.values(MonthType).map((month) => ({
  label: month,
  value: month,
}))

const addExpense = async () => {
  const data: IExpense = {
    idTable: Number(idTable.value),
    name: name.value,
    month: getMonthType(month.value),
    amount: amount.value,
  }

  await financeService.addExpense(data)
}
</script>

<style scoped lang="scss">
.container-form {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
  padding: 0;
  overflow: hidden;
  border: 1px solid #e5e7eb;

  .form-content {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);

    .input-group {
      display: flex;
      gap: 12px;
      flex: 1;

      .input-field {
        flex: 1;
        min-width: 0;

        &:deep(.n-input) {
          border-radius: 8px;
          border: 1px solid #d1d5db;
          transition: all 0.2s ease;

          &:hover {
            border-color: #9ca3af;
          }

          &:focus-within {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
        }

        &:deep(.n-input-number) {
          border-radius: 8px;
          border: 1px solid #d1d5db;
          transition: all 0.2s ease;

          &:hover {
            border-color: #9ca3af;
          }

          &:focus-within {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
        }
      }
    }

    .submit-button {
      flex-shrink: 0;
      border-radius: 8px;
      font-weight: 600;
      letter-spacing: 0.025em;
      padding: 0 24px;
      height: 40px;
      transition: all 0.2s ease;

      &:deep(.n-button) {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        border: none;

        &:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        &:active {
          transform: translateY(0);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .container-form {
    margin: 16px;

    .form-content {
      flex-direction: column;
      gap: 12px;
      padding: 16px;

      .input-group {
        width: 100%;
        flex-direction: column;
        gap: 8px;
      }

      .submit-button {
        width: 100%;
      }
    }
  }
}

@media (max-width: 640px) {
  .container-form {
    border-radius: 8px;
    margin: 12px;

    .form-content {
      padding: 12px;
    }
  }
}
</style>
