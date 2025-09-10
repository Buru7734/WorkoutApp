const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});

router.get("/sign-out", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

router.post("/sign-up", async (req, res) => {
  let { username, password, confirmPassword } = req.body;
  console.log(req.body);

  //Check if usr exist
  const userExist = await User.findOne({ username: username });
  if (userExist) {
    return res.send("User already exists");
  }
  //Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).send("Passwords didn't match, please try again");
  }

  //Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);
  password = hashedPassword;

  const user = await User.create({ username, password });
  res.status(200).redirect("/auth/sign-in");
});

router.post("/sign-in", async (req, res) => {
  let { username, password } = req.body;
  // Checks to see if user exist
  const userExists = await User.findOne({ username: username });
  if (!userExists) {
    return res.send("This user does not exist. Sign up first");
  }

  // Check password
  const validPassword = bcrypt.compareSync(password, userExists.password);
  if (!validPassword) {
    return res.status(400).send("The password was wrong. try again");
  }

  //create session
  req.session.user = { username, _id: userExists._id };
  req.session.save(() => {
    res.redirect("/");
  });
});

module.exports = router;
