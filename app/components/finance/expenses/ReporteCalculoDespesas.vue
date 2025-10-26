<template>
  <UModal title="Reporte - Cálculo de Despesas"
          description="O cálculo é feito com base em todas as despesas dessa tabela." v-model:open="isOpen">
    <UButton label="Cálculo Despesas" icon="i-heroicons-banknotes" size="lg"
             class="fixed bottom-20 right-6 z-50 bg-linear-to-r from-gray-600 to-gray-700 hover:from-black hover:to-gray-600 cursor-pointer text-white font-semibold shadow-lg hover:shadow-gray-500/30 transition-all duration-300 transform hover:scale-105"/>

    <template #body>
      <div class="flex flex-col gap-4" v-if="props.lengthExpenses > 0">
        <UButton class="cursor-pointer" @click="calcula" :loading="isCalculating">
          Calcular Despesas
        </UButton>

        <div v-if="resultado !== 0" class="p-4 bg-gray-800 rounded-lg">
          <h3 class="text-lg font-semibold text-white mb-2">Total das Despesas:</h3>
          <p class="text-2xl font-bold text-green-400">
            {{ formatarMoeda(Number(resultado)) }}
          </p>
        </div>

        <div v-if="erro" class="p-4 bg-red-900/50 rounded-lg">
          <p class="text-red-300">{{ erro }}</p>
        </div>
      </div>
      <div v-else>
        <span>Essa tabela não contém despesas no momento!</span>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
const resultado = ref<number>(0);
const isOpen = ref<boolean>(false);
const erro = ref<string | null>(null);
const isCalculating = ref<boolean>(false);

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

const calcula = async () => {
  isCalculating.value = true;

  const responseAPI = await financeStore.calculaDespesas(props.idTable);

  if (responseAPI.getError()) {
    toast.add({title: 'Erro', description: responseAPI.getResponse() as string, color: 'error'});
    return;
  }

  isCalculating.value = false;

  resultado.value = Number(responseAPI.getResponse())
};

watch(() => isOpen.value, (newVal) => {
  if (newVal === false)
    resultado.value = 0;
})
</script>
