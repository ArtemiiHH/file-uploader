import { Router } from "express";
import passport from "passport";
import authController from "../controllers/authController.js";
import ensureAuthenticated from "../middleware/ensureAuthenticated.js";

const authRouter = Router();

// Render Pages
authRouter.get("/login", authController.renderLogInForm);
authRouter.get("/logout", authController.renderLogOut);
authRouter.get("/signup", authController.renderSignUpForm);
authRouter.get(
  "/dashboard",
  ensureAuthenticated,
  authController.renderDashboard,
);

// Handle Forms
// Authenticate Log In
authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  }),
);
authRouter.post("/signup", authController.handleSignUpForm);

export default authRouter;
