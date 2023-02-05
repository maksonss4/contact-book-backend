import "reflect-metadata"
import express from "express"
import { AppRoutes } from "./routes"

const app = express()

app.use(express.json())
AppRoutes(app)

export default app
