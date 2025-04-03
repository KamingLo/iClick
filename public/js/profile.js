document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".EditText").forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      const field = e.target.previousElementSibling;
      if (field.tagName === "INPUT") {
        if (field.disabled) {
          field.disabled = false;
          field.focus();
        } else {
          field.disabled = true;
          updateProfile(field.id.replace("Input", ""), field.value);
        }
      }
    });
  });
});

function updateProfile(field, value) {
  fetch("/update-profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [field]: value }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) alert("Profile updated successfully!");
      else alert("Error updating profile.");
    })
    .catch((error) => console.error("Error:", error));
}
