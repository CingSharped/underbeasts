// Import necessary modules
require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

// Connect to MongoDB using the provided URI
mongoose
  .connect(
    process.env.MONGO_URI,
    process.env.DEV ? { dbName: "test" } : { dbName: "cramodoro" }
  )
  .then(() => {
    // Start the Express app and listen on the specified port
    app.listen(process.env.PORT, () => {
      console.log(
        `API connected to MongoDB & listening on port ${process.env.PORT}...`
      );
    });
  })
  .catch((error) => {
    // If an error occurs during database connection, log the error message
    console.log(error.message);
  });
