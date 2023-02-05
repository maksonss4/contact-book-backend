import {Request, Response} from "express"
import { AppError } from "../../errors"
import { deleteUserService } from "../../services/users/delete-user.service"

export async function deleteUserController(req:Request, res:Response){
    try {
        const id = req.idToken
        await deleteUserService(id)

        return res.status(204).json({message: "User has been deleted"})
        
    } catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                message: error.message
            })
        }
        return res.status(500)
    }
}