import { Request, Response } from "express";
import { AppError } from "../../errors";
import { deleteContactService } from "../../services/contacts/delete-contact.service";

export async function deleteContactController(req: Request, res: Response) {
  try {
    const user_id = req.idToken;
    const contact_id = req.params.id;

    await deleteContactService(user_id, contact_id);

    return res.status(204).json({ message: "Contact has been deleted" });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }
    return res.status(500);
  }
}
