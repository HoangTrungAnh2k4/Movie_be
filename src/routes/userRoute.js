import express from "express";

const userRoute = express.Router();

import userController from "../controller/userController.js";

userRoute.get("/test", userController.test);

export default userRoute;
