const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");

const app = express();
const port = 3000;

// Koneksi ke MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mydatabase")
  .then(() => console.log("Database terhubung!"))
  .catch((err) => console.log("Koneksi gagal:", err));

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
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

// Import Routes
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const leaderboardRouter = require("./routes/leaderboard");

// Gunakan rute
app.use("/", homeRoutes);
app.use("/", authRoutes);  // Memastikan /login bisa diakses langsung tanpa /auth
app.use("/leaderboard", leaderboardRouter);

// Menangani halaman yang tidak ditemukan (404)
app.use((req, res) => {
  res.status(404).send("Halaman tidak ditemukan!");
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
