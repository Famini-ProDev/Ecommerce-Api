const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Management API",
      version: "1.0.0",
      description: "API for managing users",
    },
    servers: [{ url: "http://localhost:8000" }],
    components: {
      schemas: {
        UserRegister: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "Ali" },
            email: { type: "string", example: "ali@gmail.com" },
            password: { type: "string", example: "123456" },
          },
        },
        UserLogin: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "ali@gmail.com" },
            password: { type: "string", example: "123456" },
          },
        },
        UpdateUser: {
          type: "object",
          properties: {
            name: { type: "string", example: "Ali Updated" },
            email: { type: "string", example: "ali_updated@gmail.com" },
          },
        },
        Tokens: {
          type: "object",
          properties: {
            accessToken: { type: "string" },
            refreshToken: { type: "string" },
          },
        },
      },
      responses: {
        NotFound: { description: "Resource not found" },
        BadRequest: { description: "Bad request" },
        Unauthorized: { description: "Unauthorized" },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    tags: [{ name: "Users", description: "User management APIs" }],
    paths: {
      "/users/register": {
        post: {
          summary: "Register a new user",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserRegister" },
              },
            },
          },
          responses: {
            201: { description: "User registered successfully" },
            400: { $ref: "#/components/responses/BadRequest" },
          },
        },
      },
      "/users/login": {
        post: {
          summary: "Login user",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserLogin" },
              },
            },
          },
          responses: {
            200: { description: "Login successful" },
            400: { $ref: "#/components/responses/BadRequest" },
            401: { $ref: "#/components/responses/Unauthorized" },
          },
        },
      },
      "/users/me": {
        get: {
          summary: "Get logged in user profile",
          tags: ["Users"],
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "User profile retrieved" },
            401: { $ref: "#/components/responses/Unauthorized" },
          },
        },
        put: {
          summary: "Update logged in user profile",
          tags: ["Users"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateUser" },
              },
            },
          },
          responses: {
            200: { description: "Profile updated" },
            400: { $ref: "#/components/responses/BadRequest" },
            401: { $ref: "#/components/responses/Unauthorized" },
          },
        },
      },
      "/users": {
        get: {
          summary: "Get list of users (admin only)",
          tags: ["Users"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              in: "query",
              name: "page",
              schema: { type: "integer" },
              description: "Page number",
            },
            {
              in: "query",
              name: "limit",
              schema: { type: "integer" },
              description: "Items per page",
            },
          ],
          responses: {
            200: { description: "Users list retrieved" },
            401: { $ref: "#/components/responses/Unauthorized" },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
