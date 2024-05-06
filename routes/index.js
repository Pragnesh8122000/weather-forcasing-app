class WeatherRouter {
  constructor() {
    this.router = require('express').Router();
    this.weatherController = require('../controllers/weather.controller');
    this.setRoutes();
  }

  setRoutes() {
    // get weather details (GET)
    this.router.get('/', this.weatherController.getWeatherPage);
    this.router.get('/weather', this.weatherController.getWeather);
  }
}

const router = new WeatherRouter();
module.exports = router.router;
