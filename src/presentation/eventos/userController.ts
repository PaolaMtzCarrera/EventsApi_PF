import { Request, Response } from "express";
import { UserModel } from "../../data/models/user.models";

export class UserController {
    public getUsers = async (req: Request, res: Response) => {
        try {
            const users = await UserModel.find();
            res.json(users);
        } catch (error) {
            console.error(error);
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const { name, email, isEmailSent } = req.body;
            const newUser = await UserModel.create({
                name,
                email,
                isEmailSent,
            });
            return res.json(newUser);
        } catch (error) {
            console.error(error);
        }
    }
}