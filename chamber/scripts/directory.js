// scripts/directory.js

const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("grid");
const listBtn = document.getElementById("list");

// ✅ Fetch members.json from /data/
fetch("data/members.json")
  .then(response => response.json())
  .then(members => {
    displayMembers(members);
  })
  .catch(error => console.error("Error loading members:", error));

// ✅ Render members with industry included
function displayMembers(members) {
  membersContainer.innerHTML = "";
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

// ✅ Toggle views with ARIA states
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

async function getMembers() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  displayMembers(data.members); // Replace with your actual display logic
}
getMembers();
