import axios from 'axios';

const apikey = 0; // need to input actual api key before using

export const getWeather = async (location) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}&units=imperial`);
        // console.log(response.data); // redundant with console.log in SearchSlice
        return response.data;
    } catch (error) {
        console.log("There is an error! ", error.message);
        return null;
    }
}