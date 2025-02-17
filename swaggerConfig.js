const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Use OpenAPI 3.0
    info: {
      title: "Farmassist API",
      version: "1.0.0",
      description: "API documentation for Farmassist project",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],
  },
  apis: ["./controllers/*.js"], // Path to the API route files
};

// Generate Swagger docs
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpec };
