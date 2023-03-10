import "reflect-metadata";
import express from "express";
import { AppRoutes } from "./routes";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
AppRoutes(app);

export default app;
