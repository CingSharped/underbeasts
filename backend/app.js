// Import necessary modules
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

// Create an Express application
const app = express();

// Import user routes
const userRoutes = require("./routers/users");

// Middleware: Enable CORS
app.use(cors());

// Middleware: Parse JSON requests
app.use(express.json());

// Middleware: Logging
app.use(logger("dev"));

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to my Express API template");
});

// User routes
app.use("/users", userRoutes);

// Export the Express application
module.exports = app;
