<template>
  <main
      class="flex flex-col lg:flex-row w-full h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-blue-100 overflow-hidden">
    <section class="flex flex-col justify-center items-center text-center lg:w-1/2 p-10 relative z-10">
      <div class="flex flex-col items-center gap-3 mb-10">
        <UIcon name="i-lucide-lightbulb" class="w-12 h-12 text-purple-600"/>
        <h1 class="text-4xl font-bold text-gray-800 tracking-tight">Synch | Finanças</h1>
        <p class="text-gray-600 text-lg max-w-sm">
          Gerencie suas finanças com <span class="text-purple-600 font-semibold">inteligência e precisão</span>.
        </p>
      </div>

      <FormLogin/>

      <div class="flex justify-center gap-6 mt-8 text-purple-500">
        <UIcon name="i-lucide-bar-chart-3" class="w-7 h-7 hover:text-purple-700 transition-colors duration-200"/>
        <UIcon name="i-lucide-wallet" class="w-7 h-7 hover:text-purple-700 transition-colors duration-200"/>
        <UIcon name="i-lucide-pie-chart" class="w-7 h-7 hover:text-purple-700 transition-colors duration-200"/>
      </div>
    </section>

    <section class="hidden lg:flex w-1/2 relative items-center justify-center">
      <div class="absolute inset-0 bg-gradient-to-t"></div>

      <img
          src="https://images.unsplash.com/photo-1605902711622-cfb43c4437d9?auto=format&fit=crop&w=900&q=80"
          alt="Finanças Inteligentes"
          class="w-full h-full object-cover opacity-80"
      />

      <div class="absolute z-10 text-white text-center px-10">
        <h2 class="text-3xl font-semibold mb-3">Controle total das suas finanças</h2>
        <p class="text-sm text-blue-100 max-w-md mx-auto">
          Monitore seus gastos, investimentos e metas em tempo real com o Synch.
        </p>
      </div>
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