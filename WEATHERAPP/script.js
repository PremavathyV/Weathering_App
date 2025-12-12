async function getWeatherByInput() {
  const city = document.getElementById("locationInput").value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  try {
    const response = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await response.json();
    displayWeather(data, city);
  } catch (error) {
    document.getElementById("weatherData").innerHTML = `
      <p style="color: red;">⚠️ Error fetching weather data.</p>`;
  }
}

function displayWeather(data, city) {
  const current = data.current_condition[0];
  const emoji = getWeatherEmoji(current.weatherDesc[0].value);

  document.getElementById("weatherData").innerHTML = `
    <h2>${emoji} ${city}</h2>
    <p><strong>Condition:</strong> ${current.weatherDesc[0].value}</p>
    <p><strong>🌡️ Temp:</strong> ${current.temp_C}°C</p>
    <p><strong>💧 Humidity:</strong> ${current.humidity}%</p>
    <p><strong>🌬️ Wind:</strong> ${current.windspeedKmph} km/h</p>
  `;
}

function getWeatherEmoji(desc) {
  const lower = desc.toLowerCase();
  if (lower.includes("sun")) return "☀️";
  if (lower.includes("cloud")) return "☁️";
  if (lower.includes("rain")) return "🌧️";
  if (lower.includes("snow")) return "❄️";
  if (lower.includes("thunder")) return "⛈️";
  if (lower.includes("fog") || lower.includes("mist")) return "🌫️";
  return "🌈";
}
