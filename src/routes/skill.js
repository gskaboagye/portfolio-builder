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
* /skill:
* get:
* ```
  summary: Get all skills
  ```
* ```
  tags:
  ```
* ```
    - Skills
  ```
* ```
  responses:
  ```
* ```
    200:
  ```
* ```
      description: Successfully retrieved all skills
  ```

*/
router.get("/", getSkills);

/**

* @swagger
* /skill/{skillName}:
* get:
* ```
  summary: Get skill by name
  ```
* ```
  tags:
  ```
* ```
    - Skills
  ```
* ```
  parameters:
  ```
* ```
    - in: path
  ```
* ```
      name: skillName
  ```
* ```
      required: true
  ```
* ```
      schema:
  ```
* ```
        type: string
  ```
* ```
  responses:
  ```
* ```
    200:
  ```
* ```
      description: Skill found
  ```
* ```
    404:
  ```
* ```
      description: Skill not found
  ```

*/
router.get("/:skillName", getSkillByName);

/**

* @swagger
* /skill:
* post:
* ```
  summary: Create a new skill
  ```
* ```
  tags:
  ```
* ```
    - Skills
  ```
* ```
  responses:
  ```
* ```
    201:
  ```
* ```
      description: Skill created successfully
  ```
* ```
    400:
  ```
* ```
      description: Invalid input
  ```
* ```
    401:
  ```
* ```
      description: Authentication required
  ```

*/
router.post("/", isAuthenticated, createSkill);

/**

* @swagger
* /skill/{skillName}:
* put:
* ```
  summary: Update a skill
  ```
* ```
  tags:
  ```
* ```
    - Skills
  ```
* ```
  parameters:
  ```
* ```
    - in: path
  ```
* ```
      name: skillName
  ```
* ```
      required: true
  ```
* ```
      schema:
  ```
* ```
        type: string
  ```
* ```
  responses:
  ```
* ```
    200:
  ```
* ```
      description: Skill updated successfully
  ```
* ```
    404:
  ```
* ```
      description: Skill not found
  ```
* ```
    401:
  ```
* ```
      description: Authentication required
  ```

*/
router.put(
"/:skillName",
isAuthenticated,
updateSkill
);

/**

* @swagger
* /skill/{skillName}:
* delete:
* ```
  summary: Delete a skill
  ```
* ```
  tags:
  ```
* ```
    - Skills
  ```
* ```
  parameters:
  ```
* ```
    - in: path
  ```
* ```
      name: skillName
  ```
* ```
      required: true
  ```
* ```
      schema:
  ```
* ```
        type: string
  ```
* ```
  responses:
  ```
* ```
    200:
  ```
* ```
      description: Skill deleted successfully
  ```
* ```
    404:
  ```
* ```
      description: Skill not found
  ```

*/
router.delete("/:skillName", deleteSkill);

module.exports = router;
