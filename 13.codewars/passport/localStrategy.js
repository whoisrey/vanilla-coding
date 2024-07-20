const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

module.exports = () => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const exUser = await User.findOne({ username });
        if (exUser) {
          const result = password === exUser.password;
          if (result) {
            done(null, exUser);
          } else {
            done(null, false, "WRONG PASSWORD");
          }
        } else {
          done(null, false, "YOU ARE NOT OUR USER!");
        }
      } catch (error) {
        done(error);
      }
    })
  );
};
