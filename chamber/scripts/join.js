document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('joinForm');
  const message = document.getElementById('formMessage');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent default submission

    // Collect values
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const level = form.level.value;

    // Basic validation
    if (!name || !email || !phone || !level) {
      message.textContent = "⚠️ Please fill in all required fields.";
      message.style.color = "red";
      return;
    }

    // Email format check
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
      message.textContent = "⚠️ Please enter a valid email address.";
      message.style.color = "red";
      return;
    }

    // Phone format check (basic digits)
    const phonePattern = /^[0-9+\-\s]{7,15}$/;
    if (!phonePattern.test(phone)) {
      message.textContent = "⚠️ Please enter a valid phone number.";
      message.style.color = "red";
      return;
    }

    // Success
    message.textContent = "✅ Thank you, your application has been submitted!";
    message.style.color = "green";

    // Optionally clear form
    form.reset();
  });
});
