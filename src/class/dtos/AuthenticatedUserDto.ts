class AuthenticatedUserDto {
  private readonly _token: string
  private readonly _email: string
  private readonly _username: string

  constructor(token: string, email: string, username: string) {
    this._token = token
    this._email = email
    this._username = username
  }
}

export default AuthenticatedUserDto
