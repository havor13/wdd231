
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';

function dayNameFrom(dt) {
  return new Date(dt * 1000).toLocaleDateString(undefined, { weekday: 'short' });
}

export async function renderWeather({ city, countryCode, units = 'metric' }) {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${API_KEY}&units=${units}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${API_KEY}&units=${units}`;

  try {
    const [currentRes, forecastRes] = await Promise.all([fetch(currentUrl), fetch(forecastUrl)]);
    const current = await currentRes.json();
    const forecast = await forecastRes.json();

    const currentEl = document.getElementById('weather-current');
    const forecastEl = document.getElementById('weather-forecast');

    const temp = Math.round(current.main.temp);
    const desc = current.weather?.[0]?.description ?? '—';
    const icon = current.weather?.[0]?.icon;

    currentEl.innerHTML = `
      <p><strong>Now:</strong> ${temp} °C — ${desc}</p>
      ${icon ? `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc} icon">` : ''}
    `;

    const noonEntries = forecast.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
    forecastEl.innerHTML = noonEntries.map(item => {
      const dName = dayNameFrom(item.dt);
      const t = Math.round(item.main.temp);
      const d = item.weather?.[0]?.description ?? '—';
      const ic = item.weather?.[0]?.icon;
      return `
        <div class="forecast-card">
          <p><strong>${dName}</strong></p>
          <p>${t} °C — ${d}</p>
          ${ic ? `<img src="https://openweathermap.org/img/wn/${ic}.png" alt="${d} icon">` : ''}
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error('Weather error:', err);
  }
}
