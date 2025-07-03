<template>
  <section class="tab-login">
    <div class="tab-content">
      <label for="email">Email</label>
      <n-input
        v-model:value="email"
        type="text"
        placeholder="Digite o seu email"
        @keydown.enter="login"
      />
    </div>
    <div class="tab-content">
      <label for="password">Senha</label>
      <n-input
        v-model:value="password"
        type="password"
        show-password-on="mousedown"
        placeholder="Digite sua senha"
        @keydown.enter="login"
      />
    </div>
    <button class="btn-login" @click="login">Entrar</button>
  </section>
</template>

<script setup lang="ts">
import { NInput, useMessage } from 'naive-ui'
import AuthService from '@/class/services/AuthService.ts'
import { ref } from 'vue'
import type { IAuthInputRequest } from '@/@types/IAuthInputRequest.ts'
import router from '@/router'

const authService = new AuthService()

const toast = useMessage()
const email = ref<string>('')
const password = ref<string>('')

const login = async (e: MouseEvent | KeyboardEvent) => {
  e.preventDefault()

  const data: IAuthInputRequest = {
    email: email.value,
    password: password.value,
  }

  if (!authService.inputAuthIsValid(data)) toast.error('Digite um email e senha válido!')

  try {
    await authService.login(data)
    await router.push({ name: 'home' })
  } catch (error) {
    toast.error(String(error))
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/base' as *;

.tab-login {
  gap: 20px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  max-height: 100vh;

  .tab-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
  }

  label {
    color: #e0e0e0;
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 5px;
    transition: color 0.3s ease;
    letter-spacing: 0.5px;
  }

  .btn-login {
    margin-top: 10px;
    padding: 14px 2rem;
    width: 100%;
    border-radius: 12px;
    border: none;
    font-weight: 600;
    color: white;
    font-size: 1.1rem;
    background: linear-gradient(135deg, #ff4141 0%, #ff6b6b 100%);
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 65, 65, 0.3);
    letter-spacing: 0.5px;
    text-transform: uppercase;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 65, 65, 0.4);
      background: linear-gradient(135deg, #ff6b6b 0%, #ff4141 100%);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 10px rgba(255, 65, 65, 0.3);
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tab-content {
  animation: fadeInUp 0.5s ease forwards;
}

.tab-content:nth-child(2) {
  animation-delay: 0.1s;
}

.btn-login {
  animation: fadeInUp 0.5s ease forwards;
  animation-delay: 0.2s;
}
</style>
