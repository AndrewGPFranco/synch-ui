import type {IUser} from "~/types/IUser";

export interface INotification {
    createdAt: Date;
    wasRead: boolean;
    creatorUser: IUser;
    idNotification: string;
    messageContent: string;
    notificationType: string;
}