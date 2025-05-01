import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import routes from "./src/routes/index.js";

const app = express();

const hostname = "localhost";
const port = process.env.PORT;

console.log(`PORT: ${port}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Hoang Trung Anh!");
});

routes(app);

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
