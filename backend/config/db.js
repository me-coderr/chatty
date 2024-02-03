const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (err) {
    console.log(`DB connection error: ${err}`);
    process.exit();
  }
};

module.exports = { connectDB };
