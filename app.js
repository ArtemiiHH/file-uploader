// Dependencies
import express from "express";
import path from "node:path";
import passport from "passport";
import passportConfig from "./config/passport.js";
import session from "express-session";
import "dotenv/config";
import authRouter from "./routes/authRoutes.js";
import fileRouter from "./routes/fileRoutes.js";
import folderRouter from "./routes/folderRoutes.js";
import { fileURLToPath } from "node:url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// Add root redirect (Routes)
app.get("/", (req, res) => res.redirect("/login"));
app.use("/", authRouter);
app.use("/", fileRouter);
app.use("/", folderRouter);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
