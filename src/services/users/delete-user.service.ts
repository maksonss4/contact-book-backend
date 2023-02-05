import { AppDataSource } from "../../database";
import {User} from "../../entities/user.entity"
import { AppError } from "../../errors";

export async function deleteUserService(id: string) {
    const userDatabase = AppDataSource.getRepository(User)
    const userExists = await userDatabase.findOne({where: {id}})
    
    if (!userExists) {
        throw new AppError("User not found.", 404)
    }

    userDatabase.delete({id})
}