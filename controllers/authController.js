import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

// RENDER FORMS
// Render Log In Form (GET)
async function renderLogInForm(req, res) {
  res.render("logInForm");
}
// Render Sign Up Form (GET)
async function renderSignUpForm(req, res) {
  res.render("signUpForm");
}

// FORM SUBMISSION
// Handle Sign Up Form Submission (POST)
async function handleSignUpForm(req, res) {
  try {
    // Destructure input data
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      res.send("Passwords must match");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email: email, password: hashedPassword },
    });
  } catch (error) {
    console.error(error);
    res.status(500).status("Error registering user");
  }
}

export default { renderLogInForm, renderSignUpForm, handleSignUpForm };
