import axios from 'axios';

const apikey = "630b47da595bd59784417268bdd1d863"; 

export const getWeather = async (location) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}&units=imperial`);
        return response.data;
    } catch (error) {
        console.log("There is an error! ", error.message);
        return null;
    }
};

export const getHourlyForecast = async (location) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apikey}&units=imperial`);
        return response.data.list;
    } catch (error) {
        console.log("There is an error! ", error.message);
        return [];
    }
};
