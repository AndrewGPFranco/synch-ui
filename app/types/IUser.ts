export interface IUser {
    id: string;
    name: string;
    email: string;
    birthDate: Date;
    nickname: string;
    fullname: string;
    pathImage: string;
    roles: Set<string>;
}