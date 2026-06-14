const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middleware/authenticate");

const {
  getSkills,
  getSkillByName,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");

/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Skill management endpoints
 */

/**
 * @swagger
 * /skill:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", getSkills);

/**
 * @swagger
 * /skill/{skillName}:
 *   get:
 *     summary: Get skill by name
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: skillName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill found
 *       404:
 *         description: Skill not found
 */
router.get("/:skillName", getSkillByName);

/**
 * @swagger
 * /skill:
 *   post:
 *     summary: Create a new skill
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skillName:
 *                 type: string
 *               level:
 *                 type: string
 *     responses:
 *       201:
 *         description: Skill created
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Authentication required
 */
router.post("/", isAuthenticated, createSkill);

/**
 * @swagger
 * /skill/{skillName}:
 *   put:
 *     summary: Update a skill
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: skillName
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
 *         description: Skill updated
 *       404:
 *         description: Skill not found
 */
router.put("/:skillName", isAuthenticated, updateSkill);

/**
 * @swagger
 * /skill/{skillName}:
 *   delete:
 *     summary: Delete a skill
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: skillName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Skill deleted
 *       404:
 *         description: Skill not found
 */
router.delete("/:skillName", deleteSkill);

module.exports = router;