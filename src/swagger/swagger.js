const swaggerJsdoc = require("swagger-jsdoc");

const options = {
definition: {
openapi: "3.0.0",
info: {
title: "Portfolio Builder API",
version: "1.0.0",
description: "API for Portfolio Builder Project",
},
servers: [
{
url: "https://portfolio-builder-api-v1jr.onrender.com",
description: "Render Production Server",
},
{
url: "http://localhost:3000",
description: "Local Development Server",
},
],
},
apis: [
"./src/routes/user.js",
"./src/routes/theme.js",
"./src/routes/project.js",
"./src/routes/skill.js",
"./src/routes/auth.js",
],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
