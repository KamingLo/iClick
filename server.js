<<<<<<< HEAD
=======
require('dotenv').config();  // Ini HARUS di awal

>>>>>>> ver.2.1.28
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
<<<<<<< HEAD

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
=======
require('dotenv').config();  // <-- Pastikan ini ada sebelum penggunaan `process.env`

const port = process.env.port;
const app = express();

// Create server and Socket.IO instance
const server = app.listen(port, () => console.log(`💬 server on port http://localhost:${port}`));
const io = require('socket.io')(server);

// Socket.IO connection handling
const socketsConnected = new Set();
// Add this near the top of server.js where you set up Socket.IO
const userSocketMap = {};

io.on('connection', (socket) => {
    socketsConnected.add(socket.id);
    console.log('User connected:', socket.id);
    
    io.emit('clients-total', socketsConnected.size);

    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        socketsConnected.delete(socket.id);
        io.emit('clients-total', socketsConnected.size);
    });

    socket.on('private message', (data) => {
      const { senderId, receiverId, message } = data;
      const receiverSocketId = userSocketMap[receiverId];
      
      if (receiverSocketId) {
          io.to(receiverSocketId).emit('private message', { 
              senderId, 
              message 
          });
      }
  
      // Untuk tampilkan juga di pengirim
      socket.emit('private message', { 
          senderId, 
          message 
      });
  });
  

    // Add socket authentication to track which socket belongs to which user
    socket.on('authenticate', (userId) => {
      console.log('User authenticated:', userId);
      // Store the user's socket ID for private messaging
      socket.userId = userId;
      // You might want to keep a map of userIds to socketIds
      userSocketMap[userId] = socket.id;
    });
});

mongoose
.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("🟢 Terhubung ke MongoDB Atlas"))
.catch((err) => console.log("🔴 Gagal konek MongoDB Atlas:", err));



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
>>>>>>> ver.2.1.28
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

<<<<<<< HEAD
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
=======
const friendRoutes = require("./routes/friend");
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const changeRoutes = require("./routes/change");
const globalRoutes = require("./routes/global");
const leaderboardRouter = require("./routes/leaderboard");

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect("/login");
};

app.use("/global", globalRoutes);
app.use("/", authRoutes);
app.use("/",  homeRoutes);
app.use("/", changeRoutes);
app.use("/", friendRoutes);
app.use("/leaderboard", leaderboardRouter);

app.get("/", (req, res) => {
  if (req.session.user) {
    return res.redirect("/home");
  }
  res.redirect("/login");
});

app.use((req, res) => {
  res.status(404).send("Halaman tidak ditemukan!");
});
>>>>>>> ver.2.1.28
