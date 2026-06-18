const Joi = require("joi");
const { getDB } = require("../database/connect");

const userSchema = Joi.object({
  username: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  role: Joi.string().required(),
  location: Joi.string().required(),
  portfolioUrl: Joi.string().required(),
});

const getUsers = async (req, res) => {
  try {
    const db = getDB();

    const users = await db
      .collection("users")
      .find()
      .toArray();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const db = getDB();

    const user = await db
      .collection("users")
      .findOne({
        username: req.params.username,
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(
      req.body
    );

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const db = getDB();

    const result = await db
      .collection("users")
      .insertOne(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(
      req.body
    );

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const db = getDB();

    const result = await db
      .collection("users")
      .updateOne(
        { username: req.params.username },
        { $set: req.body }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const db = getDB();

    const result = await db
      .collection("users")
      .deleteOne({
        username: req.params.username,
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
};