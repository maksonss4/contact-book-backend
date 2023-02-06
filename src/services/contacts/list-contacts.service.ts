import { AppDataSource } from "../../database";
import { Contact } from "../../entities/contact.entity";

export async function listContactsService(id: string) {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contacts = await contactRepository.find({
    where: {
      user: { id },
    },
  });

  return contacts;
}
