// Import necessary modules
const express = require("express");

// Import controller functions for user authentication
const { loginUser, signupUser } = require("../controllers/users");

// Create a new router instance
const router = express.Router();

// Login route
router.post("/login", loginUser);

// Signup route
router.post("/signup", signupUser);

// Export the router
module.exports = router;
