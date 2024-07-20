require("dotenv").config();
require("./database/connection");

const express = require("express");
const passport = require("passport");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const passportConfig = require("./passport/config");

const index = require("./routes/index");
const login = require("./routes/login");
const logout = require("./routes/logout");
const join = require("./routes/join");
const problems = require("./routes/problems");

const { isNotLoggedIn, isLoggedIn } = require("./passport/auth");

const app = express();

app.set("view engine", "ejs");

passportConfig();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "/node_modules/codemirror")));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});

app.use("/", index);
app.use("/login", isNotLoggedIn, login);
app.use("/logout", isLoggedIn, logout);
app.use("/join", isNotLoggedIn, join);
app.use("/problem", isLoggedIn, problems);

app.use(function (req, res, next) {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use(function (err, req, res, next) {
  switch (err.name) {
    case "CastError":
      err.status = 400;
      err.message = "Bad Request - Invalid data format";
      break;
    case "DivergentArrayError":
      err.status = 400;
      err.message = "Bad Request - Array values diverge";
      break;
    case "ValidationError":
      err.status = 400;
      err.message = "Bad Request - Validation failed";
      break;
    case "ObjectParameterError":
      err.status = 400;
      err.message = "Bad Request - Invalid object";
      break;
    case "ParallelSaveError":
      err.status = 409;
      err.message = "Conflict - Parallel save detected";
      break;
    case "StrictModeError":
      err.status = 400;
      err.message = "Bad Request - Strict mode violation";
      break;
    case "VersionError":
      err.status = 409;
      err.message = "Conflict - Version mismatch";
      break;
    default:
      err.status = 500;
      err.message = "Internal Server Error";
      break;
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);

  if (err.status === 500) {
    res.render("error", {
      message: "Internal Server Error ",
      error: res.locals.error,
    });
  } else {
    res.render("error", {
      message: res.locals.message,
      error: res.locals.error,
    });
  }
});

module.exports = app;
