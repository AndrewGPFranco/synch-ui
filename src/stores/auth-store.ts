import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { api } from '@/network/axiosInstance.ts'
import type { IUserRegister } from '@/@types/IUserRegister'
import type { ITokenDecode } from '@/@types/ITokenDecode.ts'
import type { IAuthInputRequest } from '@/@types/IAuthInputRequest.ts'
import AuthenticatedUserDto from '@/class/dtos/AuthenticatedUserDto.ts'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: new AuthenticatedUserDto('', '', ''),
  }),
  actions: {
    async login(data: IAuthInputRequest): Promise<void> {
      const response = await api.post('/api/v1/user/login', data)
      const token = response.data.response

      localStorage.setItem('token', token)

      const tokenDecode: ITokenDecode = jwtDecode(token)

      await this.updateUserInformation(tokenDecode, token)
    },
    /**
     * Podemos receber os parâmetros nulos pois realizar essa atualização dos dados do usuário
     * no momento da abertura do site, então pode ter ou não um token salvo no LocalStorage.
     */
    async updateUserInformation(
      tokenDecode: ITokenDecode | null,
      token: string | null,
    ): Promise<void> {
      if (tokenDecode && token) {
        this.user.setUsername(tokenDecode.sub)
        this.user.setEmail(tokenDecode.email)
        this.user.setToken(token)
      } else {
        const tokenStorage: string | null = localStorage.getItem('token')

        if (tokenStorage) {
          const tokenDecode: ITokenDecode = jwtDecode(tokenStorage)
          this.user = new AuthenticatedUserDto(tokenStorage, tokenDecode.email, tokenDecode.sub)
        }
      }
    },
    async register(data: IUserRegister): Promise<void> {
      await api.post('/api/v1/user/register', data)
    },
    logout(): void {
      localStorage.removeItem('token')
      this.user.setUsername('')
      this.user.setEmail('')
      this.user.setToken('')
    },
    async validToken(): Promise<boolean> {
      const token = localStorage.getItem('token')

      if (token !== undefined) {
        const response = await api.get(`/api/v1/user/valid-token/${token}`)

        return response.data === true
      }

      localStorage.removeItem('token')

      return false
    },
  },
  getters: {
    loggedUser: (state): AuthenticatedUserDto => state.user,
  },
})
