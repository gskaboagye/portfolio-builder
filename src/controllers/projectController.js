const Joi = require("joi");
const { getDB } = require("../database/connect");

const projectSchema = Joi.object({
projectName: Joi.string().required(),
description: Joi.string().required(),
technology: Joi.string().required(),
githubUrl: Joi.string().required(),
});

const getProjects = async (req, res) => {
try {
const db = getDB();
const projects = await db.collection("projects").find().toArray();
res.status(200).json(projects);
} catch (error) {
res.status(500).json({ error: error.message });
}
};

const getProjectByName = async (req, res) => {
try {
const db = getDB();

```
const project = await db.collection("projects").findOne({
  projectName: req.params.projectName,
});

if (!project) {
  return res.status(404).json({
    message: "Project not found",
  });
}

res.status(200).json(project);
```

} catch (error) {
res.status(500).json({ error: error.message });
}
};

const createProject = async (req, res) => {
try {
const { error } = projectSchema.validate(req.body);

```
if (error) {
  return res.status(400).json({
    error: error.details[0].message,
  });
}

const db = getDB();

const result = await db
  .collection("projects")
  .insertOne(req.body);

res.status(201).json(result);
```

} catch (error) {
res.status(500).json({ error: error.message });
}
};

const updateProject = async (req, res) => {
try {
const { error } = projectSchema.validate(req.body);

```
if (error) {
  return res.status(400).json({
    error: error.details[0].message,
  });
}

const db = getDB();

const result = await db.collection("projects").updateOne(
  { projectName: req.params.projectName },
  { $set: req.body }
);

if (result.matchedCount === 0) {
  return res.status(404).json({
    message: "Project not found",
  });
}

res.status(200).json({
  message: "Project updated successfully",
});
```

} catch (error) {
res.status(500).json({ error: error.message });
}
};

const deleteProject = async (req, res) => {
try {
const db = getDB();

```
const result = await db.collection("projects").deleteOne({
  projectName: req.params.projectName,
});

if (result.deletedCount === 0) {
  return res.status(404).json({
    message: "Project not found",
  });
}

res.status(200).json({
  message: "Project deleted successfully",
});
```

} catch (error) {
res.status(500).json({ error: error.message });
}
};

module.exports = {
getProjects,
getProjectByName,
createProject,
updateProject,
deleteProject,
};
