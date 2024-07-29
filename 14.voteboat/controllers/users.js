const passport = require("passport");

const User = require("../models/User");

exports.createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const actualPassword = Array.isArray(password) ? password[0] : password;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.render("modal", {
        title: "Error",
        message: "Email already in use",
      });
    }

    const createdUser = await User.create({
      email,
      password: actualPassword,
    });

    req.login(createdUser, (error) => {
      if (error) {
        next(error);
        return;
      }

      return res.redirect("/");
    });
  } catch (error) {
    next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      next(err);
      return;
    }
    if (!user) {
      res.render("modal", {
        title: "Error",
        message: "Invalid email or password",
      });
      return;
    }

    req.login(user, (loginError) => {
      if (loginError) {
        next(loginError);
        return;
      }

      const returnPath = req.query.returnTo || "/";

      res.redirect(decodeURIComponent(returnPath));
      return;
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
      return;
    }

    res.redirect("/login");
  });
};
