import { Router } from "express";
import authController from "../controllers/authController.js";

const authRouter = Router();

// Render Forms
authRouter.get("/login", authController.renderLogInForm);
authRouter.get("/signup", authController.renderSignUpForm);

export default authRouter;
