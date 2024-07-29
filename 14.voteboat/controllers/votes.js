const Vote = require("../models/Vote");

exports.createVote = async (req, res, next) => {
  try {
    const { title, options, expired_at } = req.body;
    const creator = req.user._id;

    const formattedOptions = Array.isArray(options)
      ? options.map((option) => ({ option, counts: 0 }))
      : [{ option: options, counts: 0 }];

    const newVote = new Vote({
      title,
      creator,
      options: formattedOptions,
      expired_at: new Date(expired_at),
      is_progressing: true,
    });

    await newVote.save();
    await req.user.createVote(newVote._id);

    res.redirect("/votings/success");
  } catch (error) {
    res.redirect("/votings/error");
  }
};

exports.castVote = async (req, res, next) => {
  const voteId = req.params.vote_id;

  try {
    const vote = await Vote.findById(voteId);

    if (!vote || !vote.is_progressing || vote.users.includes(req.user._id)) {
      res.redirect(`/votings/${voteId}`);
      return;
    }

    const optionIndex = parseInt(req.body.optionIndex, 10);

    if (optionIndex === -1) {
      res.redirect(`/votings/${voteId}`);
      return;
    }

    vote.options[optionIndex].counts += 1;
    vote.users.push(req.user._id);

    await vote.save();

    res.redirect(`/votings/${voteId}`);
  } catch (error) {
    next(error);
  }
};

exports.removeVote = async (req, res, next) => {
  const voteId = req.params.vote_id;

  try {
    const vote = await Vote.findById(voteId);

    if (vote && vote.creator.toString() === req.user._id.toString()) {
      await Vote.deleteOne(vote);
    }

    res.redirect(`/`);
  } catch (error) {
    next(error);
  }
};
