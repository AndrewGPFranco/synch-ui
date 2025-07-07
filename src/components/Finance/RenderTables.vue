<template>
    <section class="main">
        <h1>Tabelas</h1>
    </section>
</template>

<script setup lang="ts">
import { useFinanceStore } from '@/stores/finance-store';
import { onMounted } from 'vue';

const financeStore = useFinanceStore();

onMounted(async () => {
    await financeStore.getTablesByUser()
})
</script>

<style scoped lang="scss">
.main {
    display: flex;
    padding: 0 1.3em;
}
</style>