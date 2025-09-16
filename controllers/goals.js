const express = require("express");
const router = express.Router();

const User = require("../models/user");



//Display page
router.get("/", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const daysExercise = user.goals
   console.log(daysExercise)
  // console.log("This is where we are", user.goals[0])
  // const daysExercise = user.goals
  
  // console.log(user.goals)
  // console.log(user.goals)
  res.render("goals/index.ejs", { user, daysExercise});
});


//Display page
router.get("/:id", async (req,res) => {
  console.log("are we ever here")
  const user = await User.findById(req.session.user._id);
  const daysExercise = user.goals
  const goals = user.goals.id(req.params.id);
  res.render("goals/index.ejs", {user, daysExercise, goals})
})

//Create goal
router.post("/", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const newGoal = req.body;
  user.goals.push(newGoal);
  
  await user.save();

  res.redirect("/goals");
});


//delete goal
router.delete("/:id", async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const goals = user.goals.id(req.params.id);
  goals.deleteOne();
  await user.save();
  res.redirect("/goals");
});


//Create days 
router.post("/:daysId", async (req, res) => {
  const user = await User.findById(req.session.user._id)
   const goal = user.goals.id(req.params.daysId);
   console.log(user.goals)
  console.log("here's where we are",req.body.days)
  // console.log("User: ", user.goals[0].days)
  // console.log("checking the push",user)
  
  
  user.goals[0].days.push(req.body)
  await user.save()
  
  res.redirect("/goals/:id")
})


module.exports = router;
