import userController from "../controller/authController.js";
import express from "express";
import { verifyToken } from "../middlewares/verify_token.js";
let userRouter = express.Router();




userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/logout", userController.logoutUser);

userRouter.delete("/:userId", verifyToken, userController.deleteUser);

export default userRouter;
