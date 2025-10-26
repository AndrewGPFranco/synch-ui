<template>
  <UHeader>
    <template #title>
      <Icon name="i-lucide-wallet" style="color: white"/>
    </template>

    <UNavigationMenu :items="items"/>

    <template #right>
      <section class="flex gap-10">
        <div>
          <UUser :name="userLogged.nickname" :avatar="{
            src: userLogged.pathImage,
            icon: 'i-lucide-image',
          }"/>
        </div>
        <div class="flex items-center">
          <UTooltip text="Abrir no Github" :kbds="['meta', 'G']">
            <UButton color="neutral" variant="ghost" to="https://github.com/AndrewGPFranco" target="_blank"
                     icon="i-simple-icons-github" aria-label="GitHub"/>
          </UTooltip>

          <Notifications/>

          <UTooltip text="Sair">
            <UButton color="neutral" variant="ghost" @click="logout" icon="i-lucide-log-out" aria-label="GitHub"
                     class="cursor-pointer"/>
          </UTooltip>
        </div>
      </section>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import {UButton} from "#components";
import type {NavigationMenuItem} from "@nuxt/ui";
import Notifications from "~/components/notifications/Notifications.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const userLogged = computed(() => authStore.user);

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Dashboard",
    to: "/",
    active: route.path === "/",
  },
  {
    label: "Minhas Finanças",
    to: "/finance/tables",
    active: route.path.startsWith("/finance/tables"),
  },
]);

const logout = () => {
  useCookie("token").value = null;
  router.replace("/auth/login");
};

onMounted(async () => {
  if (route.path !== '/auth/login')
    await notificationStore.getNotifications();
});
</script>
