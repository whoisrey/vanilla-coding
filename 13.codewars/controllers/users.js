const passport = require("passport");

const User = require("../models/User");

exports.create = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.render("join", {
        data: {
          case: "Empty",
          message: "ENTER YOUR NAME AND PASSWORD",
          direction: "join",
        },
      });
    }

    const exUser = await User.findOne({ username });

    if (exUser) {
      return res.render("join", {
        data: {
          case: "Duplicate",
          message: "WE ALREADY HAVE YOUR NAME",
          direction: "join",
        },
      });
    }

    const newUser = await User.create(req.body);

    req.login(newUser, (error) => {
      if (error) {
        throw error;
      }

      res.redirect("/");
    });
  } catch (error) {
    next(error);
  }
};

exports.login = (req, res, next) => {
  try {
    passport.authenticate("local", (authError, user, message) => {
      if (authError) {
        return next(authError);
      }

      if (!user) {
        return res.render("login", { data: { message, direction: "login" } });
      }

      return req.login(user, (loginError) => {
        if (loginError) {
          return next(loginError);
        }

        return res.redirect("/");
      });
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res, next) => {
  try {
    req.logout((logoutError) => {
      if (logoutError) {
        return next(logoutError);
      }

      res.redirect("/login");
    });
  } catch (error) {
    next(error);
  }
};
