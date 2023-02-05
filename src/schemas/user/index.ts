import * as yup from "yup";
import { SchemaOf } from "yup";
import bcrypt from "bcrypt"
import { IUserRequest, IUserLogin, IUserUpdate } from "../../interfaces/user";

export const createUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    phone_number: yup.string().length(11).required(),
    email: yup.string().email().required().transform((value:string, originalValue:string)=> {
        return originalValue.toLowerCase()
    }),
    password: yup.string().required().transform((value:string, originalValue:string) => {
        return bcrypt.hashSync(originalValue, 10)
    })
})

export const loginUserSchema: SchemaOf<IUserLogin> = yup.object().shape({
    email: yup.string().email().required().transform((value:string, originalValue:string)=> {
        return originalValue.toLowerCase()
    }),
    password: yup.string().required()
})

export const updateUserSchema: SchemaOf<IUserUpdate> = yup.object().shape({
    first_name: yup.string().notRequired(),
    last_name: yup.string().notRequired(),
    phone_number: yup.string().length(11).notRequired(),
    email: yup.string().email().notRequired().transform((value:string, originalValue:string)=> {
        return originalValue.toLowerCase()
    }),
    password: yup.string().notRequired().transform((value:string, originalValue:string) => {
        return bcrypt.hashSync(originalValue, 10)
    })
})
