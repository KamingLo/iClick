const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const User = require("./models/user");

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

const port = 3000;

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

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/leaderboard", (req, res) => {
  res.render("leaderboard");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Cek apakah username atau email sudah digunakan
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.render("register", {
        errorMessage: "Username or email have been used!",
      });
    }

    // Buat user baru
    const newUser = new User({ username, email, password });
    await newUser.save();

    console.log("User berhasil terdaftar:", username);
    res.render("login", { successMessage: "Registration successful!"});
  } catch (err) {
    console.log(err);
    res.render("register", {
      errorMessage: "Terjadi kesalahan saat registrasi.",
    });
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Cari user di database
    const user = await User.findOne({ username });

    if (!user) {
      return res.send(
        res.render('login', { errorMessage: "Invalid username or password!" })
      );
    }

    // Bandingkan password yang diinput dengan password di database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render('login', { errorMessage: "Invalid username or password!" })
    }

    // Simpan session login
    req.session.user = user;
    return res.render('home')
  } catch (err) {
    console.log(err);
    return res.render('login', { errorMessage: "Invalid username or password!" })
  }
});

app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.send(
      "Anda harus login terlebih dahulu. <a href='/login'>Login</a>"
    );
  }
  res.send(
    `Selamat datang, ${req.session.user.username}! <a href='/logout'>Logout</a>`
  );
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Gagal logout.");
    }
    res.send("Logout berhasil! <a href='/login'>Login lagi</a>");
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
