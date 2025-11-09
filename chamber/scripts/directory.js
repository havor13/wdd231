// Get references to DOM elements
const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("grid");
const listBtn = document.getElementById("list");

// Fetch and display members from JSON
async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json(); // JSON is now a plain array
    displayMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}
getMembers();

// Render member cards dynamically
function displayMembers(members) {
  membersContainer.innerHTML = ""; // Clear previous content

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    card.innerHTML = `
      <h3>${member.name}</h3>
      <p><strong>Business:</strong> ${member.business}</p>
      <p><strong>Industry:</strong> ${member.industry}</p>
      <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
    `;

    membersContainer.appendChild(card);
  });
}

// Toggle between grid and list views
gridBtn.addEventListener("click", () => {
  membersContainer.classList.add("grid-view");
  membersContainer.classList.remove("list-view");
  gridBtn.setAttribute("aria-pressed", "true");
  listBtn.setAttribute("aria-pressed", "false");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.add("list-view");
  membersContainer.classList.remove("grid-view");
  listBtn.setAttribute("aria-pressed", "true");
  gridBtn.setAttribute("aria-pressed", "false");
});
