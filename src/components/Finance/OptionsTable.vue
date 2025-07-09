<template>
  <section class="container-options">
    <ul class="list-options">
      <li class="option" @click="handleChangeTab('all')" :class="{ active: tabActive === 'all' }">
        Todos
        <span class="number">{{ numberAll }}</span>
      </li>
      <li
        class="option"
        @click="handleChangeTab('important')"
        :class="{ active: tabActive === 'important' }"
      >
        Importantes
        <span class="number">{{ numberImportant }}</span>
      </li>
      <li
        class="option"
        @click="handleChangeTab('draft')"
        :class="{ active: tabActive === 'draft' }"
      >
        Pausados
        <span class="number">{{ numberPaused }}</span>
      </li>
    </ul>
    <div class="line-separator"></div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const numberAll = ref<number>(0)
const numberImportant = ref<number>(0)
const numberPaused = ref<number>(0)

const tabActive = ref<string>('all')

const handleChangeTab = (nameTab: string) => {
  tabActive.value = nameTab
}
</script>

<style scoped lang="scss">
@use '@/assets/base' as *;

.container-options {
  display: flex;
  padding: 0 1.4em;
  justify-content: left;
  flex-direction: column;

  .list-options {
    display: flex;
    gap: 2em;
    list-style: none;
    padding: 0;

    .active {
      border-bottom: 2px solid $principal-color-blue;
    }

    .option {
      display: flex;
      gap: 0.7em;
      align-items: center;
      padding: 1em 0;
      cursor: pointer;

      .number {
        color: $principal-color-blue;
      }
    }
  }

  .line-separator {
    height: 1px;
    width: 100%;
    background-color: $color-border;
  }
}
</style>
