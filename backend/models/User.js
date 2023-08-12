// Import necessary modules
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Get mongoose Schema class
const Schema = mongoose.Schema;

// Define Schema for User model
const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: () => Date.now(),
  },
});

// Static signup method
userSchema.statics.signup = async function (username, password) {
  // Check if both username and password are provided
  if (!password || !username) {
    throw Error("All fields required!");
  }

  // Check if the username already exists in the database
  const usernameExists = await this.exists({ username });

  if (usernameExists) {
    throw Error("Username already in use");
  }

  // Generate a salt and hash the password
  const saltValue = parseInt(process.env.SALT);
  const salt = await bcrypt.genSalt(saltValue);
  const hash = await bcrypt.hash(password, salt);

  // Create a new user document in the database
  const user = await this.create({ username, password: hash });

  return user;
};

// Static login method
userSchema.statics.login = async function (username, password) {
  // Check if both username and password are provided
  if (!password || !username) {
    throw Error("All fields required!");
  }

  // Find the user document with the given username
  const user = await this.findOne({ username });

  if (!user) {
    throw Error("Username does not exist");
  }

  // Compare the provided password with the hashed password in the database
  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    throw Error("Invalid login credentials");
  }

  return user;
};

// Export the User model
module.exports = mongoose.model("User", userSchema);
