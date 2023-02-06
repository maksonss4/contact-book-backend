import { IContactRequest } from "../../interfaces/contact";
import { IUserRequest, IUserUpdate } from "../../interfaces/user";

export const mockedUser: IUserRequest = {
  first_name: "Patrick",
  last_name: "Nekel",
  email: "patrick@mail.com",
  phone_number: "12345678912",
  password: "1234",
};

export const mockedUserPatch: IUserUpdate = {
  email: "novoemail@mail.com",
};

export const mockedContactFull: IContactRequest = {
  email: "jose@mail.com",
  first_name: "José",
  phone_number: "81923232323",
  last_name: "Silva",
};

export const mockedContactUpdate: IContactRequest = {
  email: "bruno@mail.com",
  first_name: "Bruno",
  phone_number: "11976768080",
};
