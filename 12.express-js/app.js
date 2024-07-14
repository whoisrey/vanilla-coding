require("dotenv").config();

const express = require("express");

const index = require("./routes/index");
const articles = require("./routes/articles");
const users = require("./routes/users").router;

const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", index);
app.use("/articles", articles);
app.use("/users", users);

app.use((req, res, next) => {
  const err = {
    status: 404,
    message: "Not Found",
  };

  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);

  if (req.headers["content-type"] === "application/json") {
    res.json({
      error: res.locals.message,
    });
  } else {
    res.render("error");
  }
});

module.exports = app;
