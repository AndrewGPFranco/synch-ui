<template>
  <main
      class="flex items-center justify-center gap-20 w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 overflow-y-auto overflow-x-hidden"
  >
    <section
        class="flex flex-col justify-center items-center text-center px-6 py-16 md:py-24 relative z-10 min-h-screen"
    >
      <div class="flex flex-col items-center gap-3 mb-12">
        <UIcon name="i-lucide-lightbulb" class="w-12 h-12 text-purple-400 drop-shadow-md"/>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-100 tracking-tight">
          Synch | Finanças
        </h1>
        <p class="text-gray-400 text-lg max-w-md leading-relaxed">
          Gerencie suas finanças com
          <span class="text-purple-400 font-semibold">inteligência e precisão</span>.
        </p>
      </div>

      <div class="flex justify-center gap-6 text-purple-400">
        <UIcon
            name="i-lucide-bar-chart-3"
            class="w-7 h-7 hover:text-purple-300 transition-colors duration-200"
        />
        <UIcon
            name="i-lucide-wallet"
            class="w-7 h-7 hover:text-purple-300 transition-colors duration-200"
        />
        <UIcon
            name="i-lucide-pie-chart"
            class="w-7 h-7 hover:text-purple-300 transition-colors duration-200"
        />
      </div>

      <footer class="mt-12 text-gray-500 text-sm">
        © 2025 Synch | Finanças — Todos os direitos reservados.
      </footer>
    </section>
    <section>
      <FormRegister class="w-full max-w-lg"/>
    </section>
  </main>
</template>

<script setup lang="ts">
import FormRegister from "~/components/auth/FormRegister.vue";

definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Synch | Finanças - Cadastro',
  meta: [
    {name: 'description', content: 'Página para realizar cadastro na plataforma.'},
  ],
})
</script>