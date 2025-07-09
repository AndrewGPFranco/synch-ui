<template>
  <NavbarFinance />
  <OptionsTable />
  <SearchFilter />
  <RenderTables />
</template>

<script setup lang="ts">
import RenderTables from '@/components/Finance/RenderTables.vue'
import SearchFilter from '@/components/Finance/SearchFilter.vue'
import OptionsTable from '@/components/Finance/OptionsTable.vue'
import NavbarFinance from '@/components/Finance/NavbarFinance.vue'
</script>
