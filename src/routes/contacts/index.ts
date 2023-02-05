import { Router } from "express"
import { createContactController } from "../../controllers/contacts/create-contact.controller"
import { deleteContactController } from "../../controllers/contacts/delete-contact.controller"
import { listContactsController } from "../../controllers/contacts/list-contacts.controller"
import { validateSerializer } from "../../middlewares/validate-serializer.middleware"
import { verifyUserAuthenticationMiddleware } from "../../middlewares/verify-user-authentication.middleware"
import { createContactSchema } from "../../schemas/contact"

const routes = Router()

export function contactRoutes(){
    routes.post(
        "/contacts",
        verifyUserAuthenticationMiddleware,
        validateSerializer(createContactSchema),
        createContactController
    )
    routes.get(
        "/contacts", 
        verifyUserAuthenticationMiddleware,
        listContactsController
    )
    routes.delete(
        "/contacts/:id",
        verifyUserAuthenticationMiddleware,
        deleteContactController
    )

    return routes
}