<template>
<!--  <NavbarAuth />-->
  <main>
    <FormLogin />
    <SloganAuth />
  </main>
</template>

<script setup lang="ts">
// import NavbarAuth from '@/components/Auth/NavbarAuth.vue'
import FormLogin from '@/components/Auth/FormLogin.vue'
import SloganAuth from '@/components/Auth/SloganAuth.vue'
</script>

<style scoped lang="scss">
@use '@/assets/base.scss' as *;

main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10em 20em;
  height: calc(100vh - $height-navbar);
}
</style>
