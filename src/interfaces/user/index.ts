export interface IUserLogin{
    email:string
    password: string
}

export interface IUserResponse{
    id: string
    first_name: string
    last_name: string
    email: string
    phone_number: string
    created_at: Date
    password?: string
}

export interface IUserRequest {
    first_name: string
    last_name: string
    email: string
    phone_number: string
    password: string
}

export interface IUserUpdate{
    first_name?: string
    last_name?: string
    email?: string
    phone_number?: string
    password?: string
}
