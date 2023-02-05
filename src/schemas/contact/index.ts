import * as yup from "yup";
import { SchemaOf } from "yup";
import { IContactRequest } from "../../interfaces/contact";

export const createContactSchema: SchemaOf<IContactRequest> = yup.object().shape({
    email: yup.string().email().required().transform((value:string, originalValue:string)=> {
        return originalValue.toLowerCase()
    }),
    first_name: yup.string().required(),
    last_name: yup.string().notRequired(),
    phone_number: yup.string().length(11).required(),
})