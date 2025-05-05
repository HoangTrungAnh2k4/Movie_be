import express from "express";

const authRoute = express.Router();

import authController from "../controller/authController.js";

authRoute.post("/login", authController.login);
authRoute.post("/register", authController.register);
authRoute.get("/get_comment/:id", authController.getComment);

export default authRoute;
