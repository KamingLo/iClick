function OhayooUser() {
  const SapaanUser = document.getElementById("Sapaan");
  const jamIRL = new Date().getHours();

  let Sapaan = " ";

  if (jamIRL >= 3 && jamIRL < 6) {
    Sapaan = "Waktu Tenang";
  } else if (jamIRL >= 6 && jamIRL < 11) {
    Sapaan = "Selamat Pagi";
  } else if (jamIRL >= 11 && jamIRL < 15) {
    Sapaan = "Selamat Siang";
  } else if (jamIRL >= 15 && jamIRL < 18) {
    Sapaan = "Selamat Sore";
  } else {
    Sapaan = "Selamat Malam";
  }

  if (SapaanUser) {
    SapaanUser.textContent = Sapaan;
  }
}

OhayooUser();
