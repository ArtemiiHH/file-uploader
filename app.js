// Dependencies
const express = require("express");
const app = express();
const path = require("node:path");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

// Import Routers
const authRouter = require("./routes/authRoutes");
const fileRouter = require("./routes/fileRoutes");
const folderRouter = require("./routes/folderRoutes");

// Set EJS as template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Read static files from public
app.use(express.static("public"));

// Add root redirect
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Set routes
app.use("/", authRouter);
app.use("/", fileRouter);
app.use("/", folderRouter);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log(`Server running on localhost:${PORT}`);
});
