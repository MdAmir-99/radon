let axios = require("axios");

const getWeatherLondon = async (req, res) => {
  try {
    let city = req.query.q;
    let appId = req.query.appid;
    let options = {
      method: "get",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`,
    };
    let result = await axios(options);
    res.status(200).send({ data: result.data });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

const getTempLondon = async (req, res) => {
  try {
    let city = req.query.q;
    let appId = req.query.appid;
    let options = {
      method: "get",
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`,
    };
    let result = await axios(options);
    res
      .status(200)
      .send({
        city: result.data.name,
        temp: `${result.data.main.temp - 273.15}°C`,
      });
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
};

const cityWithWeather = async (req, res) => {
  try {
    let cityName = [
      "Bengaluru",
      "Mumbai",
      "Delhi",
      "Kolkata",
      "Chennai",
      "London",
      "Moscow",
    ];
    let finalArr = [];
    for (let i = 0; i <= cityName.length - 1; i++) {
      let obj = {};
      obj.city = cityName[i];
      let options = {
        method: "get",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName[i]}&appid=8911f80b8f450956fae922b41698614b`
      };
      let result = await axios(options);
      obj.temprature = result.data.main.temp;
      finalArr.push(obj);
    }

    let sort = finalArr.sort((a, b) => {
      return a.temprature - b.temprature;
    });
    res.status(200).send({ status: 200, data: sort });
  } catch (err) {
    res.status(500).send({ status: 500, msg: err.message });
  }
};

module.exports.getWeatherLondon = getWeatherLondon;
module.exports.getTempLondon = getTempLondon;
module.exports.cityWithWeather = cityWithWeather;
