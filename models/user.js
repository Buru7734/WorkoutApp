const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  // list out fields
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
});

const workOutSchema = new mongoose.Schema({
  // list out fields
  title: { type: String, required: true },
  notes: String,
  exercise: [exerciseSchema],
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  workOuts: [workOutSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
