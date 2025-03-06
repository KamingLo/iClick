body {
  font-family: "Montserrat", sans-serif;
  background-color: #78a1bb;
  background-image: url("image/topografi.png");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  user-select: none;
  flex-direction: column;
  padding-top: 0;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(40, 48, 68, 0.9);
  padding: 0.9375rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  z-index: 1000;
  box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.2);
}

nav .logo h1 {
  color: white;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

nav .logo span {
  color: #b13918;
}

nav ul {
  display: flex;
  gap: 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all ease 0.3s;
}

nav a:hover {
  background-color: #55648a;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
}

.clicking-counter {
  margin: 3.125rem 0;
  color: #292929;
  font-size: 2rem;
  text-align: center;
}

.RoundedBox {
  height: 37.5rem;
  width: 28.125rem;
  border-radius: 0.5rem;
  padding: 0.625rem;
  margin: 0.625rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.3);
  background-color: rgba(235, 245, 238, 0.9);
  position: relative;
  text-align: center;
  overflow: hidden;
}

.mode-selector {
  margin: 3.125rem 0;
  display: flex;
  justify-content: center;
}

#modeButton {
  padding: 0.625rem 1.25rem;
  background: #20366d;
  border: none;
  border-radius: 0.3125rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  color: white;
}

#modeButton:hover {
  background: #7d8eb9;
}

.BoxWaktu,
.BoxKecepatan,
.BoxNilai {
  height: 2.5rem;
  width: 23.75rem;
  padding: 0.625rem;
  border-radius: 0.625rem;
  margin: 0.625rem auto;
  align-items: center;
  justify-content: center;
  text-align: left;
  display: flex;
  color: white;
  justify-content: space-between;
}

.BoxWaktu {
  background-color: #6d82b7;
}

.BoxKecepatan {
  background-color: #6d82b7;
}

.BoxNilai {
  background-color: #6d82b7;
}

.ButtonPlay,
.ButtonRestart {
  height: 7.5rem;
  width: 25rem;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  display: flex;
  color: white;
  margin: 2rem auto;
  overflow: hidden;
  position: relative;
}

.ButtonPlay {
  background-color: #213054;
  transition: all 0.3s ease;
}

.ButtonPlay:hover {
  background-color: #7084b6;
}

.ButtonRestart {
  height: 3.75rem;
  width: 10.625rem;
  border-radius: 3.75rem;
  background-color: #e81616;
  justify-content: center;
  align-items: center;
  margin: 0.625rem auto;
  gap: 0.625rem;
  transition: all 0.3s ease;
}

.ButtonRestart:hover {
  background-color: #ff4d4d;
}

.ButtonPlay,
.ButtonRestart {
  overflow: hidden;
}

.ripple {
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transform: scale(0);
  animation: rippleEffect 0.6s linear;
  pointer-events: none;
}

@keyframes rippleEffect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.bonus-text {
  color: #ffffff;
  width: auto;
  max-width: 90%;
  position: fixed;
  top: 46rem auto;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  animation: pulse 1s infinite;
}

.hidden {
  display: none;
}

@keyframes pulse {
  0% {
    transform: translateX(-50%) scale(1);
  }
  50% {
    transform: translateX(-50%) scale(1.1);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
}

/* Media Queries for Responsiveness */

/* Small devices (phones, 600px and down) */
@media only screen and (max-width: 37.5rem) {
  .RoundedBox {
    width: 90%;
    height: auto;
    padding: 1.25rem;
  }

  .BoxWaktu,
  .BoxKecepatan,
  .BoxNilai {
    width: 90%;
  }

  .ButtonPlay,
  .ButtonRestart {
    width: 90%;
  }

  .clicking-counter {
    font-size: 1.5rem;
  }
}

/* Medium devices (tablets, 768px and down) */
@media only screen and (max-width: 48rem) {
  .RoundedBox {
    width: 80%;
    height: auto;
    padding: 1.25rem;
  }

  .BoxWaktu,
  .BoxKecepatan,
  .BoxNilai {
    width: 80%;
  }

  .ButtonPlay,
  .ButtonRestart {
    width: 80%;
  }

  .clicking-counter {
    font-size: 1.75rem;
  }
}

@media only screen and (min-width: 62rem) {
  .RoundedBox {
    width: 28.125rem;
    height: 37.5rem;
  }

  .BoxWaktu,
  .BoxKecepatan,
  .BoxNilai {
    width: 23.75rem;
  }

  .ButtonPlay,
  .ButtonRestart {
    width: 25rem;
  }

  .clicking-counter {
    font-size: 2rem;
  }
}
