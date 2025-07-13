import type { IUser } from '@/@types/IUser.ts'

export interface INotification {
  creatorUser: IUser,
  messageContent: string
}
