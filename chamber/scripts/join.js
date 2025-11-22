// scripts/join.js

document.addEventListener("DOMContentLoaded", () => {
  const joinForm = document.getElementById("joinForm"); // match your form id
  const timestampField = document.getElementById("timestamp");

  // Populate hidden timestamp when page loads
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  joinForm.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent default reload

    // Collect values
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const title = document.getElementById("title").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const organization = document.getElementById("organization").value.trim();
    const membership = joinForm.querySelector("input[name='membership']:checked");
    const description = document.getElementById("description").value.trim();
    const timestamp = timestampField.value;

    // Validate required fields
    if (!firstName || !lastName || !title || !email || !phone || !organization || !membership) {
      alert("Please fill out all required fields.");
      return;
    }

    // Build query string for thankyou.html
    const params = new URLSearchParams({
      firstName,
      lastName,
      title,
      email,
      phone,
      organization,
      membership: membership.value,
      description,
      timestamp
    });

    // Redirect to thankyou.html with submitted values
    window.location.href = `thankyou.html?${params.toString()}`;
  });
});
