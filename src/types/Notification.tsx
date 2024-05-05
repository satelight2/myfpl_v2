import { User } from "./User";

export interface TypeNotification {
    isRead: boolean;
    isSent: boolean;
    _id: string;
    content: string;
    user: User;
    type: string;
    createdAt: string;
    updatedAt: string;
}