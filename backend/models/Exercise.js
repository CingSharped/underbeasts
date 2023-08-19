// Import necessary modules
require("dotenv").config();
const mongoose = require("mongoose");

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
  exerciseName: {
    type: String,
    required: true,
    unique: true,
  },
  exerciseDescription: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: () => Date.now(),
  }
})

userSchema.statics.create = async function(name, description) {
  if (!name || !description) {
    throw Error("Name and description required")
  }

  const exerciseExists = await this.exists({ name })

  if (exerciseExists) {
    throw Error("Exercise already exists")
  }

  const exercise = await this.findOne({ name })

  return exercise
}

module.exports = mongoose.model("Exercise", exerciseSchema)