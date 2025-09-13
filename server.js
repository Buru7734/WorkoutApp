const express = require("express");
const db = require("./db/connections.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const isSignedIn = require("./middleware/is-sign-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");
const methodOverride = require("method-override");
const app = express();

const authRouter = require("./controllers/auth.js");
const workoutsRouter = require("./controllers/workouts.js");
const goalsRouter = require("./controllers/goals.js");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(passUserToView);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/workouts");
  } else {
    res.render("index.ejs");
  }
});

app.use(isSignedIn);

app.use("/workouts", workoutsRouter);
app.use("/goals", goalsRouter);

db.on("connected", () => {
  console.clear();
  console.log("Connected to MongoDb");
  app.listen(3000, (req, res) => {
    console.log("Listening Port 3000");
  });
});
