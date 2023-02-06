import { Request, Response } from "express";
import { AppError } from "../../errors";
import { listContactsService } from "../../services/contacts/list-contacts.service";

export async function listContactsController(req: Request, res: Response) {
  try {
    const id = req.idToken;
    const user = await listContactsService(id);
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }
    return res.status(500);
  }
}
