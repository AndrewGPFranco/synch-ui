<template>
  <section class="tab-register">
    <div class="tab-content">
      <label for="name">Nome</label>
      <n-input v-model:value="userRegister.name" type="text" placeholder="Digite seu nome" />
    </div>

    <div class="tab-content">
      <label for="fullname">Nome completo</label>
      <n-input
        v-model:value="userRegister.fullname"
        type="text"
        placeholder="Digite seu nome completo"
      />
    </div>

    <div class="tab-content">
      <label for="email">Email</label>
      <n-input v-model:value="userRegister.email" type="text" placeholder="Digite seu email" />
    </div>

    <div class="tab-content">
      <label for="nickname">Apelido</label>
      <n-input v-model:value="userRegister.nickname" type="text" placeholder="Digite um apelido" />
    </div>

    <div class="tab-content">
      <label for="password">Senha</label>
      <n-input
        v-model:value="userRegister.password"
        type="password"
        show-password-on="mousedown"
        placeholder="Digite sua senha"
      />
    </div>

    <div class="tab-content">
      <label for="password">Confirmar senha</label>
      <n-input
        v-model:value="passwordConfirm"
        type="password"
        show-password-on="mousedown"
        placeholder="Digite sua senha novamente"
      />
    </div>

    <div class="tab-content">
      <label for="birthDate">Data de Nascimento</label>
      <n-date-picker
        v-model:value="birthDateValue"
        type="date"
        placeholder="Selecione sua data de nascimento"
        :default-value="null"
      />
    </div>

    <button class="btn-register" @click="register">Cadastrar-se</button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuthService from '@/class/services/AuthService'
import { NInput, NDatePicker, useMessage } from 'naive-ui'
import type { IUserRegister } from '@/@types/IUserRegister'

const toast = useMessage()
const authService = new AuthService()
const passwordConfirm = ref<string>('')

const emit = defineEmits(['registerComplete'])

const birthDateValue = ref<number | null>(null)

const userRegister = ref<IUserRegister>({
  name: '',
  email: '',
  fullname: '',
  nickname: '',
  password: '',
  birthDate: null,
})

const formatDateToLocalDateTime = (timestamp: number | null): Date | null => {
  if (!timestamp) return null

  const date = new Date(timestamp)

  const localDate = new Date(date.getTime())

  return localDate
}

const register = async () => {
  if (userRegister.value.password !== passwordConfirm.value) {
    toast.info('As senhas não conferem!')
    return
  }

  const userData: IUserRegister = {
    ...userRegister.value,
    birthDate: formatDateToLocalDateTime(birthDateValue.value),
  }

  try {
    await authService.register(userData)
    toast.success('Usuário cadastrado com sucesso!')
    emit('registerComplete')
  } catch (error) {
    toast.error('Erro ao cadastrar usuário!')
  }
}
</script>

<style scoped lang="scss">
.tab-register {
  gap: 15px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  max-height: 100vh;

  label {
    color: #e0e0e0;
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 5px;
    transition: color 0.3s ease;
    letter-spacing: 0.5px;
  }

  .btn-register {
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

.btn-login {
  animation: fadeInUp 0.5s ease forwards;
  animation-delay: 0.2s;
}

.auth-external {
  animation: fadeInUp 0.5s ease forwards;
  animation-delay: 0.3s;
}
</style>
