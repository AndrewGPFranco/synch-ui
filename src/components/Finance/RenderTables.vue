<template>
    <section class="main">
        <p v-for="table in tables" :key="table.idTable">{{ table.tableName }}</p>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useFinanceStore } from '@/stores/finance-store';
import type { FinanceTableDTO } from '@/@types/FinanceTableDTO';

const tables = ref<Array<FinanceTableDTO>>([])
const financeStore = useFinanceStore();

onMounted(async () => {
    tables.value = await financeStore.getTablesByUser()
})
</script>

<style scoped lang="scss">
.main {
    display: flex;
    padding: 0 1.3em;
    flex-direction: column;
}
</style>