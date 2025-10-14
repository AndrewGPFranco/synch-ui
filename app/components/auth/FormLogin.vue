<template>
  <UForm :state="user" @submit.prevent="onSubmit"
         class="flex flex-col items-center justify-center gap-6 w-full max-w-md p-10 rounded-2xl border border-gray-700 bg-gray-900/70 backdrop-blur-md shadow-lg">
    <div class="w-full text-center mb-2">
      <h2 class="text-2xl font-semibold text-gray-100 mb-1">Acesse sua conta</h2>
      <p class="text-gray-400 text-sm">Gerencie suas finanças com o Synch</p>
    </div>

    <UFormField label="Email" name="email" class="w-full text-gray-300">
      <UInput v-model="user.email" placeholder="seu@email.com" size="lg" required
              class="w-full bg-gray-800/70 text-gray-100 placeholder-gray-500 border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition-all"
      />
    </UFormField>

    <UFormField label="Senha" name="password" class="w-full text-gray-300">
      <UInput v-model="user.password" type="password" placeholder="********" size="lg" required
              class="w-full bg-gray-800/70 text-gray-100 placeholder-gray-500 border-gray-700 focus:border-purple-500 focus:ring-purple-500 transition-all"
      />
    </UFormField>

    <UButton type="submit" size="lg" block
             class="mt-2 font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-purple-500/20 cursor-pointer"
    >
      Entrar
    </UButton>

    <p class="text-sm text-gray-400 mt-2">
      Esqueceu sua senha?
      <a href="#" class="text-purple-400 hover:text-purple-300 hover:underline transition-colors">Recuperar</a>
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