import {Request, Response} from "express"
import { AppError } from "../../errors"
import { IUpdateUser } from "../../interfaces"
import { updateUserService } from "../../services/users/update-user.service"

export async function updateUserController(req:Request, res:Response){
    try {
        const id = req.idToken
        const data: IUpdateUser = req.validatedBody

        const user = await updateUserService(id, data)
        return res.status(200).json({
            message: "Updated user.",
            user
        })
        
    } catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                message: error.message
            })
        }
        return res.status(500)
    }
}