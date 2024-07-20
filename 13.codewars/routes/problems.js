const express = require("express");

const { renderProblemPage } = require("../controllers/pages");
const { checkProblems } = require("../controllers/problems");
const { isLoggedIn } = require("../passport/auth");

const router = express.Router();

router.get("/:problem_id", isLoggedIn, renderProblemPage);
router.post("/:problem_id", isLoggedIn, checkProblems);

module.exports = router;
