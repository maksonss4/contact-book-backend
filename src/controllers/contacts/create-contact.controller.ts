import {Request, Response} from "express"
import { AppError } from "../../errors"
import { IContactRequest } from "../../interfaces/contact"
import { createContactService } from "../../services/contacts/create-contact.service"

export async function createContactController(req: Request, res:Response){
    const data: IContactRequest = req.validatedBody
    const id = req.idToken

    try {
        const newContact = await createContactService(data, id)
        return res.status(201).json(newContact)
    } catch (error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                message: error.message
            })
        }
        return res.status(500)
    }    
}