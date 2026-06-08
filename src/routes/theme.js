const express = require("express");
const router = express.Router();

const {
  getThemes,
  getThemeByName,
  createTheme,
  updateTheme,
  deleteTheme,
} = require("../controllers/themeController");

/**
 * @swagger
 * /theme:
 *   get:
 *     summary: Get all themes
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", getThemes);

/**
 * @swagger
 * /theme/{themeName}:
 *   get:
 *     summary: Get theme by name
 *     parameters:
 *       - in: path
 *         name: themeName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Theme found
 *       404:
 *         description: Theme not found
 */
router.get("/:themeName", getThemeByName);

/**
 * @swagger
 * /theme:
 *   post:
 *     summary: Create a new theme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               themeName:
 *                 type: string
 *               primaryColor:
 *                 type: string
 *               secondaryColor:
 *                 type: string
 *               font:
 *                 type: string
 *     responses:
 *       201:
 *         description: Theme created
 *       400:
 *         description: Invalid input
 */
router.post("/", createTheme);

/**
 * @swagger
 * /theme/{themeName}:
 *   put:
 *     summary: Update a theme
 *     parameters:
 *       - in: path
 *         name: themeName
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Theme updated
 *       404:
 *         description: Theme not found
 */
router.put("/:themeName", updateTheme);

/**
 * @swagger
 * /theme/{themeName}:
 *   delete:
 *     summary: Delete a theme
 *     parameters:
 *       - in: path
 *         name: themeName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Theme deleted
 *       404:
 *         description: Theme not found
 */
router.delete("/:themeName", deleteTheme);

module.exports = router;