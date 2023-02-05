import { AppDataSource } from "../../database";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors";
import { IContactResponse, IContactUpdate } from "../../interfaces/contact";

export async function updateContactService(user_id: string, contact_id: string, data: IContactUpdate) {
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
    
    const {email, first_name, last_name, phone_number} = data
    
    await contactRepository.update(contact_id, {
        first_name: first_name ? first_name : contactExists.first_name,
        last_name: last_name ? last_name : contactExists.last_name,
        email: email ? email :contactExists.email,
        phone_number: phone_number ? phone_number : contactExists.phone_number
    })

    const contactUpdate  = await contactRepository.findOneBy({id: contact_id}) 
    
    const contactResponse = <IContactResponse>{ ...contactUpdate }
    delete contactResponse.user
    contactResponse.owner_id = user_id

    return contactResponse
}