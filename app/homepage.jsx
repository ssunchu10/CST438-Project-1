import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, LayoutAnimation, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location'; 
import { fetchWeather, fetchHourlyForecast } from './Redux/Homepage/WeatherSlice'; 

const kelvinToCelsius = (temp) => temp - 273.15;
const kelvinToFahrenheit = (temp) => (temp - 273.15) * 9 / 5 + 32;

const HomePage = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather.current);
  const hourlyData = useSelector((state) => state.weather.forecast);
  const isLoading = useSelector((state) => state.weather.status === 'loading');
  const [isC, setIsC] = useState(true);
  const [isDay, setIsDay] = useState(true);
  const [locationName, setLocationName] = useState(''); 
  const [error, setError] = useState('');

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      const locationName = reverseGeocode[0]?.city || 'Unknown City'; // Default to 'Unknown City' if no city found
      setLocationName(locationName);

      dispatch(fetchWeather(locationName));
      dispatch(fetchHourlyForecast(locationName));
    };

    getLocation();

    determineTimeOfDay();
    const interval = setInterval(() => {
      if (locationName) {
        dispatch(fetchWeather(locationName));
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, locationName]);

  const determineTimeOfDay = () => {
    const currentHour = new Date().getHours();
    setIsDay(currentHour >= 6 && currentHour < 18);
  };

  const convertTemperature = (temp) => (isC ? kelvinToCelsius(temp) : kelvinToFahrenheit(temp));

  const backgroundImage = isDay
    ? require('../assets/images/day.webp')
    : require('../assets/images/moonn.webp');

  if (isLoading || !weatherData || !hourlyData.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading weather data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.city}>{locationName || 'Loading...'}</Text>

        <Text style={styles.title}>
          {convertTemperature(weatherData.main.temp).toFixed(1)}°{isC ? 'C' : 'F'}
        </Text>

        <Text style={styles.feelsLikeText}>
          Feels Like {convertTemperature(weatherData.main.feels_like).toFixed(1)}°{isC ? 'C' : 'F'}
        </Text>

        <Text style={styles.conditionText}>{weatherData.weather[0].description}</Text>

        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            setIsC(!isC);
          }}
        >
          <View style={styles.toggleInner}>
            <Text style={styles.toggleText}>{isC ? 'C' : 'F'}</Text>
          </View>
        </TouchableOpacity>

        <ScrollView horizontal style={styles.scrollView}>
          {hourlyData.map((item, index) => {
            const hour = new Date(item.dt * 1000).getHours();
            const temp = convertTemperature(item.main.temp);
            return (
              <View key={index} style={styles.hourlyContainer}>
                <Text style={styles.hourText}>{hour}:00</Text>
                <Text style={styles.tempText}>{temp.toFixed(1)}°{isC ? 'C' : 'F'}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  city: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  conditionText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  feelsLikeText: {
    fontSize: 15,
    color: '#fff',
  },
  toggleButton: {
    height: 15,
    width: 35,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
    position: 'absolute',
    top: 115,
    left: 265,
  },
  toggleInner: {
    height: '100%',
    width: '50%',
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  toggleText: {
    color: 'black',
    fontSize: 10,
    fontWeight: '500',
  },
  scrollView: {
    width: '100%',
    paddingVertical: 10,
  },
  hourlyContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  hourText: {
    color: '#fff',
    fontSize: 16,
  },
  tempText: {
    color: '#fff',
    fontSize: 16,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f00',
  },
});

export default HomePage;
