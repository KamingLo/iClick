const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const leaderboardRoutes = require('./routes/leaderboard');
const deleteAccountRoutes = require('./routes/DeleteAcc');

const app = express();
const port = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/mydatabase")
  .then(() => console.log("Database terhubung!"))
  .catch((err) => console.log("Koneksi gagal:", err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "rahasia",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

const friendRoutes = require("./routes/friend");
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const changeRoutes = require("./routes/change");
const leaderboardRouter = require("./routes/leaderboard");

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect("/login");
};

app.use("/", authRoutes);
app.use("/",  homeRoutes);
app.use("/", changeRoutes);
app.use("/", friendRoutes);
app.use("/leaderboard", leaderboardRouter);
app.use("/", deleteAccountRoutes);

app.get("/", (req, res) => {
  if (req.session.user) {
    return res.redirect("/home");
  }
  res.redirect("/login");
});

app.use((req, res) => {
  res.status(404).send("Halaman tidak ditemukan!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});