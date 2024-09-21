import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWeather, getHourlyForecast } from '../../API/api';

// Thunks for fetching data
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (location, thunkAPI) => {
    try {
      const response = await getWeather(location);
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchHourlyForecast = createAsyncThunk(
  'weather/fetchHourlyForecast',
  async (location, thunkAPI) => {
    try {
      const forecast = await getHourlyForecast(location);
      return forecast;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    current: null,
    forecast: [], 
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.current = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchHourlyForecast.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forecast = action.payload;
      })
      .addCase(fetchHourlyForecast.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;
