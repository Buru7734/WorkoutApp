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

// router.get("/index", async (req, res) => {
//   const user = await User.findById(req.session.user._id);
//   res.render("workouts/index.ejs", { user: { workOuts: user.workOuts } });
// });

router.get("/new", (req, res) => {
  //   const user = req.session.user;
  res.render("workouts/new.ejs"); //, { user }
});

// router.get("/show", (req, res) => {
//   res.render("/workouts/show.ejs");
// });

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const workout = user.workOuts.id(req.params.id);
  res.render("workouts/show.ejs", { user, workout });
  //   const { name, sets, reps, weight } = req.body;

  //   console.log(name);
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
  const user = await User.findById(req.session.user._id);
  const workout = user.workOuts.id(req.params.id);
  workout.exercise.push(req.body);

  await user.save();

  res.redirect(`/workouts/${workout._id}`);
});

module.exports = router;
