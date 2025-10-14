<template>
  <UForm
      :state="user"
      class="flex flex-col items-center justify-center gap-6 w-full max-w-md bg-white/90 p-10 rounded-2xl shadow-lg border border-gray-100"
      @submit.prevent="onSubmit"
  >
    <div class="w-full text-center mb-2">
      <h2 class="text-2xl font-semibold text-gray-800 mb-1">Acesse sua conta</h2>
      <p class="text-gray-500 text-sm">Gerencie suas finanças com o Synch</p>
    </div>

    <UFormField label="Email" name="email" class="w-full">
      <UInput
          v-model="user.email"
          placeholder="seu@email.com"
          size="lg"
          required
          class="w-full"
      />
    </UFormField>

    <UFormField label="Senha" name="password" class="w-full">
      <UInput
          v-model="user.password"
          type="password"
          placeholder="********"
          size="lg"
          required
          class="w-full"
      />
    </UFormField>

    <UButton
        type="submit"
        size="lg"
        block
        class="mt-2 font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all
          duration-200 shadow-sm hover:shadow-md cursor-pointer"
    >
      Entrar
    </UButton>

    <p class="text-sm text-gray-500 mt-2">
      Esqueceu sua senha?
      <a href="#" class="text-purple-600 hover:underline">Recuperar</a>
    </p>
  </UForm>
</template>

<script setup lang="ts">
import * as z from 'zod'
import {useAuthStore} from "~/stores/auth-store";
import type {IUserLogin} from "~/types/IUserLogin";

const schema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string('A senha é obrigatória!').min(8, 'A senha deve conter no mínimo 8 caracteres')
})

const toast = useToast()
const router = useRouter();
const authStore = useAuthStore();

const user = ref<IUserLogin>({
  email: "", password: ""
})

async function onSubmit() {
  const validation = schema.safeParse(user.value);

  if (validation.error) {
    const messages = validation.error.issues.map(issue => issue.message).join(' e ');

    toast.add({
      title: 'Problema com Login',
      description: messages,
      color: 'error'
    });
    return;
  }

  const responseAPI = await authStore.login(user.value);

  if (responseAPI.getError()) {
    toast.add({title: 'Problema com Login', description: responseAPI.getResponse(), color: 'error'});
    return;
  }

  toast.add({title: 'Sucesso', description: responseAPI.getResponse(), color: 'success'})
  await router.push("/")
}
</script>