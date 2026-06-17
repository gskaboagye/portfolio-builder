const { MongoClient } = require("mongodb");
require("dotenv").config();

let database;

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(
      process.env.MONGODB_URI
    );

    database = client.db(process.env.DB_NAME);

    console.log("MongoDB Connected");

    return database;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);

    // Don't kill Jest
    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    }

    throw error;
  }
};

const getDB = () => {
  return database;
};

module.exports = {
  connectDB,
  getDB,
};