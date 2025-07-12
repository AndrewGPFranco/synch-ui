class AuthenticatedUserDto {
  token: string
  email: string
  username: string

  constructor(token: string, email: string, username: string) {
    this.token = token
    this.email = email
    this.username = username
  }

  setToken(token: string) {
    this.token = token
  }

  setEmail(email: string) {
    this.email = email
  }

  setUsername(username: string) {
    this.username = username
  }
}

export default AuthenticatedUserDto;