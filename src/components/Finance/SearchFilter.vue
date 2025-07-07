<template>
    <section class="container">
        <input type="search" placeholder="Pesquisar" class="inputSearch">

        <n-date-picker type="date" placeholder="Data" class="selectDate" />

        <n-select class="selectStatus" v-model:value="selectedStatus" filterable placeholder="Status"
            :options="optionsStatus" />

        <n-select class="selectFilter" v-model:value="selectedFilter" filterable placeholder="Filtro"
            :options="optionsFilter" />
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NDatePicker, NSelect } from 'naive-ui'

const selectedFilter = ref<string | null>(null)
const selectedStatus = ref<string | null>(null)

const optionsStatus = ref([
    { label: "Todos", value: "Todos" },
    { label: "Pausados", value: "Pausados" },
    { label: "Importantes", value: "Importantes" }
])

const optionsFilter = ref([
    { label: "Filtro 1", value: "Filtro 1" },
    { label: "Filtro 2", value: "Filtro 2" },
    { label: "Filtro 3", value: "Filtro 3" }
])
</script>

<style scoped lang="scss">
.container {
    display: flex;
    padding: 1.3em;
    justify-content: space-between;

    .inputSearch {
        padding: 0.5em;
        width: 60vw;
    }

    .selectStatus,
    .selectFilter,
    .selectDate {
        width: 12vw;
    }
}
</style>