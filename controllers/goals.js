const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const newGoal = req.body;

  res.render("goals/index.ejs", { user });
});

router.post("/", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const newGoal = req.body;
  user.goals.push(newGoal);

  await user.save();

  res.redirect("/goals");
});

router.delete("/:id", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const goals = user.goals.id(req.params.id);
  goals.deleteOne();
  await user.save();
  res.redirect("/goals");
});

module.exports = router;
