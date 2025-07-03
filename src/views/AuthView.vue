<template>
  <main>
    <section class="container-image"></section>
    <div class="content">
      <FormAuth />
    </div>
  </main>
</template>

<script setup lang="ts">
import FormAuth from '@/components/Auth/FormAuth.vue'
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
    background-image: url('@/assets/login.avif');
  }
}
</style>
