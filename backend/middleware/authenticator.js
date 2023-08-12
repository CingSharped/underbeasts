// Import necessary modules
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware function to authenticate requests
const authenticator = async (req, res, next) => {
  // Extract the 'authorization' header from the request
  const { authorization } = req.headers;

  // If 'authorization' header is missing, return an error response
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // Extract the token from the 'authorization' header
  const token = authorization.split(" ")[1];

  try {
    // Verify the token and extract the _id (user ID) from it
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Find the user with the extracted _id and select only the _id field
    req.user = await User.findOne({ _id }).select("_id");

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If an error occurs during verification, log it and return an error response
    console.log(error.message);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

// Export the authenticator middleware
module.exports = authenticator;
