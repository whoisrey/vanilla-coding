const jwt = require("jsonwebtoken");

const { YOUR_SECRET_KEY } = require("../users");

const verifyToken = (req, res, next) => {
  const token = req.headers["vc-client-token"];

  if (!token) {
    res.status(401).send({ error: "unauthorized" });
    return;
  }

  jwt.verify(token, YOUR_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).send({ error: "unauthorized" });
      return;
    }

    next();
  });
};

exports.verifyToken = verifyToken;
