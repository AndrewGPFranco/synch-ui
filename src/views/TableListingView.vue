<template>
  <NavbarFinance />
  <OptionsTable />
  <SearchFilter />
  <RenderTables />
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import type { IFinanceTable } from '@/@types/IFinanceTable.ts'
import FinanceService from '@/class/services/FinanceService.ts'
import RenderTables from '@/components/Finance/RenderTables.vue'
import SearchFilter from '@/components/Finance/SearchFilter.vue'
import OptionsTable from '@/components/Finance/OptionsTable.vue'
import NavbarFinance from '@/components/Finance/NavbarFinance.vue'

const financeService = new FinanceService()
const tables = ref<Array<IFinanceTable>>([])

onMounted(async () => {
  tables.value = await financeService.getTablesByUser()
})

provide('userTables', tables)
</script>
