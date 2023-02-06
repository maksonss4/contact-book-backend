import { AppDataSource } from "../../database";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IUserResponse } from "../../interfaces/user";

export async function listUserService(id: string) {
  const userRepository = AppDataSource.getRepository(User);
  const userAlreadyExists = await userRepository.findOne({ where: { id } });

  if (!userAlreadyExists) {
    throw new AppError("User not found.", 404);
  }

  const userResponse: IUserResponse = userAlreadyExists;
  delete userResponse.password;

  return userResponse;
}
