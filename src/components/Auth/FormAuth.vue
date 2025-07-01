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
          <span style="color: #c056c0; font-size: 1.2em; font-weight: 600">Entrar</span>
        </template>
        <section class="tab-login">
          <div class="tab-content">
            <label for="email">Email</label>
            <n-input v-model:value="email" type="text" placeholder="Digite o seu email" />
          </div>
          <div class="tab-content">
            <label for="password">Senha</label>
            <n-input
              v-model:value="password"
              type="password"
              show-password-on="mousedown"
              placeholder="Digite sua senha"
            />
          </div>
          <button class="btn-login" @click="login">Entrar</button>
          <div class="line-separator"></div>
          <div class="auth-external">
            <button class="btn-google">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="18"
                height="18"
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
              Continuar com Google
            </button>
            <button class="btn-github">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="18"
                height="18"
                viewBox="0 0 30 30"
              >
                <path
                  fill="white"
                  d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"
                ></path>
              </svg>
              Continuar com Github
            </button>
          </div>
        </section>
      </n-tab-pane>
      <n-tab-pane name="signup" tab="Registrar">
        <template #tab>
          <span style="color: #c056c0; font-size: 1.2em; font-weight: 600">Registrar</span>
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
    font-weight: 700;
    text-shadow: 0 2px 10px rgba(255, 65, 65, 0.3);
  }

  .super {
    color: #ff4141;
    text-shadow: 0 0 20px rgba(255, 65, 65, 0.5);
  }

  .card-tabs .n-tabs-nav--bar-type {
    padding-left: 4px;
  }

  .tab-login {
    gap: 20px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;

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

    .line-separator {
      width: 100%;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.2) 50%,
        transparent 100%
      );
      margin: 25px 0;
      position: relative;

      &::after {
        content: 'ou';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: $background-login;
        padding: 0 15px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.9rem;
        font-weight: 500;
      }
    }

    .auth-external {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 12px;

      button {
        padding: 12px 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
        width: 100%;
        border-radius: 12px;
        color: white;
        font-size: 0.95rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);

        &:hover {
          transform: translateY(-1px);
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        &:active {
          transform: translateY(0);
        }
      }

      .btn-github {
        &:hover {
          border-color: #333;
          background: rgba(51, 51, 51, 0.2);
        }
      }

      .btn-google {
        &:hover {
          border-color: #4285f4;
          background: rgba(66, 133, 244, 0.1);
        }
      }

      .btn-github,
      .btn-google {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;

        svg {
          transition: transform 0.3s ease;
        }

        &:hover svg {
          transform: scale(1.1);
        }
      }
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

.auth-external {
  animation: fadeInUp 0.5s ease forwards;
  animation-delay: 0.3s;
}
</style>
