import { fetchWeatherData } from './api/weather_api.js';

const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');

searchBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  if (!city) return alert('Please enter a city name.');

  try {
    const data = await fetchWeatherData(city);
    updateWeatherUI(data);
  } catch (error) {
    alert('Failed to fetch weather data. Please try again.');
    console.error(error);
  }
});

function updateWeatherUI(data) {
  document.getElementById('city-name').textContent = data.name;
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('temperature').textContent = (data.main.temp - 273.15).toFixed(1);
  document.getElementById('humidity').textContent = data.main.humidity;
  document.getElementById('wind-speed').textContent = data.wind.speed;
  document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  document.getElementById('weather-result').classList.remove('hidden');
}
