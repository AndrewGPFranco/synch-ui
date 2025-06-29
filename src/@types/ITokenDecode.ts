export interface ITokenDecode {
  iss: string
  sub: string
  id: number
  email: string
  roles: Array<string>
  exp: number
}
