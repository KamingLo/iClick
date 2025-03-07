// Inisialisasi variabel yang nanti nya akan digunakan pada program
let nilaiKlik = 0;
let permainanSelesai = false;
let sedangBermain = false;
let waktuPermainan = 5;
let bonusAktif = false;

// Mengambil semua elemen HTML yang dibutuhkan pada program
let tombolMain = document.querySelector(".ButtonPlay");
let tombolUlang = document.querySelector(".ButtonRestart");
let tombolMode = document.getElementById("modeButton");
let textTimer = document.querySelector(".BoxWaktu p");
let textKecepatan = document.querySelector(".BoxKecepatan p");
let textNilai = document.querySelector(".BoxNilai p");
let textBonus = document.getElementById("bonusIndicator");

// ini akan berfungsi untuk menyembunyikan tombol ulang (restart) pada saat awal permainan
tombolUlang.style.visibility = "hidden";

// Fungsi ini digunakan untuk mengganti mode permainan
// Terdapat 3 jenis mode waktu yang berbeda
function gantiMode() {
  // Melakukan pengecekan terlebih dulu apakah sedang tidak bermain
  if (!sedangBermain) {
    // Ganti waktu permainan berdasarkan nilai sebelumnya. 
    // bergantian secara berurutan: 5 seconds -> 10 seconds -> 15 seconds lalu kembali ke awal. 
    if (waktuPermainan === 5) {
      waktuPermainan = 10;
    } else if (waktuPermainan === 10) {
      waktuPermainan = 15;
    } else {
      waktuPermainan = 5;
    }

    // Memperbarui text pada tombol mode waktu berdasarkan waktu permainan.
    tombolMode.innerText = "Mode: " + waktuPermainan + " Seconds";
  }
}

// Fungsi ini digunakan untuk menghitung kecepatan klik per detik. 
// fungsi ini akan menerima parameter lalu mengembalikan sebuah nilai
function hitungKecepatan(klik, waktu) {
  return (klik / waktu).toFixed(2);
}

// Fungsi untuk memulai permainan 
function mulaiPermainan() {
  // Melakukan pengecekan terlebih dulu apakah sedang tidak bermain
  if (!sedangBermain && !permainanSelesai) {
    // Mengatur ulang nilai-nilai 
    sedangBermain = true;
    nilaiKlik = 0;
    tombolMain.innerHTML = "Klik secepat mungkin!";
    tombolUlang.style.visibility = "hidden";

    // Mencatat waktu mulai. Variabel ini akan digunakan untuk menghitung berapa lama waktu telah berjalan
    // waktu yang digunakan menggunakan satuan milidetik
    let waktuMulai = Date.now();

    // Menjalankan penghitung waktu menggunakan asynchronous setInterval()
    // pada fungsi ini set interval di atur pada 100 
    let hitungWaktu = setInterval(function () {
      // Menghitung waktu yang sedang berjalan dengan cara menghitung selisih waktu saat ini dengan waktu mulai
      // variabel ini akan menyimpan jumlah detik nya
      let waktuBerjalan = (Date.now() - waktuMulai) / 1000;

      // Memperbarui tampilan untuk waktu, kecepatan dan nilai
      textTimer.innerHTML = "Waktu: " + waktuBerjalan.toFixed(2) + "s";
      textKecepatan.innerHTML =
        "Kecepatan: " + hitungKecepatan(nilaiKlik, waktuBerjalan) + " klik/detik";
      textNilai.innerHTML = "Nilai: " + nilaiKlik;

      // Melakukan pengecekan apakah waktu telah habis, menggunakan clearInterval untuk menghetikan hitung waktu
      if (waktuBerjalan >= waktuPermainan) {
        clearInterval(hitungWaktu);
        akhirPermainan();
      }
    }, 100);
  }
}

// Fungsi untuk mengaktifkan bonus
function aktifkanBonus() {
    // mengatur ulang nilai
    bonusAktif = true;
    textBonus.classList.remove("hidden");

    // Mematikan tampilan bonus setelah 2 detik menggunakan asynchronous setTimeout()
    setTimeout(function () {
      bonusAktif = false;
      textBonus.classList.add("hidden");
    }, 2000);
}

// Fungsi ini digunakan untuk menghitung banyak klik
function klikDilakukan() {
  if (sedangBermain) {
    // Tambah nilai (dobel jika bonus aktif)
    if (bonusAktif) {
      nilaiKlik = nilaiKlik + 2;
    } else {
      nilaiKlik = nilaiKlik + 1;
    }

    // Cek kesempatan dapat bonus (5%)
    while (Math.random() < 0.05 && !bonusAktif) {
      aktifkanBonus();
    }
  }
}

// Fungsi ini akan digunakan untuk mengakhiri permainan
function akhirPermainan() {
  // mengatur ulang nilai-nilai
  sedangBermain = false;
  permainanSelesai = true;

  // menentukan peringkat pemain berdasarkan jumlah klik pemain
  let peringkat = "Pemula";
  if (nilaiKlik >= 150) {
    peringkat = "Legend";
  } else if (nilaiKlik >= 100) {
    peringkat = "Pro";
  } else if (nilaiKlik >= 50) {
    peringkat = "Amatir";
  }

  // Menampilkan hasil
  tombolMain.innerHTML = "Peringkat: " + peringkat;
  tombolUlang.style.visibility = "visible";
}

// Fungsi ini digunakan untuk mengatur permainan seperti semula (restart).
// pada fungsi ini semua nilai akan di atur ulang ke nilai default (reset).
function ulangPermainan() {
  // Mengatur ulang semua nilai
  textTimer.innerHTML = "Waktu: 0s";
  textKecepatan.innerHTML = "Kecepatan: 0 klik/detik";
  textNilai.innerHTML = "Nilai: 0";
  tombolMain.innerHTML = "Klik disini untuk mulai 🔥";
  nilaiKlik = 0;
  sedangBermain = false;
  bonusAktif = false;
  permainanSelesai = false;
  tombolUlang.style.visibility = "hidden";
  textBonus.classList.add("hidden");
}

// Fungsi untuk efek ripple saat tombol diklik
function buatEfekRipple(event) {
  let tombol = event.currentTarget;
  let ripple = document.createElement("span");

  ripple.classList.add("ripple");
  ripple.style.width = Math.max(tombol.offsetWidth, tombol.offsetHeight) + "px";
  ripple.style.height =
    Math.max(tombol.offsetWidth, tombol.offsetHeight) + "px";
  ripple.style.left = event.offsetX - ripple.offsetWidth / 2 + "px";
  ripple.style.top = event.offsetY - ripple.offsetHeight / 2 + "px";

  // menggunakan Asynchronous untuk mengatur
  tombol.appendChild(ripple);
  setTimeout(function () {
    ripple.remove();
  }, 600);
}

// Hapus atau ganti event listener DOMContentLoaded yang lama
// Dan ganti dengan yang lebih sederhana
document.body.addEventListener("click", function (event) {
  if (permainanSelesai && !event.target.classList.contains("ButtonRestart")) {
    return;
  }
});

// Pasang semua event listener
tombolMain.addEventListener("click", mulaiPermainan);
tombolUlang.addEventListener("click", ulangPermainan);
tombolMode.addEventListener("click", gantiMode);
tombolMain.addEventListener("click", klikDilakukan);
tombolMain.addEventListener("click", buatEfekRipple);
tombolUlang.addEventListener("click", buatEfekRipple);
