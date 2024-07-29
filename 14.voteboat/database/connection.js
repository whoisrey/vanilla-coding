const mongoose = require("mongoose");

const DATABASE_URL = process.env.MONGOOSE_URL;

const connectDB = async () => {
  await mongoose.connect(DATABASE_URL);
};

connectDB();

module.exports = connectDB;
