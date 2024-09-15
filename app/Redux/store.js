import { configureStore } from "@reduxjs/toolkit";
import SearchSlice from "./Search/SearchSlice";

export const store = configureStore({
    reducer: {
        searchState: SearchSlice
    }
});