<template>
  <main class="flex flex-col w-full h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 overflow-hidden">
    <section class="flex flex-col justify-center items-center text-center p-10 relative z-10">
      <div class="flex flex-col items-center gap-3 mb-10">
        <UIcon name="i-lucide-lightbulb" class="w-12 h-12 text-purple-400" />
        <h1 class="text-4xl font-bold text-gray-100 tracking-tight">Synch | Finanças</h1>
        <p class="text-gray-400 text-lg max-w-sm">
          Gerencie suas finanças com
          <span class="text-purple-400 font-semibold">inteligência e precisão</span>.
        </p>
      </div>

      <FormLogin />

      <div class="flex justify-center gap-6 mt-8 text-purple-400">
        <UIcon name="i-lucide-bar-chart-3" class="w-7 h-7 hover:text-purple-300 transition-colors duration-200" />
        <UIcon name="i-lucide-wallet" class="w-7 h-7 hover:text-purple-300 transition-colors duration-200" />
        <UIcon name="i-lucide-pie-chart" class="w-7 h-7 hover:text-purple-300 transition-colors duration-200" />
      </div>

      <footer class="mt-10 text-gray-500 text-sm">
        © 2025 Synch | Finanças — Todos os direitos reservados.
      </footer>
    </section>
  </main>
</template>


<script setup lang="ts">
import FormLogin from "~/components/auth/FormLogin.vue";

definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Synch | Finanças - Login',
  meta: [
    {name: 'description', content: 'Página para realizar autenticação na plataforma.'},
  ],
})
</script>