import { AppDataSource } from "../../database";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IContactRequest, IContactResponse } from "../../interfaces/contact";

export async function createContactService(data: IContactRequest, id: string) {
  const userRepository = AppDataSource.getRepository(User);
  const contactRepository = AppDataSource.getRepository(Contact);
  const { email, first_name, phone_number, last_name } = data;

  const userExists = await userRepository.findOne({ where: { id } });

  if (!userExists) {
    throw new AppError("User not found.", 404);
  }

  const newContact = new Contact();
  newContact.email = email;
  newContact.first_name = first_name;
  newContact.phone_number = phone_number;
  if (last_name) newContact.last_name = last_name;
  newContact.user = userExists;

  contactRepository.create(newContact);
  await contactRepository.save(newContact);

  const contactResponse: IContactResponse = { ...newContact };
  delete contactResponse.user;
  contactResponse.owner_id = userExists.id;

  return contactResponse;
}
