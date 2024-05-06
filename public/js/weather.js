document
  .getElementById('weatherForm')
  .addEventListener('submit', async function (event) {
    // Prevent the form from submitting
    event.preventDefault();

    // Get the city input value
    const city = document.getElementById('cityInput').value;

    // get weather data url
    const apiUrl = `/weather?city=${city}`;

    try {
      // Fetch weather data
      const response = await fetch(apiUrl);

      // Check if the response is ok
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // Parse the response body
      const weatherData = await response.json();

      // Display weather data on the page
      displayWeather(weatherData.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Display error message on the page
      document.getElementById(
        'weatherInfo'
      ).textContent = `Error fetching weather data: ${error}`;
    }
  });

// Display weather data on the page
function displayWeather(weatherData) {
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = `
    <h2>Weather Information for ${weatherData.name}</h2>
    <p>Temperature: ${weatherData.temperature}</p>
    <p>Wind Speed: ${weatherData.wind_speed}</p>
    <p>Wind Direction: ${weatherData.wind_direction}</p>
    <p>Humidity: ${weatherData.humidity}</p>
    <p>Cloud: ${weatherData.cloud}</p>
    <p>Region: ${weatherData.region}</p>
    <p>Country: ${weatherData.country}</p>
        
    `;
}
