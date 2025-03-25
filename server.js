const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");

const app = express();

// Koneksi database
mongoose
  .connect("mongodb://127.0.0.1:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database terhubung!");
  })
  .catch((err) => {
    console.log("Koneksi gagal:", err);
  });

// Konfigurasi view engine dan middleware
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


// Menghubungkan route dari folder routes
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");

app.use("/", indexRoutes);
app.use("/", authRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
