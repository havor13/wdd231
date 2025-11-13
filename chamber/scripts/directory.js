// Get references
const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

// Fetch and display members
async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}
getMembers();

// Render member cards
function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    // ✅ Add membership level as a class for styling
    if (member.membershipLevel) {
      card.classList.add(member.membershipLevel.toLowerCase());
    }

    card.innerHTML = `
      <h3>${member.name}</h3>
      <p><strong>Business:</strong> ${member.business}</p>
      <p><strong>Industry:</strong> ${member.industry}</p>
      <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
      <p class="level"><strong>Membership Level:</strong> ${member.membershipLevel}</p>
    `;

    membersContainer.appendChild(card);
  });
}

// ✅ Toggle views
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

// Footer year + last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
