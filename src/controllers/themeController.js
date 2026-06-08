const Joi = require("joi");
const { getDB } = require("../database/connect");

const themeSchema = Joi.object({
  themeName: Joi.string().required(),
  primaryColor: Joi.string().required(),
  secondaryColor: Joi.string().required(),
  font: Joi.string().required(),
});

const getThemes = async (req, res) => {
  try {
    const db = getDB();

    const themes = await db
      .collection("themes")
      .find()
      .toArray();

    res.status(200).json(themes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getThemeByName = async (req, res) => {
  try {
    const db = getDB();

    const theme = await db
      .collection("themes")
      .findOne({
        themeName: req.params.themeName,
      });

    if (!theme) {
      return res.status(404).json({
        message: "Theme not found",
      });
    }

    res.status(200).json(theme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTheme = async (req, res) => {
  try {
    const { error } = themeSchema.validate(
      req.body
    );

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const db = getDB();

    const result = await db
      .collection("themes")
      .insertOne(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTheme = async (req, res) => {
  try {
    const db = getDB();

    const result = await db
      .collection("themes")
      .updateOne(
        { themeName: req.params.themeName },
        { $set: req.body }
      );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTheme = async (req, res) => {
  try {
    const db = getDB();

    const result = await db
      .collection("themes")
      .deleteOne({
        themeName: req.params.themeName,
      });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getThemes,
  getThemeByName,
  createTheme,
  updateTheme,
  deleteTheme,
};