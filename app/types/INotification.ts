import type {IUser} from "~/types/IUser";

export interface INotification {
    createdAt: Date;
    wasRead: boolean;
    creatorUser: IUser;
    wasAnswered: boolean;
    idNotification: string;
    messageContent: string;
    notificationType: string;
}