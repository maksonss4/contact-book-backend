import { AppDataSource } from "../../database";
import {User} from "../../entities/user.entity"
import { AppError } from "../../errors";
import { IUserUpdate } from "../../interfaces/user";

export async function updateUserService(id: string, data: IUserUpdate) {
    const userRepository = AppDataSource.getRepository(User)
    const userExists = await userRepository.findOne({where: {id}})
    
    if (!userExists) {
        throw new AppError("User not found.", 404)
    }
    
    const {email, first_name, last_name, password, phone_number} = data
    
    if(email && email !== userExists.email){
        const emailAlreadyExists = await userRepository.findOne({where: { email }})

        if (emailAlreadyExists) {
            throw new AppError("Email already exists.", 400)
        }
    }
    
    await userRepository.update(id, {
        first_name: first_name ? first_name : userExists.first_name,
        last_name: last_name ? last_name : userExists.last_name,
        email: email ? email :userExists.email,
        phone_number: phone_number ? phone_number : userExists.phone_number,
        password: password ? password : userExists.password,
    })

    const userUpdate  = await userRepository.findOneBy({id}) 
    
    return userUpdate
}