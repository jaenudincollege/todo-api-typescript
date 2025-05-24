import express, { Express } from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
