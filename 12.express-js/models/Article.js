const mongoose = require("mongoose");

const YOUR_DATABASE_URI = process.env.MONGODATABASE_URI;

mongoose.connect(YOUR_DATABASE_URI);

const articleSchema = new mongoose.Schema({
  source: {
    id: String,
    name: String,
  },
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: { type: Date, default: Date.now },
  content: String,
});

module.exports = mongoose.model("Article", articleSchema);
