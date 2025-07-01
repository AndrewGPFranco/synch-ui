<style scoped lang="scss">
@use '@/assets/base' as *;

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45vw;
  height: 100vh;
  background-color: $background-login;
  padding: 4em 8em;

  .title {
    color: white;
    font-size: 2.5em;
    margin-bottom: 1.5em;
    user-select: none;
  }

  .super {
    color: red;
  }

  .card-tabs .n-tabs-nav--bar-type {
    padding-left: 4px;
  }

  .tab-login {
    gap: 10px;
    padding: 15px 0;
    display: flex;
    flex-direction: column;

    .tab-content {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    label {
      color: white;
      font-size: 1.5rem;
    }

    .btn-login {
      margin-top: 0.5em;
      padding: 0.5rem 2rem;
      width: 100%;
      border-radius: 40px;
      border: none;
      font-weight: 600;
      color: white;
      font-size: 1.5rem;
      background-color: #ff4141;
    }

    .line-separator {
      width: 100%;
      height: 1px;
      background-color: darkgray;
      margin: 20px 0;
    }

    .auth-external {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;

      button {
        padding: 8px;
        border: 1px solid purple;
        background-color: #282828;
        width: 100%;
        border-radius: 7px;
        color: white;
        font-size: 0.9rem;
      }

      .btn-github, .btn-google {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
      }
    }
  }
}
</style>

<template>
  <section class="container">
    <h1 class="title"><span class="super">S</span>ynch</h1>
    <n-tabs
      class="card-tabs"
      default-value="signin"
      size="large"
      animated
      pane-wrapper-style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <n-tab-pane name="signin">
        <template #tab>
          <span style="color: #ff4848; font-size: 1.2em">Entrar</span>
        </template>
        <section class="tab-login">
          <div class="tab-content">
            <label for="email">Email</label>
            <n-input v-model:value="email" type="text" placeholder="Digite o seu email" />
          </div>
          <div class="tab-content">
            <label for="email">Password</label>
            <n-input
              v-model:value="password"
              type="password"
              show-password-on="mousedown"
              placeholder="Digite sua senha"
            />
          </div>
          <button class="btn-login" @click="login">Login</button>
          <div class="line-separator"></div>
          <div class="auth-external">
            <button class="btn-google">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="15"
                height="15"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Entrar com Google
            </button>
            <button class="btn-github">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="15"
                height="15"
                viewBox="0 0 30 30"
              >
                <path
                  d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"
                ></path>
              </svg>
              Entrar com Github
            </button>
          </div>
        </section>
      </n-tab-pane>
      <n-tab-pane name="signup" tab="Registrar">
        <template #tab>
          <span style="color: #ff4848; font-size: 1.2em">Registrar</span>
        </template>
      </n-tab-pane>
    </n-tabs>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import AuthService from '@/class/services/AuthService.ts'
import { useMessage, NTabPane, NTabs, NInput } from 'naive-ui'
import type { IAuthInputRequest } from '@/@types/IAuthInputRequest.ts'

const authService = new AuthService()

const toast = useMessage()
const email = ref<string>('')
const password = ref<string>('')

const login = async (e: MouseEvent) => {
  e.preventDefault()

  const data: IAuthInputRequest = {
    email: email.value,
    password: password.value,
  }

  if (!authService.inputAuthIsValid(data)) toast.error('Digite um email e senha válido!')

  await authService.login(data)

  await router.push({ name: 'home' })
}
</script>
