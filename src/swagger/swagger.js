const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Portfolio Builder API",
      version: "1.0.0",
      description:
        "API for Portfolio Builder Project",
    },
    servers: [
      {
        url: "https://portfolio-builder-api-v1jr.onrender.com",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);