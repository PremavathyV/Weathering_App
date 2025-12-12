async function getWeatherByInput() {
  const city = document.getElementById("locationInput").value.trim();
  if (!city) return alert("Please enter a city name!");

  try {
    // 1️⃣ Convert city name → latitude, longitude
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return showError("City not found");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2️⃣ Fetch weather using lat & lon
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    displayWeather(weatherData.current_weather, name, country);

  } catch (error) {
    showError("Error fetching weather data.");
  }
}

function displayWeather(data, city, country) {
  const emoji = getEmoji(data.weathercode);

  document.getElementById("weatherData").innerHTML = `
    <h2>${emoji} ${city}, ${country}</h2>
    <p><strong>🌡️ Temperature:</strong> ${data.temperature}°C</p>
    <p><strong>💨 Wind Speed:</strong> ${data.windspeed} km/h</p>
    <p><strong>⏱️ Time:</strong> ${data.time}</p>
  `;
}

function showError(msg) {
  document.getElementById("weatherData").innerHTML =
    `<p style="color:red;">${msg}</p>`;
}

function getEmoji(code) {
  if (code === 0) return "☀️"; // clear
  if (code <= 3) return "🌤️"; // partly cloudy
  if (code <= 55) return "🌧️"; // rain
  if (code <= 67) return "🌦️"; // drizzle
  if (code <= 77) return "🌫️"; // fog
  if (code <= 86) return "❄️"; // snow
  return "🌩️"; // thunder
}
