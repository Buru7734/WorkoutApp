const express = require("express");
const router = express.Router();

const User = require("../models/user");

//Displays Workouts
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render("workouts/index.ejs", { user, workOuts: user.workOuts });
  } catch (error) {
    console.log(error);
    res.redirect("/workouts");
  }
});

//Displays Adding Workout
router.get("/new", (req, res) => {
  res.render("workouts/new.ejs"); //, { user }
});

//Displays Exercises
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const workout = user.workOuts.id(req.params.id);
  res.render("workouts/show.ejs", { user, workout });
});

//Displays to edit Workout
router.get("/:id/edit", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const workout = user.workOuts.id(req.params.id);
  res.render("workouts/edit.ejs", { user, workout });
});

//Creating a workout
router.post("/", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const newWorkout = {
    title: req.body.title,
  };
  user.workOuts.push(newWorkout);
  await user.save();
  res.redirect("/");
});

//Creating a exercise
router.post("/:id", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const workout = user.workOuts.id(req.params.id);
  workout.exercise.push(req.body);

  await user.save();

  res.redirect(`/workouts/${workout._id}`);
});

//Edit a exercise
router.put("/:workoutId/exercises/:exerciseId", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const workout = user.workOuts.id(req.params.workoutId);
  const exercise = workout.exercise.id(req.params.exerciseId);

  const { name, sets, reps, weight } = req.body;
  exercise.name = req.body.name;
  exercise.sets = req.body.sets;
  exercise.reps = req.body.reps;
  exercise.weight = req.body.weight;
  await user.save();

  res.redirect(`/workouts/${req.params.workoutId}`);
});

//Edit a workout
router.put("/:id", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const workout = user.workOuts.id(req.params.id);
  workout.title = req.body.title;
  await user.save();
  res.redirect("/workouts");
});

//Delete a Workout
router.delete("/:id", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const workout = user.workOuts.id(req.params.id);

  workout.deleteOne();
  await user.save();
  res.redirect(`/workouts`);
});

//Delete an exercise
router.delete("/:workoutId/exercises/:exerciseId", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const workout = user.workOuts.id(req.params.workoutId);
  const exercise = workout.exercise.id(req.params.exerciseId);
  exercise.deleteOne();
  await user.save();
  res.redirect(`/workouts/${req.params.workoutId}`);
});

module.exports = router;
