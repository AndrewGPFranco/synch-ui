<template>
    <Navbar />
    <OptionsTable />
    <SearchFilter />
    <RenderTables />
</template>

<script setup lang="ts">
import Navbar from '@/components/Finance/Navbar.vue';
import OptionsTable from '@/components/Finance/OptionsTable.vue';
import RenderTables from '@/components/Finance/RenderTables.vue';
import SearchFilter from '@/components/Finance/SearchFilter.vue';
</script>