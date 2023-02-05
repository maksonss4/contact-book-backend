import { AppDataSource } from "../../database";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors";

export async function deleteContactService(user_id: string, contact_id: string) {
    if (contact_id.length !== 36) {
        throw new AppError("Invalid UUID (contact id)", 400)
    }
    
    const contactRepository = AppDataSource.getRepository(Contact)
    
    const contactExists = await contactRepository.findOne({
        where: {
            id: contact_id,
            user: {
                id: user_id
            }
        }
    })
    
    if (!contactExists) {
        throw new AppError("Contact not found.", 404)
    }

    contactRepository.delete({id: contact_id})
}