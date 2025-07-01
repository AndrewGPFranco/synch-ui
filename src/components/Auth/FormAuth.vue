<template>
  <section class="container">
    <h1 class="title"><span class="super">S</span>ynch</h1>
    <n-tabs
      class="card-tabs"
      default-value="signin"
      size="large"
      animated
      pane-wrapper-style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <n-tab-pane name="signin">
        <template #tab>
          <span style="color: #c056c0; font-size: 1.2em; font-weight: 600">Entrar</span>
        </template>
        <FormLogin />
      </n-tab-pane>
      <n-tab-pane name="signup">
        <template #tab>
          <span style="color: #c056c0; font-size: 1.2em; font-weight: 600">Registrar</span>
        </template>
        <FormRegister />
      </n-tab-pane>
    </n-tabs>
  </section>
</template>

<script setup lang="ts">
import { NTabPane, NTabs } from 'naive-ui'
import FormLogin from '@/components/Auth/login/FormLogin.vue'
import FormRegister from '@/components/Auth/register/FormRegister.vue'
</script>

<style scoped lang="scss">
@use '@/assets/base' as *;

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45vw;
  height: 100vh;
  background-color: $background-login;
  padding: 4em 8em;

  .title {
    color: white;
    font-size: 2.5em;
    margin-bottom: 1.5em;
    user-select: none;
    font-weight: 700;
    text-shadow: 0 2px 10px rgba(255, 65, 65, 0.3);
  }

  .super {
    color: #ff4141;
    text-shadow: 0 0 20px rgba(255, 65, 65, 0.5);
  }

  .card-tabs .n-tabs-nav--bar-type {
    padding-left: 4px;
  }
}
</style>
