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
  responses:
  ```
* ```
    200:
  ```
* ```
      description: Success
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
  summary: Create a skill
  ```
* ```
  requestBody:
  ```
* ```
    required: true
  ```
* ```
    content:
  ```
* ```
      application/json:
  ```
* ```
        schema:
  ```
* ```
          type: object
  ```
* ```
          properties:
  ```
* ```
            skillName:
  ```
* ```
              type: string
  ```
* ```
            level:
  ```
* ```
              type: string
  ```
* ```
  responses:
  ```
* ```
    201:
  ```
* ```
      description: Skill created
  ```
* ```
    401:
  ```
* ```
      description: Authentication required
  ```

*/
router.post(
"/",
isAuthenticated,
createSkill
);

/**

* @swagger
* /skill/{skillName}:
* put:
* ```
  summary: Update a skill
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
      description: Skill updated
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
      description: Skill deleted
  ```

*/
router.delete("/:skillName", deleteSkill);

module.exports = router;
