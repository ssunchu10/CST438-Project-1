import { configureStore } from "@reduxjs/toolkit";
import SearchSlice from "./Search/SearchSlice";
import weatherSlice from "./Homepage/WeatherSlice";

export const store = configureStore({
    reducer: {
        searchState: SearchSlice,
        weatherState: weatherSlice,
    },
});
export default store;