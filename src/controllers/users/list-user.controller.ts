import { Request, Response } from "express";
import { AppError } from "../../errors";
import { listUserService } from "../../services/users/list-user.service";

export async function listUserController(req: Request, res: Response) {
  try {
    const id = req.idToken;
    const user = await listUserService(id);
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
