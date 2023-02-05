import {Express} from "express"
import { contactRoutes } from "./contacts"
import { userRoutes } from "./users"

export function AppRoutes(app: Express){
    app.use(userRoutes())
    app.use(contactRoutes())
}