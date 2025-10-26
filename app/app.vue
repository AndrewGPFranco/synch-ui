<template>
  <UApp :toaster="{ duration: 2000, position: 'top-right' }">
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
import {jwtDecode} from 'jwt-decode'
import {ref, watch, onMounted} from 'vue'
import {useRoute, useCookie} from 'nuxt/app'
import type {IDecodeJWT} from './types/IDecodeJWT'

const route = useRoute()
const show = ref<boolean>(true)
const authStore = useAuthStore()
const rotasSemNavbarFooter = new Set(["/auth/login", "/auth/register"])

const handleShowElements = () => {
  rotasSemNavbarFooter.has(route.path) ? show.value = false : show.value = true
}

watch(() => route.path, () => handleShowElements())

onMounted(async () => {
  const token = useCookie('token').value;

  if (token) {
    const decoded: IDecodeJWT = jwtDecode(token);

    await authStore.getUserLogged(decoded.id, token);
  }
  handleShowElements();
})
</script>