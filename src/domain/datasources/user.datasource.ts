import { UserModel } from "../../data/models/user.models";
import { IUserDocument } from "../entities/user.entity";

export class UserDataSource {
    public async updateUser(id: string, user: Partial<IUserDocument>) {
        await UserModel.findByIdAndUpdate(id, {
            name: user.name,
            email: user.email,
            isEmailSent: user.isEmailSent,
        });
    }
}