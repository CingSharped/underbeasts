// Import necessary modules
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Function to create a token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Login user
const loginUser = async (req, res) => {
  // Extract username and password from request body
  const { username, password } = req.body;
  try {
    // Attempt to log in the user using the User model
    const user = await User.login(username.toLowerCase(), password);

    // Generate a token for the user
    const token = createToken(user._id);

    // Return the username and token as a response
    res.status(200).json({ username, token });
  } catch (error) {
    // If an error occurs during login, send an error response
    res.status(400).json(error.message);
  }
};

// Signup User
const signupUser = async (req, res) => {
  // Extract username and password from request body
  const { username, email, password} = req.body;
  try {
    // Attempt to sign up the user using the User model
    const user = await User.signup(username.toLowerCase(),email, password);

    // Generate a token for the user
    const token = createToken(user._id);

    // Return the username and token as a response
    res.status(200).json({ username, token });
  } catch (error) {
    // If an error occurs during signup, send an error response
    res.status(400).json(error.message);
  }
};

// Export the functions
module.exports = {
  signupUser,
  loginUser,
};
