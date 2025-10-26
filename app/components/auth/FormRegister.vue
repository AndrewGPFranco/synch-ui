<template>
  <UForm
      :state="user"
      @submit.prevent="onSubmit"
      class="flex flex-col items-center justify-center gap-4 w-full max-w-lg p-5 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-800/70 backdrop-blur-xl shadow-xl"
  >
    <div class="w-full text-center mb-2">
      <h2 class="text-3xl font-bold text-white tracking-tight mb-1">Cadastre-se</h2>
      <p class="text-gray-400 text-sm">Gerencie suas finanças com o <span
          class="text-purple-400 font-medium">Synch</span></p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
      <UFormField label="Nome" name="name" class="w-full text-gray-300">
        <UInput
            v-model="user.name"
            placeholder="Digite seu nome"
            size="lg"
            required
            class="w-full bg-gray-800/60 text-gray-100 placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition-all rounded-lg"
        />
      </UFormField>

      <UFormField label="Username" name="nickname" class="w-full text-gray-300">
        <UInput
            v-model="user.nickname"
            placeholder="Digite um username"
            size="lg"
            required
            class="w-full bg-gray-800/60 text-gray-100 placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition-all rounded-lg"
        />
      </UFormField>
    </div>

    <UFormField label="Email" name="email" class="w-full text-gray-300">
      <UInput
          v-model="user.email"
          placeholder="seu@email.com"
          size="lg"
          type="email"
          required
          class="w-full bg-gray-800/60 text-gray-100 placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition-all rounded-lg"
      />
    </UFormField>

    <UFormField label="Nome Completo" name="fullname" class="w-full text-gray-300">
      <UInput
          v-model="user.fullname"
          placeholder="Digite seu nome completo"
          size="lg"
          required
          class="w-full bg-gray-800/60 text-gray-100 placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition-all rounded-lg"
      />
    </UFormField>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
      <UFormField label="Senha" name="password" class="w-full text-gray-300">
        <UInput
            v-model="user.password"
            placeholder="Digite sua senha"
            :type="showSenha ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
            required
            class="w-full bg-gray-800/60 text-gray-100 placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition-all rounded-lg"
        >
          <template #trailing>
            <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showSenha ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                @click="showSenha = !showSenha"
                class="text-gray-400 hover:text-purple-400 transition-colors"
            />
          </template>
        </UInput>
      </UFormField>

      <UFormField label="Confirmar Senha" name="confirmPassword" class="w-full text-gray-300">
        <UInput
            v-model="confirmacaoSenha"
            placeholder="Repita sua senha"
            :type="showConfirmacaoSenha ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
            required
            class="w-full bg-gray-800/60 text-gray-100 placeholder-gray-500 border border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition-all rounded-lg"
        >
          <template #trailing>
            <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showConfirmacaoSenha ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                @click="showConfirmacaoSenha = !showConfirmacaoSenha"
                class="text-gray-400 hover:text-purple-400 transition-colors"
            />
          </template>
        </UInput>
      </UFormField>
    </div>

    <UFormField label="Data de Nascimento" name="birthDate" class="w-full text-gray-300">
      <UCalendar
          v-model="user.birthDate"
          class="w-full bg-gray-800/60 text-gray-100 border border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition-all rounded-lg"
      />
    </UFormField>

    <UButton
        type="submit"
        size="lg"
        block
        class="mt-4 font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-purple-500/30 cursor-pointer"
    >
      Registrar
    </UButton>

    <p class="text-sm text-gray-400 mt-4">
      Já tem conta?
      <NuxtLink
          to="/auth/login"
          class="text-purple-400 hover:text-purple-300 hover:underline font-medium transition-colors"
      >
        Fazer login
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