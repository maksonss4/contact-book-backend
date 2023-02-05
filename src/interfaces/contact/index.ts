import { User } from "../../entities/user.entity"

export interface IContactResponse{
    first_name: string
    last_name?: string
    email: string
    phone_number: string
    user_id?: string
    user?: User
}

export interface IContactRequest{
    first_name: string
    last_name?: string
    email: string
    phone_number: string
}