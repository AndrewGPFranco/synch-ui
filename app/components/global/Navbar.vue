<template>
  <UHeader>
    <template #title>
      <Icon name="i-lucide-wallet" style="color: white"/>
    </template>

    <UNavigationMenu :items="items"/>

    <template #right>
      <UTooltip text="Abrir no Github" :kbds="['meta', 'G']">
        <UButton
            color="neutral"
            variant="ghost"
            to="https://github.com/AndrewGPFranco"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="GitHub"
        />
      </UTooltip>
      <UTooltip text="Sair">
        <UButton
            color="neutral"
            variant="ghost"
            @click="logout"
            icon="i-lucide-log-out"
            aria-label="GitHub"
            class="cursor-pointer"
        />
      </UTooltip>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type {NavigationMenuItem} from '@nuxt/ui'

const route = useRoute()
const router = useRouter()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Dashboard',
    to: '/',
    active: route.path === '/'
  },
  {
    label: 'Minhas Finanças',
    to: '/finance/tables',
    active: route.path.startsWith('/finance/tables')
  },
])

const logout = () => {
  useCookie('token').value = null;
  router.replace('/auth/login')
}
</script>
