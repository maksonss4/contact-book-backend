export interface ILoginUser{
    email:string
    password: string
}

export interface ICreateUserResponse{
    id: string
    first_name: string
    last_name: string
    email: string
    phone_number: string
    created_at: Date
    password?: string
}

export interface ICreateUserRequest {
    first_name: string
    last_name: string
    email: string
    phone_number: string
    password: string
}

// export interface IUser extends ICreateUserRequest{
//     created_at: Date
// }

export interface IUpdateUser{
    first_name?: string
    last_name?: string
    email?: string
    phone_number?: string
    password?: string
}