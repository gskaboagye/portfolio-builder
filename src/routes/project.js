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

/**

* @swagger
* /project:
* get:
* ```
  summary: Get all projects
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
router.get("/", getProjects);

/**

* @swagger
* /project/{projectName}:
* get:
* ```
  summary: Get project by name
  ```
* ```
  parameters:
  ```
* ```
    - in: path
  ```
* ```
      name: projectName
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
      description: Project found
  ```
* ```
    404:
  ```
* ```
      description: Project not found
  ```

*/
router.get("/:projectName", getProjectByName);

/**

* @swagger
* /project:
* post:
* ```
  summary: Create a project
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
            projectName:
  ```
* ```
              type: string
  ```
* ```
            description:
  ```
* ```
              type: string
  ```
* ```
            technology:
  ```
* ```
              type: string
  ```
* ```
            githubUrl:
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
      description: Project created
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
createProject
);

/**

* @swagger
* /project/{projectName}:
* put:
* ```
  summary: Update a project
  ```
* ```
  parameters:
  ```
* ```
    - in: path
  ```
* ```
      name: projectName
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
      description: Project updated
  ```
* ```
    401:
  ```
* ```
      description: Authentication required
  ```

*/
router.put(
"/:projectName",
isAuthenticated,
updateProject
);

/**

* @swagger
* /project/{projectName}:
* delete:
* ```
  summary: Delete a project
  ```
* ```
  parameters:
  ```
* ```
    - in: path
  ```
* ```
      name: projectName
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
      description: Project deleted
  ```

*/
router.delete("/:projectName", deleteProject);

module.exports = router;
