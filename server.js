const express = require("express");
const db = require("./db/connections.js");
const authRouter = require("./controllers/auth.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const isSignedIn = require("./middleware/is-sign-in.js");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

app.use(express.urlencoded({ extended: false }));
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.render("index.ejs", {
    user: req.session.user,
  });
});

app.get("/vip", isSignedIn, (req, res) => {
  if (req.session.user) return res.send("You've got access");
  res.send("You don't have access, please authenticate");
  console.log(req.session.user);
});

db.on("connected", () => {
  console.log("Connected to MongoDb");
  app.listen(3000, (req, res) => {
    console.log("Listening Port 3000");
  });
});
