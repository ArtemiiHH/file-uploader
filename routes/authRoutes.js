const { Router } = require("express");
const auth = Router();
const authController = require("../controllers/authController");

// Render Forms
auth.get("/login", authController.renderLogInForm);
auth.get("/signup", authController.renderSignUpForm);

module.exports = auth;
