import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cors from "cors";

import { CONNECT_DB } from "./src/config/db.js";

import routes from "./src/routes/index.js";

const app = express();

const hostname = "localhost";
const port = process.env.PORT;

const sever = {
  start: () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    routes(app);

    app.listen(port, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  },
};

CONNECT_DB()
  .then(() => {
    console.log("Connected to database successfully");
    sever.start();
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
