<template>
  <UApp :toaster="toaster">
    <Navbar v-if="show"/>

    <UMain>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </UMain>

    <Footer v-if="show"/>
  </UApp>
</template>

<script lang="ts" setup>
const route = useRoute()
const show = ref<boolean>(true)
const rotasSemNavbarFooter = new Set(["/auth/login"])

const toaster = {duration: 2000}

const handleShowElements = () => {
  rotasSemNavbarFooter.has(route.path) ? show.value = false : show.value = true
}

watch(() => route.path, () => handleShowElements())

onMounted(() => handleShowElements())
</script>