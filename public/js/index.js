document.addEventListener("DOMContentLoaded", function () {
  const texts = document.querySelectorAll(".TextAnim");
  let index = 0;

  function changeText() {
    texts.forEach((text) => text.classList.remove("active"));
    texts[index].classList.add("active");
    index = (index + 1) % texts.length;
  }

  changeText();

  setInterval(changeText, 5000);
});
