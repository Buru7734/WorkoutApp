const mongoose = require("mongoose");

const goalsSchema = new mongoose.Schema({
  goals: { type: String, required: true },
});

//Exercise
const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
});

//Workout
const workOutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  notes: String,
  exercise: [exerciseSchema],
});

//User
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
  goals: [goalsSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
