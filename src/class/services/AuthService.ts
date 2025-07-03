import { useAuthStore } from '@/stores/auth-store.ts'
import type { IAuthInputRequest } from '@/@types/IAuthInputRequest.ts'
import type { IUserRegister } from '@/@types/IUserRegister'

class AuthService {
  private readonly authStore: ReturnType<typeof useAuthStore>

  constructor() {
    this.authStore = useAuthStore()
  }

  inputAuthIsValid(data: IAuthInputRequest): boolean {
    if (data === undefined || data === null) return false
    return !(data.email.trim() === '' || data.password.trim() === '')
  }

  async login(data: IAuthInputRequest): Promise<void> {
    await this.authStore.login(data)
  }

  async updateUserInformation(): Promise<void> {
    await this.authStore.updateUserInformation(null, null)
  }

  logout(): void {
    this.authStore.logout()
  }

  async register(data: IUserRegister): Promise<void> {
    await this.authStore.register(data)
  }
}

export default AuthService
