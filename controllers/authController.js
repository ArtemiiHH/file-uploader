// Render Log In Form (GET)
exports.renderLogInForm = async function (req, res) {
  try {
    res.render("logInForm");
  } catch (error) {
    console.error();
    res.status(500).send("Error rendering form");
  }
};

// Render Sign Up Form (GET)
exports.renderSignUpForm = async function (req, res) {
  try {
    res.render("signUpForm");
  } catch (error) {
    console.error();
    res.status(500).send("Error rendering form");
  }
};
