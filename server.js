require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const port = process.env.port || 3000;
const app = express();

// Create server and Socket.IO instance
const server = app.listen(port, () => console.log(`💬 server on port http://localhost:${port}`));
const io = require('socket.io')(server);

// Socket.IO connection handling
const socketsConnected = new Set();
const userSocketMap = {};

//Fungsi agar socket.io bisa diakses di semua route
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

//Koneksi ke mongodb Atlas (Cloud Based)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database terhubung!"))
  .catch((err) => console.log("Koneksi gagal:", err));

  //Setting agar templating ejs dapat digunakan 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setting session
app.use(
  session({
    secret: "rahasia",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//penerusan session ke routes lainnya
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

//Routes yang didapatkan dari folder routes (internal modules)
const friendRoutes = require("./routes/friend");
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const changeRoutes = require("./routes/change");
const globalRoutes = require("./routes/global");
const leaderboardRouter = require("./routes/leaderboard");

//Cek session user
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect("/login");
};

//Express memastikan routes dapat dipanggil
app.use("/global", globalRoutes);
app.use("/", authRoutes);
app.use("/",  homeRoutes);
app.use("/", changeRoutes);
app.use("/", friendRoutes);
app.use("/leaderboard", leaderboardRouter);

//Routes untuk halaman login dan register
app.get("/", (req, res) => {
  if (req.session.user) {
    return res.redirect("/home");
  }
  res.redirect("/login");
});

//Memberikan info bahwa halaman tidak ditemukan
app.use((req, res) => {
  res.status(404).render("error", {
    KodeError: "404 Not Found",
    MessageError: "Halaman tidak ditemukan",
  });
});