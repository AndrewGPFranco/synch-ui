import type { IUser } from '@/@types/IUser.ts'

export interface INotification {
  idNotification: string
  creatorUser: IUser
  messageContent: string
  wasRead: boolean
}
