import { AppDataSource } from "../../database";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { ILoginUser } from "../../interfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginUserService({email, password}: ILoginUser){
    const userRepository = AppDataSource.getRepository(User)
    const userExist = await userRepository.findOne({ where: { email } })
    
    if (!userExist) {
        throw new AppError("Wrong email/password", 403)
    }
    
    if (!bcrypt.compareSync(password, userExist!.password)) {
        throw new AppError("Wrong email/password", 403)
    }

    const token = jwt.sign(
        {
          user: {
            id: userExist.id,
          },
        },
        String(process.env.SECRET_KEY),
        {
          expiresIn: "1d",
        }
    )

    return token
}