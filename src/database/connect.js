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
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const getDB = () => database;

module.exports = {
  connectDB,
  getDB,
};