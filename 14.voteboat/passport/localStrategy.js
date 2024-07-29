const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            done(null, false, { message: "Invalid credentials" });
            return;
          }

          const isMatch = await user.comparePassword(password);

          if (isMatch) {
            done(null, user);
            return;
          } else {
            done(null, false, { message: "Invalid credentials" });
            return;
          }
        } catch (error) {
          done(error);
          return;
        }
      }
    )
  );
};
