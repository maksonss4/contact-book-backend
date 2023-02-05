import {Express} from "express"
import { userRoutes } from "./users"

export function AppRoutes(app: Express){
    app.use(userRoutes())
}