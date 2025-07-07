<template>
    <section class="container-top">
        <div>
            <h1 class="title">Documentos</h1>
        </div>
        <div class="buttons">
            <button class="btn-print">
                <i class="pi pi-print"></i>
                Print
            </button>
            <button class="btn-create">
                <i class="pi pi-plus"></i>
                Criar documento
            </button>
        </div>
    </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '@/assets/base' as *;

.container-top {
    display: flex;
    padding: 1.3em;
    justify-content: space-between;

    .buttons {
        display: flex;
        gap: 0.7em;

        button {
            display: flex;
            align-items: center;
            border: none;
            padding: 0.7em 1em;
            border-radius: 0.2em 1em;
            font-size: 0.9em;
            cursor: pointer;
            gap: 0.5em;
        }

        .btn-print {
            background-color: transparent;
            border: 1px solid rgb(218, 218, 218);
            color: $principal-color-blue;
        }

        .btn-create {
            background-color: $principal-color-blue;
            color: white;

            i {
                font-size: 0.7em;
            }
        }
    }
}
</style>