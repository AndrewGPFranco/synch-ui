<template>
  <main>
    <section class="container-image"></section>
    <div class="content">
      <FormLogin />
    </div>
  </main>
</template>

<script setup lang="ts">
import FormLogin from '@/components/Auth/FormLogin.vue'
</script>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;

main {
  display: flex;

  .container-image {
    width: 55vw;
    height: 100vh;
    background-position: left;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('@/assets/login.jpg');
  }
}
</style>
