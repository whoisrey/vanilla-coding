const Vote = require("../models/Vote");

const todayDate = new Date();

exports.renderModal = (title, message) => (req, res, next) => {
  try {
    res.render("modal", { title, message });
    return;
  } catch (error) {
    next(error);
  }
};

exports.renderPage = (page, title) => (req, res, next) => {
  try {
    res.render(page, { title });
    return;
  } catch (error) {
    next(error);
  }
};

exports.renderVoteList = (isMine = false) =>
  async function (req, res, next) {
    try {
      const userId = isMine ? { creator: req.user._id } : {};
      const votes = await Vote.find(userId)
        .sort({ expired_at: -1 })
        .populate("creator", "email")
        .lean();
      const formattedVotes = votes.map((vote) => ({
        ...vote,
        creator: vote.creator.email,
        is_progressing: new Date(vote.expired_at) > todayDate,
      }));

      res.render("lists", {
        title: isMine ? "My Page" : "Vote Boat",
        data: formattedVotes,
      });
      return;
    } catch (error) {
      next(error);
    }
  };

exports.renderVoteDetail = async function (req, res, next) {
  try {
    const targetVote = await Vote.findById(req.params.vote_id)
      .populate("creator", "email")
      .lean();
    const expiredDate = new Date(targetVote.expired_at);
    const formattedExpiredAt = expiredDate.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const voteCounts = targetVote.options.map((option) => option.counts);
    const maxVoteCounts = Math.max(...voteCounts);
    const topOptionsInfo = targetVote.options.filter(
      (info) => info.counts === maxVoteCounts
    );
    const topOptions = topOptionsInfo.map((info) => info.option);
    const isExpired = expiredDate <= todayDate;

    res.render("votings", {
      title: "Vote Boat",
      data: {
        ...targetVote,
        is_progressing: !isExpired,
        expired_at: formattedExpiredAt,
      },
      isExpired,
      isCreator:
        req.isAuthenticated() && req.user.email === targetVote.creator.email
          ? true
          : false,
      topOptions: isExpired ? topOptions : undefined,
      maxVoteCounts: isExpired ? maxVoteCounts : undefined,
    });
    return;
  } catch (error) {
    next(error);
  }
};
