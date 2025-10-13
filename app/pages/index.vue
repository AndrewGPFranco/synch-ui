<template>
  <div>
    <h1>Bem vindo!</h1>
    <USeparator/>
    <UAvatar src="https://github.com/AndrewGPFranco.png"/>
    <USeparator/>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})
</script>