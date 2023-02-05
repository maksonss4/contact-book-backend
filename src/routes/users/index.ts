import { Router } from "express"
import { createUserController } from "../../controllers/users/create-user.controller"
import { listUserController } from "../../controllers/users/list-user.controller"
import { loginUserController } from "../../controllers/users/login-user.controller"
import { createUserSchema, loginUserSchema, updateUserSchema } from "../../schemas"
import { validateSerializer } from "../../middlewares/validate-serializer.middleware"
import { verifyUserAuthenticationMiddleware } from "../../middlewares/verify-user-authentication.middleware"
import { deleteUserController } from "../../controllers/users/delete-user.controller"
import { updateUserController } from "../../controllers/users/update-user.controller"

const routes = Router()

export function userRoutes() {
    routes.post("/users", validateSerializer(createUserSchema), createUserController)
    routes.post("/login", validateSerializer(loginUserSchema), loginUserController)
    routes.get("/users", verifyUserAuthenticationMiddleware, listUserController)
    routes.delete("/users", verifyUserAuthenticationMiddleware, deleteUserController)
    routes.patch("/users", verifyUserAuthenticationMiddleware, validateSerializer(updateUserSchema), updateUserController)
    return routes
}