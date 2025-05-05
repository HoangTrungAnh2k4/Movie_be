import express from "express";

const userRoute = express.Router();

import userController from "../controller/userController.js";

userRoute.get("/test", userController.test);
userRoute.get("/get_user", userController.getUer);
userRoute.put("/add_favorite", userController.addFavorite);
userRoute.delete("/delete_favorite", userController.deleteFavorite);
userRoute.post("/add_comment", userController.addComment);

export default userRoute;
