const Problems = require("../models/Problem");

exports.renderHomePage = async (req, res, next) => {
  try {
    const problems = await Problems.find();

    res.render("index", {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      data: problems,
    });
  } catch (error) {
    next(error);
  }
};

exports.renderUserPage = (page) => (req, res, next) => {
  try {
    res.render(page, { data: {} });
  } catch (error) {
    next(error);
  }
};

exports.renderProblemPage = async (req, res, next) => {
  try {
    const problem = await Problems.findById(req.params.problem_id);

    res.render("problem", {
      data: problem,
      result: null,
      error: null,
      messages: [],
      userCode: "function solution() {\n  // your code\n}",
    });
  } catch (error) {
    next(error);
  }
};
