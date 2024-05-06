class Weather {
  constructor() {
    this.weatherService = require('../services/weather.service');
    this.validation = require('../validations/weather.validation');
  }

  getWeatherPage = (req, res) => {
    res.render("pages/weather", {
      layout: "layout/layout",
  });
  }

  // get weather data of a city (GET /weather?city)
  getWeather = async (req, res) => {
    // validate query object
    let weatherValidation = this.validation.weatherValidation.validate(
      req.query
    );
    if (weatherValidation.error) {
      return res.status(403).send({
        status: false,
        message: weatherValidation.error.details[0].message,
        type: 'ValidationError',
      });
    } else {
      const { city } = req.query;

      // get weather data
      const weather = await this.weatherService.getWeather(city);

      // response
      res.status(weather.statusCode).json({
        status: weather.status,
        message: weather.data.message,
        data: weather.data.weatherData,
      });
    }
  };
}

module.exports = new Weather();
