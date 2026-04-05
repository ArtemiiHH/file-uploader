import { Strategy as LocalStrategy } from "passport-local";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import passport from "passport";

// Setup Local Strategy
export default (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email: email },
          });

          // If user not found
          if (!user) {
            return done(null, false, { message: "Incorrect email" });
          }

          // Compare hashed password
          const match = await bcrypt.hash(password, user.password);
          if (!match) {
            return done(null, false, { message: "Incorrect password" });
          }
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
