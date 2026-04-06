import { Router } from "express";
import passport from "passport";
import authController from "../controllers/authController.js";

const authRouter = Router();

// Render Pages
authRouter.get("/login", authController.renderLogInForm);
authRouter.get("/logout", authController.renderLogOut);
authRouter.get("/signup", authController.renderSignUpForm);
authRouter.get("/dashboard", authController.renderDashboard);

// Handle Forms
// Authenticate Log In
authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureMessage: true,
  }),
);
authRouter.post("/signup", authController.handleSignUpForm);

export default authRouter;
