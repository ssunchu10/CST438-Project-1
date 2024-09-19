import axios from 'axios';

const apikey = "630b47da595bd59784417268bdd1d863"; 

export const getWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=imperial`);
      return response.data;
    } catch (error) {
      console.log("There is an error! ", error.message);
      return null;
    }
  };

  export const getHourlyForecast = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=imperial`);
      return response.data.list;
    } catch (error) {
      console.log("There is an error! ", error.message);
      return [];
    }
  };

export const getLocationNameFromCoords = async (lat, lon) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`);
        return response.data[0];
    } catch (error) {
        console.log("There is an error! ", error.message);
        return null;
    }
};
