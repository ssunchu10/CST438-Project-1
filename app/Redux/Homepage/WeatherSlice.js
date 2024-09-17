import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWeather, getHourlyForecast } from '../../API/api';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (location, thunkAPI) => {
    try {
      const response = await getWeather(location);
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
    forecast: [],  // To store hourly forecast
    status: 'idle',
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
      .addCase(fetchWeather.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchHourlyForecast.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHourlyForecast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forecast = action.payload;
      })
      .addCase(fetchHourlyForecast.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default weatherSlice.reducer;
