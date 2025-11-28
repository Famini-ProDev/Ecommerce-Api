// app.js
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const userRoutes = require("./routes/user-routes");
const categoryRoutes = require("./routes/category-routes");
const orderRoutes = require("./routes/order-routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger/swaggerDocs");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/orders", orderRoutes);

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, { explorer: true })
);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong!",
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

module.exports = app;
