const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database terhubung!");
}).catch((err) => {
    console.log("Koneksi gagal:", err);
});

const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true}));


const session = require('express-session');

app.use(session({
    secret: 'rahasia', // Bisa diganti dengan string acak yang lebih aman
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Jika pakai HTTPS, ubah jadi true
}));

app.get('/', (req, res) => { 
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

const User = require('./models/user'); 
const bcrypt = require('bcrypt');

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        console.log("User berhasil terdaftar:", username);
        res.send("Registrasi berhasil! Silakan <a href='/login'>Login</a>");
    } catch (err) {
        console.log(err);
        res.send("Terjadi kesalahan saat registrasi.");
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Cari user di database
        const user = await User.findOne({ username });

        if (!user) {
            return res.send("Username tidak ditemukan. <a href='/login'>Coba lagi</a>");
        }

        // Bandingkan password yang diinput dengan password di database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send("Password salah. <a href='/login'>Coba lagi</a>");
        }

        // Simpan session login
        req.session.user = user;
        res.send(`Login berhasil! <a href='/dashboard'>Masuk ke Dashboard</a>`);
    } catch (err) {
        console.log(err);
        res.send("Terjadi kesalahan saat login.");
    }
});

app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.send("Anda harus login terlebih dahulu. <a href='/login'>Login</a>");
    }
    res.send(`Selamat datang, ${req.session.user.username}! <a href='/logout'>Logout</a>`);
});

app.get('/logout', (req, res) => {
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