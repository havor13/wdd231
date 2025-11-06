// scripts/join.js

const joinForm = document.getElementById("join-form");

joinForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent page reload

  const name = document.getElementById("name").value.trim();
  const business = document.getElementById("business").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !business || !email) {
    alert("Please fill out all required fields.");
    return;
  }

  // ✅ Simulate submission
  alert(`Thank you, ${name}! Your business "${business}" has been registered with the Chamber.`);

  // Reset form
  joinForm.reset();
});
