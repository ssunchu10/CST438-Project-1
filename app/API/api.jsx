import axios from 'axios';

export const getWeather = async (location) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6f3c6a6530492f938c4df31b8ee1a63d&units=imperial`);
        // console.log(response.data); // redundant with console.log in SearchSlice
        return response.data;
    } catch (error) {
        console.log("There is an error! ", error.message);
        return null;
    }
}

// API key: 6f3c6a6530492f938c4df31b8ee1a63d