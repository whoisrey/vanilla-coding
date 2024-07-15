const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

exports.USERS = [
  {
    id: 1,
    name: "ken",
  },
  {
    id: 2,
    name: "wonmo",
  },
  {
    id: 3,
    name: "justin",
  },
];

exports.YOUR_SECRET_KEY = process.env.SECRET_KEY;

router.get("/", (req, res, next) => {
  res.status(200).json(exports.USERS);
});

router.post("/", (req, res, next) => {
  const newUser = req.body;

  exports.USERS.push(newUser);

  res.status(201).json(exports.USERS);
});

router.put("/:user_id", (req, res, next) => {
  const userId = parseInt(req.params.user_id);
  const userIndex = exports.USERS.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    res.status(400).json({ error: "invalid user" });
    return;
  }

  exports.USERS[userIndex].name = req.body.name;

  res.status(200).json(exports.USERS[userIndex]);
});

router.delete("/:user_id", (req, res, next) => {
  const userId = parseInt(req.params.user_id);
  const userIndex = exports.USERS.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    res.status(400).json({ error: "invalid user" });
    return;
  }

  exports.USERS.splice(userIndex, 1);

  res.status(200).json({ result: "ok" });
});

router.get("/:user_id/token", (req, res, next) => {
  const userId = parseInt(req.params.user_id);
  const userIndex = exports.USERS.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    res.status(400).json({ error: "invalid user" });
    return;
  }

  res.status(200).json({
    result: "ok",
    token: jwt.sign(exports.USERS[userIndex], exports.YOUR_SECRET_KEY),
  });
});

router.get("/:user_id/secret", (req, res, next) => {
  const token = req.headers["vc-client-token"];

  if (!token) {
    res.status(401).json({ error: "Token not provided" });
  }

  jwt.verify(token, exports.YOUR_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: "unauthorized" });
      return;
    }

    res.status(200).json({
      result: "ok",
      secret: "i am secret something",
    });
  });
});

exports.router = router;
