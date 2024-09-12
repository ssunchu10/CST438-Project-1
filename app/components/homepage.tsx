import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, LayoutAnimation, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';


const API_KEY = '51afe4cb9a20953b7ff0267741e3d7b6';  
const CITY = 'Marina';  
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Marina&appid=51afe4cb9a20953b7ff0267741e3d7b6&_=${new Date().getTime()}`;
const HOURLY_FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=Marina&appid=51afe4cb9a20953b7ff0267741e3d7b6`;

const kelvinToCelsius = (temp: number): number => {
  return temp - 273.15;
};

const kelvinToFahrenheit = (temp: number): number => {
  return (temp - 273.15) * 9 / 5 + 32;
};

const HomePage: React.FC = () => {
  const [temperatureK, setTemperatureK] = useState<number>(0);  
  const [isC, setIsC] = useState<boolean>(true);  
  const [condition, setCondition] = useState<string>('');  
  const [feelsLikeK, setFeelsLikeK] = useState<number>(0);
  const [isDay, setIsDay] = useState<boolean>(true);  
  const [hourlyData, setHourlyData] = useState<any[]>([]);
  const [hourlyForecast, setHourlyForecast] = useState<any[]>([]);


  useEffect(() => {
    fetchWeather();
    determineTimeOfDay(); 
    fetchHourlyForecast();
    const interval = setInterval(fetchWeather, 60000);  
    return () => clearInterval(interval); 
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(WEATHER_API_URL);
          console.log(response.data);  
      const { main, weather } = response.data;
      setTemperatureK(main.temp);  
      setFeelsLikeK(main.feels_like);
      setCondition(weather[0].description);  
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchHourlyForecast = async () => {
    try {
      const response = await axios.get(HOURLY_FORECAST_URL);
      const { list } = response.data;
    
      setHourlyData(list.slice(0, 24));
    } catch (error) {
      console.error('Error fetching hourly forecast data:', error);
    }
  };
  
  
  const currentDayForecast = hourlyData.filter((item: any) => {
    const date = new Date(item.dt * 1000); 
    const today = new Date();
    return date.getDate() === today.getDate(); 
  });
  
  const convertTemperature = (temp: number): number => {
    return isC ? kelvinToCelsius(temp) : kelvinToFahrenheit(temp);
  };
  

  const determineTimeOfDay = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) {
      setIsDay(true);  
    } else {
      setIsDay(false); 
    }
  };

  const backgroundImage = isDay
  ? require('../assets/day.webp')  
  : require('../assets/moonn.webp');

  const cColor = 'white';  
  const fColor = 'white';  

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>

      <Text style={styles.city}>
          MARINA
        </Text>

        <Text style={styles.title}>
          {convertTemperature(temperatureK).toFixed(1)}°{isC ? 'C' : 'F'}
        </Text>

        <Text style={styles.feelsLikeText}>
          Feels Like {convertTemperature(feelsLikeK).toFixed(1)}°{isC ? 'C' : 'F'}
        </Text>


        <Text style={styles.conditionText}>{condition}</Text>

        <TouchableOpacity
          style={{
            height: 15, 
            width: 35,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: isC ? cColor : fColor,
            overflow: 'hidden',
            position:'absolute',
            top:115,
            left:265,
          
            
          }}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            setIsC(!isC);  
          }}>

          <View
            style={{
              height: '100%',
              width: '50%',
              backgroundColor: isC ? cColor : fColor,
              alignSelf: isC ? 'flex-end' : 'flex-start',
              alignItems: 'center',
              
            }}>

            <Text style={{ color: 'black', fontSize: 10, fontWeight: '500' }}>
              {isC ? 'C' : 'F'}
            </Text>

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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  city:{
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginTop:40,
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
  toggleInner: {
    height: '100%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },scrollView: {
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
});
export default HomePage;
