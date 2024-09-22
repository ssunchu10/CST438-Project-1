import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Homepage from '../app/homepage';
import { fetchWeather, fetchHourlyForecast } from '../app/Redux/Homepage/WeatherSlice';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('Homepage Component', () => {
  let store;
  const initialState = {
    weatherState: {
      current: {
        main: { temp: 70, feels_like: 72 },
        weather: [{ description: 'clear sky' }],
      },
      forecast: [
        { dt: 1625097600, main: { temp: 75 } },
        { dt: 1625108400, main: { temp: 78 } },
      ],
      status: 'idle',
      error: null,
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it('renders correctly with weather data', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Homepage />
      </Provider>
    );

    expect(getByText('Seaside')).toBeTruthy();
    expect(getByText('21.1°C')).toBeTruthy();
    expect(getByText('clear sky')).toBeTruthy();
    expect(getByText('Feels like 22.2°C')).toBeTruthy();
    expect(getByPlaceholderText('Enter Location')).toBeTruthy();
  });

  it('handles temperature unit toggle', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Homepage />
      </Provider>
    );

    const tempToggle = getByText('°C');
    fireEvent.press(tempToggle);

    expect(getByText('70.0°F')).toBeTruthy();
    expect(getByText('Feels like 72.0°F')).toBeTruthy();
  });

  it('handles location search', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Homepage />
      </Provider>
    );

    const input = getByPlaceholderText('Enter Location');
    fireEvent.changeText(input, 'New York');
    fireEvent(input, 'submitEditing');

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(fetchWeather('New York'));
      expect(store.dispatch).toHaveBeenCalledWith(fetchHourlyForecast('New York'));
    });
  });

  it('displays loading state', () => {
    const loadingState = {
      ...initialState,
      weatherState: { ...initialState.weatherState, status: 'loading' },
    };
    const loadingStore = mockStore(loadingState);

    const { getByText } = render(
      <Provider store={loadingStore}>
        <Homepage />
      </Provider>
    );

    expect(getByText('Loading weather data...')).toBeTruthy();
  });

  it('displays error state', () => {
    const errorState = {
      ...initialState,
      weatherState: { ...initialState.weatherState, error: 'Failed to fetch weather data' },
    };
    const errorStore = mockStore(errorState);

    const { getByText } = render(
      <Provider store={errorStore}>
        <Homepage />
      </Provider>
    );

    expect(getByText('Failed to fetch weather data')).toBeTruthy();
  });

  it('renders hourly forecast', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <Homepage />
      </Provider>
    );

    expect(getAllByText(/\d+:00/).length).toBe(2);
    expect(getAllByText(/\d+\.\d°C/).length).toBe(3); // 2 hourly + 1 current
  });

  it('updates weather data periodically', () => {
    jest.useFakeTimers();

    render(
      <Provider store={store}>
        <Homepage />
      </Provider>
    );

    jest.advanceTimersByTime(60000);

    expect(store.dispatch).toHaveBeenCalledWith(fetchWeather('Seaside'));

    jest.useRealTimers();
  });
});