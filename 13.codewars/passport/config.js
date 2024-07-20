const passport = require("passport");

const User = require("../models/User");
const localInitialize = require("./localStrategy");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser(async (username, done) => {
    try {
      const user = await User.findOne({ username });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  localInitialize();
};
