const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.get("/sign-up", async (req, res) => {
  let {  password, confirmPassword } = ""
   let condition = true;
  let userCheck = ''
  const schemas = await User.find({});
  console.log(password)
  console.log(confirmPassword)
  res.render("auth/sign-up.ejs", {schemas, condition, userCheck, password, confirmPassword});
});

router.get("/sign-in", async (req, res) => {
  let {  password, confirmPassword } = ""
  let condition = true;
  let userCheck = ''
  const schemas = await User.find({});
  res.render("auth/sign-in.ejs", {schemas, condition, userCheck, password, confirmPassword});
});

router.get("/sign-out", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

router.post("/sign-up", async (req, res) => {
  let condition = true;
  let userCheck = req.body.username
  let { username, email, password, confirmPassword } = req.body;
  const schemas = await User.find({});
  console.log(schemas)

  

  //Check if usr exist
  const userExist = await User.findOne({ username: username });
  if (userExist) {
    return res.render("auth/sign-up.ejs", {schemas, userCheck, condition, password, confirmPassword});
  }
  //Check if passwords match
  if (password !== confirmPassword) {
    return res.render("auth/sign-up.ejs", {schemas, userCheck, condition, password, confirmPassword});
  }

  //Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);
  password = hashedPassword;

  const user = await User.create({ username, email, password });
  res.status(200).redirect("/auth/sign-in");
});

router.post("/sign-in", async (req, res) => {
  let confirmPassword = ""
  let { username, password } = req.body;
  const userCheck = req.body.username
  const schemas = await User.find({});
  let condition = true
  // Checks to see if user exist
  const userExists = await User.findOne({ username: username });
 

  if (!userExists) {
    return res.render("auth/sign-in.ejs", {userCheck, schemas, condition, confirmPassword});
  }

  // Check password
  const validPassword = bcrypt.compareSync(password, userExists.password, );
  if (!validPassword) {
    return res.render("auth/sign-in.ejs", {schemas, userCheck, condition, confirmPassword});
  }

  //create session
  req.session.user = { username, _id: userExists._id };
  req.session.save(() => {
    res.redirect("/");
  });
  // console.log(req.session.user._id);
});

module.exports = router;
