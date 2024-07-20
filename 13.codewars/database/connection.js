const mongoose = require("mongoose");

const DATABASE_URL = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    next(error);
  }
};

connectDB();

module.exports = connectDB;
