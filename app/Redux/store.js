import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./Homepage/WeatherSlice";

export const store = configureStore({
    reducer: {
        weatherState: weatherSlice,
    },
});
export default store;