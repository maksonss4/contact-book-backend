import { AppDataSource } from "../../database";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { ICreateUserRequest, ICreateUserResponse } from "../../interfaces";


export async function createUserService({email, first_name, phone_number, last_name, password}: ICreateUserRequest){
    const userRepository = AppDataSource.getRepository(User)

    const emailAlreadyExists = await userRepository.findOne({where: { email }})

    if (emailAlreadyExists) {
        throw new AppError("Email already exists.", 400)
    }

    const user = new User()
    user.first_name = first_name
    user.last_name = last_name
    user.email = email
    user.phone_number = phone_number
    user.password = password

    userRepository.create(user)
    await userRepository.save(user)

    const userResponse: ICreateUserResponse = { ...user }
    delete userResponse.password

    return userResponse
}