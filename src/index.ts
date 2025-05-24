import express, { Express } from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db";
import todoRoutes from "./routes/todo.routes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/todos", todoRoutes);

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
