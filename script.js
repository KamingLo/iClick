// Inisialisasi variabel yang nanti nya akan digunakan pada program
let nilaiKlik = 0;
let permainanSelesai = false;
let sedangBermain = false;
let waktuPermainan = 5;
let bonusAktif = false;
let sudahDapatBonus = false;

// Ambil semua elemen HTML yang kita butuhkan
let tombolMain = document.querySelector(".ButtonPlay");
let tombolUlang = document.querySelector(".ButtonRestart");
let tombolMode = document.getElementById("modeButton");
let textTimer = document.querySelector(".BoxWaktu p");
let textKecepatan = document.querySelector(".BoxKecepatan p");
let textNilai = document.querySelector(".BoxNilai p");
let textBonus = document.getElementById("bonusIndicator");

// ini akan berfungsi untuk menyembunyikan tombol ulang pada saat awal permainan
tombolUlang.style.visibility = "hidden";

// Fungsi untuk mengganti mode permainan
function gantiMode() {
  // Cek dulu apakah sedang tidak bermain
  if (!sedangBermain) {
    // Ganti waktu permainan
    if (waktuPermainan === 5) {
      waktuPermainan = 10;
    } else if (waktuPermainan === 10) {
      waktuPermainan = 15;
    } else {
      waktuPermainan = 5;
    }

    // Perbarui text di tombol
    tombolMode.innerText = "Mode: " + waktuPermainan + " Seconds";
  }
}

// Fungsi untuk memulai permainan
function mulaiPermainan() {
  // Cek dulu apakah sedang tidak bermain
  if (!sedangBermain && !permainanSelesai) {
    // Atur ulang nilai-nilai awal
    sedangBermain = true;
    nilaiKlik = 0;
    sudahDapatBonus = false;
    tombolMain.innerHTML = "Klik secepat mungkin!";
    tombolUlang.style.visibility = "hidden";

    // Catat waktu mulai
    let waktuMulai = Date.now();

    // Jalankan penghitung waktu
    let hitungWaktu = setInterval(function () {
      // Hitung waktu yang sudah berlalu
      let waktuBerjalan = (Date.now() - waktuMulai) / 1000;

      // Perbarui tampilan
      textTimer.innerHTML = "Waktu: " + waktuBerjalan.toFixed(2) + "s";
      textKecepatan.innerHTML =
        "Kecepatan: " + (nilaiKlik / waktuBerjalan).toFixed(2) + " klik/detik";
      textNilai.innerHTML = "Nilai: " + nilaiKlik;

      // Cek apakah waktu sudah habis
      if (waktuBerjalan >= waktuPermainan) {
        clearInterval(hitungWaktu);
        akhirPermainan();
      }
    }, 100);
  }
}

// Fungsi untuk mengaktifkan bonus
function aktifkanBonus() {
  if (!sudahDapatBonus) {
    // Aktifkan bonus
    sudahDapatBonus = true;
    bonusAktif = true;
    textBonus.classList.remove("hidden");
    
    // Matikan bonus setelah 2 detik
    setTimeout(function () {
      bonusAktif = false;
      textBonus.classList.add("hidden");
    }, 2000);
  }
}

// Fungsi untuk menangani klik
function klikDilakukan() {
  if (sedangBermain) {
    // Tambah nilai (dobel jika bonus aktif)
    if (bonusAktif) {
      nilaiKlik = nilaiKlik + 2;
    } else {
      nilaiKlik = nilaiKlik + 1;
    }

    // Cek kesempatan dapat bonus (10%)
    let kesempatanBonus = Math.random();
    if (!sudahDapatBonus && kesempatanBonus < 0.1) {
      aktifkanBonus();
    }
  }
}

// Fungsi untuk mengakhiri permainan
function akhirPermainan() {
  sedangBermain = false;
  permainanSelesai = true;
  // Tentukan peringkat pemain
  let peringkat = "Pemula";
  if (nilaiKlik >= 150) {
    peringkat = "Legend";
  } else if (nilaiKlik >= 100) {
    peringkat = "Pro";
  } else if (nilaiKlik >= 50) {
    peringkat = "Amatir";
  }
  // Tampilkan hasil
  tombolMain.innerHTML = "Peringkat: " + peringkat;
  tombolUlang.style.visibility = "visible";
}

// Fungsi ini digunakan untuk mengatur permainan seperti semula (restart). 
// pada fungsi ini semua nilai akan di atur ulang ke nilai default (reset).
function ulangPermainan() {
  // Atur ulang semua nilai
  textTimer.innerHTML = "Waktu: 0s";
  textKecepatan.innerHTML = "Kecepatan: 0 klik/detik";
  textNilai.innerHTML = "Nilai: 0";
  tombolMain.innerHTML = "Klik disini untuk mulai 🔥";
  nilaiKlik = 0;
  sedangBermain = false;
  bonusAktif = false;
  sudahDapatBonus = false;
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
document.body.addEventListener("click", klikDilakukan);
tombolMain.addEventListener("click", buatEfekRipple);
tombolUlang.addEventListener("click", buatEfekRipple);
