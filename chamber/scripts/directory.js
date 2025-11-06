async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Error loading members:', error);
    document.getElementById('members').innerHTML = '<p>Unable to load members.</p>';
  }
}

function displayMembers(members) {
  const container = document.getElementById('members');
  container.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('article');
    card.className = 'member-card';

    card.innerHTML = `
      <img src="images/business-logos/${member.image}" alt="${member.name} logo" class="member-logo">
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Membership:</strong> ${formatMembership(member.membership)}</p>
      <a href="${member.website}" class="btn-link" target="_blank" rel="noopener">Visit website</a>
    `;

    container.appendChild(card);
  });
}

function formatMembership(level) {
  switch (Number(level)) {
    case 1: return 'Member';
    case 2: return 'Silver';
    case 3: return 'Gold';
    default: return 'Member';
  }
}

// Toggle buttons
document.getElementById('grid').addEventListener('click', () => {
  const members = document.getElementById('members');
  members.classList.add('grid-view');
  members.classList.remove('list-view');
  setPressed('grid', true);
  setPressed('list', false);
});

document.getElementById('list').addEventListener('click', () => {
  const members = document.getElementById('members');
  members.classList.add('list-view');
  members.classList.remove('grid-view');
  setPressed('grid', false);
  setPressed('list', true);
});

function setPressed(id, state) {
  const btn = document.getElementById(id);
  btn.setAttribute('aria-pressed', String(state));
}

loadMembers();
