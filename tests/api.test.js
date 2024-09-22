import axios from 'axios';
import { getWeather, getHourlyForecast, getLocationNameFromCoords } from '../app/API/api';

jest.mock('axios');

describe('Weather Service', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getWeather', () => {
    it('should return weather data when API call is successful', async () => {
      const mockWeatherData = { weather: [{ description: 'clear sky' }], main: { temp: 72 } };
      axios.get.mockResolvedValueOnce({ data: mockWeatherData });

      const result = await getWeather('New York');
      expect(result).toEqual(mockWeatherData);
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('https://api.openweathermap.org/data/2.5/weather?q=New York&appid=630b47da595bd59784417268bdd1d863&units=imperial')
      );
    });

    it('should return null when API call fails', async () => {
      axios.get.mockRejectedValueOnce(new Error('API Error'));

      const result = await getWeather('New York');
      expect(result).toBeNull();
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getHourlyForecast', () => {
    it('should return forecast data when API call is successful', async () => {
      const mockForecastData = { list: [{ dt: 1633039200, main: { temp: 75 } }] };
      axios.get.mockResolvedValueOnce({ data: mockForecastData });

      const result = await getHourlyForecast('New York');
      expect(result).toEqual(mockForecastData.list);
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('https://api.openweathermap.org/data/2.5/forecast?q=New York&appid=630b47da595bd59784417268bdd1d863&units=imperial')
      );
    });

    it('should return an empty array when API call fails', async () => {
      axios.get.mockRejectedValueOnce(new Error('API Error'));

      const result = await getHourlyForecast('New York');
      expect(result).toEqual([]);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getLocationNameFromCoords', () => {
    it('should return location name data when API call is successful', async () => {
      const mockLocationData = { name: undefined };
      axios.get.mockResolvedValueOnce({ data: mockLocationData });

      const result = await getLocationNameFromCoords(34.05, -118.25);
      expect(result).toEqual(mockLocationData);
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('https://api.openweathermap.org/data/2.5/weather?lat=34.05&lon=-118.25&appid=630b47da595bd59784417268bdd1d863')
      );
    });

    it('should return null when API call fails', async () => {
      axios.get.mockRejectedValueOnce(new Error('API Error'));

      const result = await getLocationNameFromCoords(34.05, -118.25);
      expect(result).toBeNull();
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });
});
