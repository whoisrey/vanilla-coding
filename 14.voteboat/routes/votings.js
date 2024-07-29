const express = require("express");

const { isLoggedIn } = require("../passport/auth");
const {
  renderVoteDetail,
  renderPage,
  renderModal,
} = require("../controllers/pages");
const { removeVote, castVote, createVote } = require("../controllers/votes");

const router = express.Router();

router.get("/new", isLoggedIn, renderPage("votingsnew", "VoteBoat"));
router.post("/new", isLoggedIn, createVote);
router.get("/success", isLoggedIn, renderModal("Success", "Congratulation!"));
router.get("/error", isLoggedIn, renderModal("Error", "No!"));

router.get("/:vote_id", renderVoteDetail);
router.post("/:vote_id", isLoggedIn, castVote);
router.post("/:vote_id/remove", removeVote);

module.exports = router;
