import {Request, Response} from "express"
import { AppError } from "../../errors"
import { IContactUpdate } from "../../interfaces/contact"
import { updateContactService } from "../../services/contacts/update-contact.service"

export async function updateContactController(req:Request, res:Response){
    try {
        const user_id = req.idToken
        const contact_id = req.params.id
        const data: IContactUpdate = req.validatedBody

        const contact = await updateContactService(user_id, contact_id, data)
        return res.status(200).json({
            message: "Updated contact.",
            contact
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