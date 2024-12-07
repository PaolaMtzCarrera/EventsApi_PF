export interface IUser {
    name: string;
    email: string;
    isEmailSent?: boolean; 
}

export interface IUserDocument extends Document, IUser {}
