const Problems = require("../models/Problem");

exports.checkProblems = async (req, res, next) => {
  try {
    const problem = await Problems.findById(req.params.problem_id);
    const tests = problem.tests;
    const userCode = req.body.code;

    let isCorrect = true;
    let error = null;

    const messages = tests.map((test) => {
      try {
        const userAnswer = new Function(`
          ${userCode}
          return ${test.code}
        `)();
        const result = userAnswer === test.solution;

        if (result) {
          return "PASS";
        } else {
          isCorrect = false;

          return `EXPECTED (${userAnswer}) TO EQUAL (${test.solution})`;
        }
      } catch (problemError) {
        isCorrect = false;
        error = problemError;
      }
    });

    res.render("problem", {
      data: problem,
      result: isCorrect,
      messages,
      error,
      userCode,
    });
  } catch (error) {
    next(error);
  }
};
