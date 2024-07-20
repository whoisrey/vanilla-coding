exports.isLoggedIn = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    next(error);
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/");
    }
  } catch (error) {
    next(error);
  }
};
