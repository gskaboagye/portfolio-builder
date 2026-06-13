const Joi = require("joi");
const { getDB } = require("../database/connect");

const skillSchema = Joi.object({
skillName: Joi.string().required(),
level: Joi.string().required(),
});

const getSkills = async (req, res) => {
try {
const db = getDB();
const skills = await db.collection("skills").find().toArray();
res.status(200).json(skills);
} catch (error) {
res.status(500).json({ error: error.message });
}
};

const getSkillByName = async (req, res) => {
try {
const db = getDB();

```
const skill = await db.collection("skills").findOne({
  skillName: req.params.skillName,
});

if (!skill) {
  return res.status(404).json({
    message: "Skill not found",
  });
}

res.status(200).json(skill);
```

} catch (error) {
res.status(500).json({ error: error.message });
}
};

const createSkill = async (req, res) => {
try {
const { error } = skillSchema.validate(req.body);

```
if (error) {
  return res.status(400).json({
    error: error.details[0].message,
  });
}

const db = getDB();

const result = await db
  .collection("skills")
  .insertOne(req.body);

res.status(201).json(result);
```

} catch (error) {
res.status(500).json({ error: error.message });
}
};

const updateSkill = async (req, res) => {
try {
const { error } = skillSchema.validate(req.body);

```
if (error) {
  return res.status(400).json({
    error: error.details[0].message,
  });
}

const db = getDB();

const result = await db.collection("skills").updateOne(
  { skillName: req.params.skillName },
  { $set: req.body }
);

if (result.matchedCount === 0) {
  return res.status(404).json({
    message: "Skill not found",
  });
}

res.status(200).json({
  message: "Skill updated successfully",
});
```

} catch (error) {
res.status(500).json({ error: error.message });
}
};

const deleteSkill = async (req, res) => {
try {
const db = getDB();

```
const result = await db.collection("skills").deleteOne({
  skillName: req.params.skillName,
});

if (result.deletedCount === 0) {
  return res.status(404).json({
    message: "Skill not found",
  });
}

res.status(200).json({
  message: "Skill deleted successfully",
});
```

} catch (error) {
res.status(500).json({ error: error.message });
}
};

module.exports = {
getSkills,
getSkillByName,
createSkill,
updateSkill,
deleteSkill,
};
