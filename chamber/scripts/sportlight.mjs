
export async function renderSpotlights() {
  try {
    const res = await fetch('scripts/data/members.json');
    const members = await res.json();

    const eligible = members.filter(m => ['gold', 'silver'].includes(m.membershipLevel?.toLowerCase()));
    const shuffled = [...eligible].sort(() => Math.random() - 0.5);
    const picks = shuffled.slice(0, 3);

    const grid = document.getElementById('spotlight-grid');
    grid.innerHTML = picks.map(m => `
      <article class="card">
        <h3>${m.business}</h3>
        <p><strong>Contact:</strong> ${m.name}</p>
        <p><strong>Email:</strong> ${m.email}</p>
        <p><strong>Industry:</strong> ${m.industry}</p>
        <p><strong>Level:</strong> ${m.membershipLevel}</p>
      </article>
    `).join('');
  } catch (err) {
    console.error('Spotlight error:', err);
  }
}
