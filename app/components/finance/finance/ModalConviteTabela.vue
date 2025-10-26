<template>
  <UModal title="Convidar" description="* Convide um usuário para utilizar a tabela" v-model:open="props.isOpen"
    @update:open="emit('close-modal')">
    <template #body>
      <div class="w-full max-w-md mx-auto">
        <UForm :state="input.email" @submit.prevent="onSubmit" class="flex flex-col gap-3">
          <UFormField label="Email do convidado" name="email" class="text-gray-300">
            <UInput type="email" placeholder="convidado@email.com" required v-model="input.email" />
          </UFormField>

          <UButton type="submit" size="lg" block
            class="mt-2 font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-purple-500/20 cursor-pointer">
            Convidar
          </UButton>
        </UForm>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import z from 'zod';
import type { IConviteTabela } from '~/types/IConviteTabela';

const toast = useToast();

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  idTable: {
    type: String,
    required: true,
  }
});

const input = ref({
  email: ""
})

const notificationStore = useNotificationStore();
const emit = defineEmits(["close-modal"])

const schema = z.object({
  email: z.email("Email necessário!")
})

const onSubmit = async () => {
  const validation = schema.safeParse(input.value);

  if (validation.error) {
    const messages = validation.error.issues.map((issue) => issue.message).join(" e ");

    toast.add({
      title: "Problema ao mandar convite",
      description: messages,
      color: "error",
    });
    return;
  }

  const data: IConviteTabela = {
    financeTableId: props.idTable,
    destinationUser: input.value.email,
    notificationType: "ACCESS_TABLE"
  }

  const responseAPI = await notificationStore.convidaUsuarioParaTabela(data);

  if (responseAPI.getError()) {
    toast.add({
      title: "Erro",
      description: responseAPI.getResponse(),
      color: "error",
    });
    return;
  }

  input.value.email = "";

  toast.add({
    title: "Sucesso",
    description: responseAPI.getResponse(),
    color: "success",
  });
  emit("close-modal");
}

watch(() => props.isOpen, (newVal) => {
  if (newVal === false)
    input.value.email = ""
})
</script>