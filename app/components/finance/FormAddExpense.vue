<template>
  <UModal title="Adicionar uma despesa" v-model:open="isOpen">
    <UButton
        label="Adicionar Despesa"
        icon="i-heroicons-plus-circle"
        size="lg"
        class="fixed bottom-6 right-6 z-50
     bg-gradient-to-r from-gray-800 to-gray-900
     hover:from-black hover:to-gray-800 cursor-pointer
     text-white font-semibold shadow-lg hover:shadow-gray-500/30
     transition-all duration-300 transform hover:scale-105"
    />

    <template #body>
      <UForm :state="expense" @submit.prevent="onSubmit" class="flex flex-col gap-6">
        <UFormField label="Nome da Despesa" name="despesa" class="w-full text-gray-300">
          <UInput
              v-model="expense.name"
              placeholder="Despesa"
              size="lg"
              required
              class="w-full bg-gray-800/70 text-gray-100 placeholder-gray-500 border-gray-700
                   focus:border-purple-500 focus:ring-purple-500 transition-all"
          />
        </UFormField>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UFormField label="Mês" name="month" class="text-gray-300">
            <USelect
                v-model="expense.month"
                :items="monthsAsList"
                @change="selectMonth"
                class="w-full bg-gray-800/70 text-gray-100 placeholder-gray-500 border-gray-700
                     focus:border-purple-500 focus:ring-purple-500 transition-all"
            />
          </UFormField>

          <UFormField label="Valor" name="amount" class="text-gray-300">
            <UInputNumber
                v-model="expense.amount"
                :min="0"
                class="w-full bg-gray-800/70 text-gray-100 placeholder-gray-500 border-gray-700
                     focus:border-purple-500 focus:ring-purple-500 transition-all"
            />
          </UFormField>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <UFormField label="Data do Pagamento" name="paymentDate" class="text-gray-300">
            <UCalendar
                v-model="expense.paymentDate"
                class="w-full bg-gray-800/70 text-gray-100 placeholder-gray-500 border-gray-700
                     focus:border-purple-500 focus:ring-purple-500 transition-all"
            />
          </UFormField>

          <UFormField label="Data de Vencimento" name="dueDate" class="text-gray-300">
            <UCalendar
                v-model="expense.dueDate"
                class="w-full bg-gray-800/70 text-gray-100 placeholder-gray-500 border-gray-700
                     focus:border-purple-500 focus:ring-purple-500 transition-all"
            />
          </UFormField>
        </div>

        <UFormField label="Categoria do Gasto" name="paymentCategory" class="w-full text-gray-300">
          <USelect
              v-model="expense.paymentCategory"
              :items="categoriesAsList"
              @change="selectCategory"
              class="w-full bg-gray-800/70 text-gray-100 placeholder-gray-500 border-gray-700
                   focus:border-purple-500 focus:ring-purple-500 transition-all"
          />
        </UFormField>

        <UButton
            type="submit"
            size="lg"
            block
            class="mt-2 font-semibold bg-purple-600 hover:bg-purple-700 text-white
                 rounded-lg transition-all duration-200 shadow-md hover:shadow-purple-500/20 cursor-pointer"
        >
          Adicionar
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type {IAddExpense} from "~/types/IAddExpense";
import {categories, categoriesAsList, months, monthsAsList} from "~/utils/Constants";

const toast = useToast();
const route = useRoute();
const isOpen = ref<boolean>(false);
const financeStore = useFinanceStore();

const emit = defineEmits(["update-expenses"]);

const selectCategory = () => {
  expense.value.paymentCategory = categories.get(expense.value.paymentCategory) as string;
}

const selectMonth = () => {
  expense.value.month = months.get(expense.value.month) as string;
}

const dateValueToDate = (dateValue: any): Date | null => {
  if (!dateValue) return null
  return new Date(dateValue.year, dateValue.month - 1, dateValue.day)
}

const expense = ref<IAddExpense>({
  idTable: "",
  name: "",
  month: "",
  amount: 0.0,
  paymentDate: null,
  paymentCategory: "",
  dueDate: null,
})

const onSubmit = async (): Promise<void> => {
  const id = route.params.id
  expense.value.idTable = id as string

  const payload = {
    ...expense.value,
    paymentDate: dateValueToDate(expense.value.paymentDate)?.toISOString().split('T')[0],
    dueDate: dateValueToDate(expense.value.dueDate)?.toISOString().split('T')[0],
  }

  const responseAPI = await financeStore.addExpense(payload)

  if (responseAPI.getError()) {
    toast.add({title: 'Erro', description: responseAPI.getResponse(), color: 'error'})
    return
  }

  clearForm();
  isOpen.value = false;
  toast.add({title: 'Sucesso', description: responseAPI.getResponse(), color: 'success'})
  emit("update-expenses", id);
}

const clearForm = () => {
  expense.value = {
    idTable: "",
    name: "",
    month: "",
    amount: 0.0,
    paymentDate: null,
    paymentCategory: "",
    dueDate: null,
  }
}
</script>