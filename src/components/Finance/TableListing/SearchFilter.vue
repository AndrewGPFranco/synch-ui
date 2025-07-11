<template>
    <section class="container">
        <div class="container-search">
            <i class="pi pi-search"></i>
            <input type="search" placeholder="Pesquisar" class="inputSearch">
        </div>

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
    { label: "A definir", value: "TODO" },
    { label: "Concluídos", value: "COMPLETED" },
    { label: "Em andamento", value: "ONGOING" }
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

    .container-search {
        position: relative;
        width: 60vw;

        i {
            position: absolute;
            left: 0.8em;
            top: 50%;
            transform: translateY(-50%);
            color: #aaa;
            pointer-events: none;
        }

        .inputSearch {
            padding: 0.5em 0.5em 0.5em 2.5em;
            width: 100%;
            border-radius: 0.5em;
            border: 1px solid #ccc;
        }
    }

    .selectStatus,
    .selectFilter,
    .selectDate {
        width: 12vw;
    }
}
</style>