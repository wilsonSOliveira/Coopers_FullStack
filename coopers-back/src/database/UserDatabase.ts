import { IUserDB, User } from "../models/UserModel"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "Coopers_Users"


    public findByUserName = async (userName: string): Promise<IUserDB | undefined> => {
        const usersDB: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where({ userName })
        return usersDB[0]
    }

    public createUser = async (user: User) => {
        const userDB: IUserDB = {
            id: user.getId(),
            userName: user.getUserName(),
            password: user.getPassword(),
        }
        await BaseDatabase.connection(UserDatabase.TABLE_USERS)
            .insert(userDB)
    }



}
