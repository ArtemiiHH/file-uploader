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
    const { fullName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      res.redirect("/signup");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { fullName: fullName, email: email, password: hashedPassword },
    });
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
}

export default { renderLogInForm, renderSignUpForm, handleSignUpForm };
