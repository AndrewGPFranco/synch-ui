<template>
  <UForm :schema="schema" :state="user" class="space-y-4" @submit.prevent="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="user.email"/>
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="user.password" type="password"/>
    </UFormField>

    <UButton type="submit">
      Login
    </UButton>
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