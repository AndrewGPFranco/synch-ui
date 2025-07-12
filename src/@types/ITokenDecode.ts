export interface ITokenDecode {
  iss: string
  sub: string
  id: string
  email: string
  roles: Array<string>
  exp: number
}
