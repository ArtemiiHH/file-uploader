import { Router } from "express";
import passport from "passport";
import authController from "../controllers/authController.js";

const authRouter = Router();

// Render Forms
authRouter.get("/login", authController.renderLogInForm);
authRouter.get("/signup", authController.renderSignUpForm);

// Handle Forms
// Authenticate Log In
authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  }),
);
authRouter.post("/signup", authController.handleSignUpForm);

export default authRouter;
