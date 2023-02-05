import { AppDataSource } from "../../database";
import {User} from "../../entities/user.entity"
import { AppError } from "../../errors";
import { ICreateUserResponse } from "../../interfaces";

export async function listUserService(id: string) {
    const database = AppDataSource.getRepository(User)
    const userAlreadyExists = await database.findOne({where: {id}})

    if (!userAlreadyExists) {
        throw new AppError("User not found.", 404)
    }

    const userResponse: ICreateUserResponse = userAlreadyExists
    delete userResponse.password    
    
    return userResponse
}