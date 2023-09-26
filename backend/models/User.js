// Import necessary modules
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Get mongoose Schema class
const Schema = mongoose.Schema;

// Define Schema for User model
const userSchema = new Schema({
  _id: {
    type: String,
  },
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: () => Date.now(),
  },
});

// Static signup method
userSchema.statics.signup = async function (username, email, password, name, surname) {
  // Name and surname are not required fields, the user will be able to enter these on their profile page

  // Check if username is present
  if (!username) {
    throw Error("Username is required!")
  }
  // Check if email is present
  if (!email) {
    throw Error("Email is required");
  }
  // Check is password is present
  if (!password) {
    throw Error("Password is required")
  }

  // Check if email already exists in the datbase
  const emailExists = await this.exists({ email });

  if (emailExists) {
    throw Error("Email is already associated with an account");
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
  const user = await this.create({ username, email, password: hash });

  return user;
};

// Static login method
userSchema.statics.login = async function (username, email, password) {
  // Check if an email or username present
  if (!username || !email) {
    throw Error("An email or username is required!")
  }

  // Check is using email or username to login
  const usingEmail = !email ? false : true;

  // Check password is present
  if (!password) {
    throw Error("A password is required!");
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
