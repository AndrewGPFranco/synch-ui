<template>
  <UForm :state="user" @submit.prevent="onSubmit"
         class="flex flex-col items-center justify-center gap-6 w-full max-w-md p-10 rounded-2xl border border-gray-700 bg-gray-900/70 backdrop-blur-md shadow-lg">
    <div class="w-full text-center mb-2">
      <h2 class="text-2xl font-semibold text-gray-100 mb-1">Cadastre-se</h2>
      <p class="text-gray-400 text-sm">Gerencie suas finanças com o Synch</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UFormField label="Nome" name="name" class="w-full text-gray-300">
        <UInput v-model="user.name" placeholder="Digite seu nome" size="lg" required
                class="w-full bg-gray-800/70 text-gray-100 placeholder-gray-500 border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition-all"
        />
      </UFormField>

      <UFormField label="Username" name="nickname" class="w-full text-gray-300">
        <UInput v-model="user.nickname" placeholder="Digite um username" size="lg" required
                class="w-full bg-gray-800/70 text-gray-100 placeholder-gray-500 border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition-all"
        />
      </UFormField>
    </div>

    <UFormField label="Email" name="email" class="w-full text-gray-300">
      <UInput v-model="user.email" placeholder="seu@email.com" size="lg" required
              class="w-full bg-gray-800/70 text-gray-100 placeholder-gray-500 border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition-all"
      />
    </UFormField>

    <UFormField label="Nome Completo" name="fullname" class="w-full text-gray-300">
      <UInput v-model="user.fullname" placeholder="Digite seu nome completo" size="lg" required
              class="w-full bg-gray-800/70 text-gray-100 placeholder-gray-500 border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition-all"
      />
    </UFormField>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UFormField label="Senha" name="password" class="w-full text-gray-300">
        <UInput
            v-model="user.password"
            placeholder="Digite sua senha"
            :type="showSenha ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
        >
          <template #trailing>
            <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showSenha ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showSenha ? 'Hide password' : 'Show password'"
                :aria-pressed="showSenha"
                aria-controls="password"
                @click="showSenha = !showSenha"
            />
          </template>
        </UInput>
      </UFormField>

      <UFormField label="Confirmar Senha" name="password" class="w-full text-gray-300">
        <UInput
            v-model="confirmacaoSenha"
            placeholder="Password"
            :type="showConfirmacaoSenha ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
        >
          <template #trailing>
            <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showConfirmacaoSenha ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showConfirmacaoSenha ? 'Hide password' : 'Show password'"
                :aria-pressed="showConfirmacaoSenha"
                aria-controls="password"
                @click="showConfirmacaoSenha = !showConfirmacaoSenha"
            />
          </template>
        </UInput>
      </UFormField>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-1 gap-4">
      <UFormField label="Data de Nascimento" name="birthDate" class="text-gray-300">
        <UCalendar v-model="user.birthDate"
                   class="w-full bg-gray-800/70 text-gray-100 placeholder-gray-500 border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition-all"/>
      </UFormField>
    </div>

    <UButton type="submit" size="lg" block
             class="mt-2 font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-purple-500/20 cursor-pointer"
    >
      Registrar
    </UButton>

    <p class="text-sm text-gray-400 mt-2">
      Já tem conta?
      <NuxtLink to="/auth/login" class="text-purple-400 hover:text-purple-300 hover:underline transition-colors">Login
      </NuxtLink>
    </p>
  </UForm>
</template>

<script setup lang="ts">
import type {IUserRegister} from "~/types/IUserRegister";

const user = ref<IUserRegister>({
  name: "",
  email: "",
  birthDate: null,
  fullname: "",
  nickname: "",
  password: "",
})

const toast = useToast();
const showSenha = ref<boolean>(false)
const showConfirmacaoSenha = ref<boolean>(false)

const confirmacaoSenha = ref<string>("");

function onSubmit(): void {
  if (confirmacaoSenha.value !== user.value.password) {
    toast.add({
      title: "Senha",
      description: "As senhas não são iguais!",
      color: "info",
    })
    return;
  }
}
</script>