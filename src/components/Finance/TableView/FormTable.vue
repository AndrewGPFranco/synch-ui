<template>
  <form>
    <n-input v-model:value="name" type="text" placeholder="Descrição..." />
    <n-input v-model:value="month" type="text" placeholder="Mês..." />
    <n-input-number v-model:value="amount" clearable placeholder="Valor..." />

    <n-button type="info"> Adicionar</n-button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NInput, NInputNumber } from 'naive-ui'
import type { MonthType } from '@/@types/MonthType.ts'

const name = ref<string>()
const amount = ref<number>()
const month = ref<MonthType>()
</script>
