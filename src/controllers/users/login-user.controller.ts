import { Request, Response } from "express";
import { AppError } from "../../errors";
import { IUserLogin } from "../../interfaces/user";
import { loginUserService } from "../../services/users/login-user.service";

export async function loginUserController(req: Request, res: Response) {
  const data: IUserLogin = req.validatedBody;
  try {
    const token = await loginUserService(data);
    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }
    return res.status(500);
  }
}
