export async function renderSpotlights() {
  try {
    const res = await fetch('data/members.json'); // adjust path if needed
    const members = await res.json();

    // Filter for Gold/Silver members
    const eligible = members.filter(m =>
      ['gold', 'silver'].includes(m.membershipLevel?.toLowerCase())
    );

    // Shuffle (Fisher–Yates)
    for (let i = eligible.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
    }

    const picks = eligible.slice(0, 3);

    const grid = document.getElementById('spotlight-grid');
    grid.innerHTML = picks.map(m => `
      <article class="card">
        <h3>${m.business}</h3>
        <p><strong>Contact:</strong> ${m.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${m.email}">${m.email}</a></p>
        <p><strong>Industry:</strong> ${m.industry}</p>
        <p><strong>Level:</strong> ${m.membershipLevel}</p>
      </article>
    `).join('');
  } catch (err) {
    console.error('Spotlight error:', err);
    const grid = document.getElementById('spotlight-grid');
    if (grid) grid.textContent = 'Unable to load spotlights';
  }
}
