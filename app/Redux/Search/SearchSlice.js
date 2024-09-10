import { createSlice } from "@reduxjs/toolkit";
import { getWeather } from "../../API/api";

export const getData = () => async(dispatch, getState) => {
    const appState = getState();
    const {searchState} = appState;
    const {location, errorMessage} = searchState;
    const apiResponse = await getWeather(location);
    console.log(apiResponse);
    if(apiResponse){
        if(errorMessage != null) {
            dispatch(setErrorMessage(""));
        }
        dispatch(getSearchResults(apiResponse));
        const iconCode = apiResponse.weather[0].icon;
        dispatch(setIconUrl(`https://openweathermap.org/img/wn/${iconCode}@2x.png`))
    }else {
        dispatch(setErrorMessage("Location Not Found!"));
        dispatch(getSearchResults([]));
    }
    dispatch(updateSearchLocation(""));    
}

const SearchSlice = createSlice({
    name: "searchSlice",
    initialState: {
        location: "",
        searchResults: [],
        errorMessage: "",
        iconUrl: "",
    },
    reducers: {
        updateSearchLocation: (state, action) => {
            return {
                ...state,
                location: action.payload,
            };
        },
        getSearchResults: (state, action) => {
            return {
                ...state,
                searchResults: action.payload,
            }
        },
        setErrorMessage: (state, action) => {
            return {
                ...state,
                errorMessage: action.payload,
            }
        },
        setIconUrl: (state, action) => {
            return {
                ...state,
                iconUrl: action.payload,
            }
        }
    }
});

export const {updateSearchLocation, getSearchResults, setErrorMessage, setIconUrl} = SearchSlice.actions;
export default SearchSlice.reducer;