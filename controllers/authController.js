import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

// RENDER FORMS
// Render Log In Form (GET)
async function renderLogInForm(req, res) {
  const message = req.session.messages?.[0] || null;
  res.render("logInForm", { message });
}
// Render Sign Up Form (GET)
async function renderSignUpForm(req, res) {
  res.render("signUpForm");
}
// Render Dashboard (GET)
async function renderDashboard(req, res) {
  const files = await prisma.file.findMany({
    where: { userId: req.user.id },
  });

  res.render("dashboard", {
    user: req.user,
    files: files,
    success: req.flash("success"),
    error: req.flash("error"),
  });
}
// Log Out (GET)
async function renderLogOut(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);
    // Destroy session when user logs out
    req.session.destroy(() => {
      res.redirect("/login");
    });
  });
}

// FORM SUBMISSION
// Handle Sign Up Form Submission (POST)
async function handleSignUpForm(req, res) {
  try {
    // Destructure input data
    const { fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.redirect("/signup");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { fullName, email, password: hashedPassword },
    });
    res.redirect("/login");
  } catch (error) {
    // Handle duplicate email
    if (error.code === "P2002") {
      return res.status(400).send("Email already in use");
    }
    console.error(error);
    res.status(500).send("Error registering user");
  }
}

export default {
  renderLogInForm,
  renderSignUpForm,
  renderDashboard,
  renderLogOut,
  handleSignUpForm,
};
