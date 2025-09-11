const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render("workouts/index.ejs", { user, workOuts: user.workOuts });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  res.render("workouts/new.ejs"); //, { user }
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const workout = user.workOuts.id(req.params.id);
  //   console.log("Show Page, workout: ", workout);
  res.render("workouts/show.ejs", { user, workout });
});

router.get("/:id/edit", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const workout = user.workOuts.id(req.params.id);
  res.render("workouts/edit.ejs", { user, workout });
  //   console.log(workout.title);
});

router.post("/", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const newWorkout = {
    title: req.body.title,
  };
  user.workOuts.push(newWorkout);
  await user.save();
  res.redirect("/workouts");
});

router.post("/:id", async (req, res) => {
  console.log("I am making a POST request to Exercises");
  const user = await User.findById(req.session.user._id);
  const workout = user.workOuts.id(req.params.id);
  workout.exercise.push(req.body);

  await user.save();

  res.redirect(`/workouts/${workout._id}`);
  console.log(workout._id);
});

router.put("/:workoutId/edit", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const workout = user.workOuts.id(req.params.id);

  res.redirect(`/workouts/${req.params.workoutId}`);
});

router.put("/:id", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const workout = user.workOuts.id(req.params.id);
  workout.title = req.body.title;
  await user.save();
  res.redirect("/workouts");
});

router.delete("/:id", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const workout = user.workOuts.id(req.params.id);
  console.log("Deleting workout: ", workout);
  workout.deleteOne();
  await user.save();
  res.redirect(`/workouts`);
});

router.delete("/:workoutId/exercises/:exerciseId", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const workout = user.workOuts.id(req.params.workoutId);
  const exercise = workout.exercise.id(req.params.exerciseId);
  exercise.deleteOne();
  await user.save();
  res.redirect(`/workouts/${req.params.workoutId}`);
});

module.exports = router;
