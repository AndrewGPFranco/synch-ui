<template>
  <UModal title="Criar tabela de despesas" v-model:open="isOpen">
    <UButton label="Adicionar Tabela" icon="i-heroicons-plus-circle" size="lg"
             class="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-black hover:to-gray-600 cursor-pointer text-white font-semibold shadow-lg hover:shadow-gray-500/30 transition-all duration-300 transform hover:scale-105"/>

    <template #body>
      <UForm :state="data.title" @submit.prevent="onSubmit" class="flex flex-col gap-6">
        <UFormField label="Nome da Tabela" name="finance" class="w-full text-gray-300">
          <UInput v-model="data.title" placeholder="Despesa" size="lg" required
                  class="w-full bg-gray-800/70 text-gray-100 placeholder-gray-500 border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition-all"/>
        </UFormField>

        <UButton type="submit" size="lg" block
                 class="mt-2 font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-purple-500/20 cursor-pointer">
          Criar Tabela
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import {z} from "zod";

const toast = useToast();
const isOpen = ref<boolean>(false);
const financeStore = useFinanceStore();

const data = ref({
  title: "",
})

const emit = defineEmits(["update-tables"]);

const schema = z.object({
  title: z.string().min(3, "O nome precisa conter 3 caracteres").max(255, "O nome ultrapassou o limite"),
})

const onSubmit = async (): Promise<void> => {
  const validation = schema.safeParse(data.value);

  if (validation.error) {
    const messages = validation.error.issues.map((issue) => issue.message).join(" e ");

    toast.add({
      title: "Problema com Tabela",
      description: messages,
      color: "error",
    });
    return;
  }

  const responseAPI = await financeStore.addFinanceTable(data.value.title);

  if (responseAPI.getError()) {
    toast.add({
      title: "Erro",
      description: responseAPI.getResponse(),
      color: "error",
    });
    return;
  }

  clearForm();
  isOpen.value = false;
  toast.add({
    title: "Sucesso",
    description: responseAPI.getResponse(),
    color: "success",
  });
  emit("update-tables");
};

const clearForm = () => {
  data.value.title = "";
};
</script>