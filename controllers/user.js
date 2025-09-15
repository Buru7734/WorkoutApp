const express = require("express")
const router = express.Router()

const User = require("../models/user");
const session = require("express-session");

router.get("/user", (req, res) => {
res.render("user.ejs")
})

router.delete("/:userId",async (req, res) => {
  await User.findByIdAndDelete(req.session.user._id);
  // await user.save();
  req.session.destroy(() => {
    res.redirect("/");
  });
})

module.exports = router;

