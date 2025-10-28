<template>
  <UModal
      title="Reporte - Cálculo de Despesas"
      description="O cálculo é feito com base em todas as despesas dessa tabela."
      v-model:open="isOpen"
  >
    <UButton
        label="Cálculo Despesas"
        icon="i-heroicons-banknotes"
        size="lg"
        class="fixed bottom-20 right-6 z-50 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-black hover:to-gray-600 cursor-pointer text-white font-semibold shadow-lg hover:shadow-gray-500/30 transition-all duration-300 transform hover:scale-105"
    />

    <template #body>
      <div v-if="props.lengthExpenses > 0" class="space-y-5">
        <div class="grid grid-cols-1 gap-3">
          <UButton
              class="cursor-pointer justify-start h-auto py-3"
              variant="outline"
              color="info"
              @click="calcula(IOperacoesCalculo.TODAS)"
              :loading="isCalculating && operacaoAtual === IOperacoesCalculo.TODAS"
              :disabled="isCalculating"
          >
            <template #leading>
              <span class="i-heroicons-calculator w-5 h-5"></span>
            </template>
            <div class="flex flex-col items-start">
              <span class="font-semibold">Calcular todas as despesas</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Incluindo pagas e a pagar</span>
            </div>
          </UButton>

          <UButton
              class="cursor-pointer justify-start h-auto py-3"
              variant="outline"
              color="warning"
              @click="calcula(IOperacoesCalculo.A_PAGAR)"
              :loading="isCalculating && operacaoAtual === IOperacoesCalculo.A_PAGAR"
              :disabled="isCalculating"
          >
            <template #leading>
              <span class="i-heroicons-clock w-5 h-5"></span>
            </template>
            <div class="flex flex-col items-start">
              <span class="font-semibold">Calcular despesas a pagar</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Apenas pendentes</span>
            </div>
          </UButton>

          <UButton
              class="cursor-pointer justify-start h-auto py-3"
              variant="outline"
              color="success"
              @click="calcula(IOperacoesCalculo.JA_PAGAS)"
              :loading="isCalculating && operacaoAtual === IOperacoesCalculo.JA_PAGAS"
              :disabled="isCalculating"
          >
            <template #leading>
              <span class="i-heroicons-check-circle w-5 h-5"></span>
            </template>
            <div class="flex flex-col items-start">
              <span class="font-semibold">Calcular despesas já pagas</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Somente quitadas</span>
            </div>
          </UButton>
        </div>

        <div
            v-if="calculoRealizado"
            class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5 shadow-sm"
        >
          <div class="flex items-start gap-3">
            <span class="i-heroicons-banknotes w-6 h-6 text-green-600 dark:text-green-400 mt-1"></span>
            <div class="flex-1">
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {{ getOperacao(operacaoAtual) }}
              </h3>
              <p class="text-3xl font-bold text-green-600 dark:text-green-400">
                {{ formatarMoeda(Number(resultado)) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-8">
        <span class="i-heroicons-inbox w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-3 block"></span>
        <p class="text-gray-600 dark:text-gray-400 font-medium">
          Essa tabela não contém despesas no momento!
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-500 mt-1">
          Adicione despesas para utilizar esta funcionalidade
        </p>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import {getOperacao, IOperacoesCalculo} from '~/types/IOperacoesCalculo';

const resultado = ref<number>(0);
const isOpen = ref<boolean>(false);
const isCalculating = ref<boolean>(false);
const calculoRealizado = ref<boolean>(false)
const operacaoAtual = ref<IOperacoesCalculo>(IOperacoesCalculo.TODAS);

const props = defineProps({
  idTable: {
    type: String,
    required: true
  },
  lengthExpenses: {
    type: Number,
    required: true
  }
})

const toast = useToast();
const financeStore = useFinanceStore();

const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

const calcula = async (operacao: IOperacoesCalculo) => {
  isCalculating.value = true;

  operacaoAtual.value = operacao;

  const responseAPI = await financeStore.calculaDespesas(props.idTable, operacao);

  if (responseAPI.getError()) {
    toast.add({title: 'Erro', description: responseAPI.getResponse() as string, color: 'error'});
    return;
  }

  isCalculating.value = false;
  calculoRealizado.value = true;

  resultado.value = Number(responseAPI.getResponse())
};

watch(() => isOpen.value, (newVal) => {
  if (newVal === false) {
    resultado.value = 0;
    calculoRealizado.value = false;
  }
})
</script>
