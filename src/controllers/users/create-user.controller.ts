import {Request, Response} from "express"
import { AppError } from "../../errors"
import { IUserRequest } from "../../interfaces/user"
import { createUserService } from "../../services/users/create-user.service"

export async function createUserController(req: Request, res:Response){
    const data: IUserRequest = req.validatedBody

    try {
        const newUser = await createUserService(data)
        return res.status(201).json(newUser)
    } catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                message: error.message
            })
        }
        return res.status(500)
    }    
}