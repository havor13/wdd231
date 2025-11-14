export async function renderSpotlights() {
  try {
    const res = await fetch('data/members.json');
    const members = await res.json();

    // Filter Gold/Silver
    const eligible = members.filter(m =>
      ['gold', 'silver'].includes(m.membershipLevel?.toLowerCase())
    );

    // Shuffle
    for (let i = eligible.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
    }

    // Pick 2–3
    const count = Math.floor(Math.random() * 2) + 2;
    const picks = eligible.slice(0, count);

    const grid = document.getElementById('spotlight-grid');
    grid.innerHTML = picks.map(m => `
      <article class="card spotlight-card">
        ${m.logo ? `<img src="${m.logo}" alt="${m.business} logo" style="max-width:100px;">` : ''}
        <h3>${m.business}</h3>
        <address>
          <p><strong>Contact:</strong> ${m.name || 'N/A'}</p>
          <p><strong>Email:</strong> ${m.email ? `<a href="mailto:${m.email}">${m.email}</a>` : 'N/A'}</p>
        </address>
        <p><strong>Industry:</strong> ${m.industry || 'N/A'}</p>
        <p><strong>Level:</strong> ${m.membershipLevel}</p>
      </article>
    `).join('');
  } catch (err) {
    console.error('Spotlight error:', err);
    const grid = document.getElementById('spotlight-grid');
    if (grid) grid.textContent = 'Unable to load spotlights';
  }
}
