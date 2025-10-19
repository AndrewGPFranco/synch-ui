<template>
  <UModal :title="props.title" @update:open="emit('close-modal', false)" v-model:open="props.isOpen">
    <template #body>
      <div class="flex flex-col items-center gap-4 text-center">
        <p class="text-lg">
          {{ props.messageAsk }}
        </p>
        <div class="flex gap-3 mt-6 w-full">
          <UButton
              color="neutral"
              variant="outline"
              size="lg"
              class="flex-1 cursor-pointer"
              @click="closeModal(false)"
          >
            Cancelar
          </UButton>
          <UButton
              color="warning"
              size="lg"
              class="flex-1 font-semibold cursor-pointer"
              @click="closeModal(true)"
          >
            Confirmar
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import {UButton} from "#components";

const emit = defineEmits(["close-modal"])

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  messageAsk: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  }
})

const closeModal = (isDelete: boolean) => {
  emit("close-modal", isDelete);
}
</script>