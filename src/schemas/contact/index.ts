import * as yup from "yup";
import { SchemaOf } from "yup";
import { IContactRequest, IContactUpdate } from "../../interfaces/contact";

export const createContactSchema: SchemaOf<IContactRequest> = yup.object().shape({
    email: yup.string().email().required().transform((value:string, originalValue:string)=> {
        return originalValue.toLowerCase()
    }),
    first_name: yup.string().required(),
    last_name: yup.string().notRequired(),
    phone_number: yup.string().length(11).required(),
})

export const updateContactSchema: SchemaOf<IContactUpdate> = yup.object().shape({
    first_name: yup.string().notRequired(),
    last_name: yup.string().notRequired(),
    phone_number: yup.string().length(11).notRequired(),
    email: yup.string().email().notRequired().transform((value:string, originalValue:string)=> {
        return originalValue.toLowerCase()
    })
})