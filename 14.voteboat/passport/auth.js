exports.isLoggedIn = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      next();
    } else {
      const returnTo = encodeURIComponent(req.originalUrl);

      res.redirect(`/login?returnTo=${returnTo}`);
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
