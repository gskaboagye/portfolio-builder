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

router.get("/", getSkills);

router.get("/:skillName", getSkillByName);

router.post("/", isAuthenticated, createSkill);

router.put(
"/:skillName",
isAuthenticated,
updateSkill
);

router.delete(
"/:skillName",
deleteSkill
);

module.exports = router;
