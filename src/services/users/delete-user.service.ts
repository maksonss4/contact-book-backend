import { AppDataSource } from "../../database";
import {User} from "../../entities/user.entity"
import { AppError } from "../../errors";

export async function deleteUserService(id: string) {
    const userRepository = AppDataSource.getRepository(User)
    const userExists = await userRepository.findOne({where: {id}})
    
    if (!userExists) {
        throw new AppError("User not found.", 404)
    }

    userRepository.delete({id})
}