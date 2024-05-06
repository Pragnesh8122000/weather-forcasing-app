class WeatherService {
  constructor() {
    this.weatherApiKey = process.env.WEATHER_API_KEY;
    this.weatherApiUrl = process.env.WEATHER_API_URL;
    this.messages = require('../messages/weather.messages').allMessages;
    this.axios = require('axios');
  }
  getWeather = async (city) => {
    try {
      // fetch weather data from weather api using axios
      const weather = await this.axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${this.weatherApiKey}&q=${city}`
      );

      // response object
      const resObj = {
        wind_speed: `${weather.data.current.wind_kph} km/h`,
        wind_direction: weather.data.current.wind_dir,
        temperature: `${weather.data.current.temp_c}°C`,
        humidity: `${weather.data.current.humidity}%`,
        cloud: `${weather.data.current.cloud}%`,
        name: weather.data.location.name,
        region: weather.data.location.region,
        country: weather.data.location.country,
      };

      // return response object
      return {
        status: true,
        statusCode: 200,
        data: {
          message: this.messages.WEATHER_FETCHED_SUCCESS,
          weatherData: resObj,
        },
      };
    } catch (error) {
      // return error response
      return {
        status: false,
        statusCode: error.response.status,
        data: {
          message: error.response.statusText,
        },
      };
    }
  };
}
module.exports = new WeatherService();
