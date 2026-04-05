// Render Log In Form (GET)
async function renderLogInForm(req, res) {
  try {
    res.render("logInForm");
  } catch (error) {
    console.error();
    res.status(500).send("Error rendering form");
  }
}

// Render Sign Up Form (GET)
async function renderSignUpForm(req, res) {
  try {
    res.render("signUpForm");
  } catch (error) {
    console.error();
    res.status(500).send("Error rendering form");
  }
}

export default { renderLogInForm, renderSignUpForm };
