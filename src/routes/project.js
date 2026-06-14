const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middleware/authenticate");

const {
getProjects,
getProjectByName,
createProject,
updateProject,
deleteProject,
} = require("../controllers/projectController");

router.get("/", getProjects);

router.get("/:projectName", getProjectByName);

router.post("/", isAuthenticated, createProject);

router.put(
"/:projectName",
isAuthenticated,
updateProject
);

router.delete(
"/:projectName",
deleteProject
);

module.exports = router;
