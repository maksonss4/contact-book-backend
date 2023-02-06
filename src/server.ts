import app from "./app";
import { AppDataSource } from "./database";
import "dotenv/config";

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  app.listen(3333, () => {
    console.log(`Servidor executando na porta 3333`);
  });
})();
