const Article = require("../../models/Article");

exports.getAll = async (req, res, next) => {
  const articles = await Article.find().lean();

  res.status(200).json({ articles });
};

exports.create = async (req, res, next) => {
  const createdArticle = await Article.create(req.body);

  res.status(201).json({ article: createdArticle, result: "ok" });
};

exports.update = async (req, res, next) => {
  try {
    const articleId = req.params.article_id;
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ article: updatedArticle, result: "ok" });
  } catch {
    const error = {
      status: 400,
      message: "invalid article id",
    };

    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const articleId = req.params.article_id;

    await Article.findByIdAndDelete({ _id: articleId });

    res.status(200).json({ result: "ok" });
  } catch {
    const error = {
      status: 400,
      message: "invalid article id",
    };

    next(error);
  }
};
