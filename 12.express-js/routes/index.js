const express = require("express");

const router = express.Router();

const APPLICATION_TITLE = "Express";

router.get("/", (req, res, next) => {
  res.render("index", { title: APPLICATION_TITLE });
});

router.post("/", (req, res, next) => {
  res.status(201).render("success", {
    message: req.body.title,
  });
});

router.get("/google", (req, res, next) => {
  res.redirect(302, "http://www.google.com");
});

module.exports = router;
