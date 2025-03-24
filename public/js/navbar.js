document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("fade-in"); // Efek fade-in saat halaman dimuat

  // Tambahkan efek fade-out sebelum pindah halaman
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Mencegah perpindahan langsung
      let href = this.getAttribute("href");

      document.body.classList.remove("fade-in"); // Hilangkan efek fade-in
      document.body.style.opacity = "0"; // Buat halaman menghilang dulu

      setTimeout(() => {
        window.location.href = href; // Pindah ke halaman baru setelah transisi selesai
      }, 500); // Sesuai dengan durasi CSS transition
    });
  });
});
