import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeather,
  fetchHourlyForecast,
} from "./Redux/Homepage/WeatherSlice";
import { Ionicons } from "@expo/vector-icons";

const Homepage = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weatherState.current);
  const hourlyData = useSelector((state) => state.weatherState.forecast);
  const isLoading = useSelector(
    (state) => state.weatherState.status === "loading"
  );
  const error = useSelector((state) => state.weatherState.error);
  const [isC, setIsC] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationName, setLocationName] = useState("Seaside");

  useEffect(() => {
    dispatch(fetchWeather(locationName));
    dispatch(fetchHourlyForecast(locationName));

    const interval = setInterval(() => {
      if (locationName) {
        dispatch(fetchWeather(locationName));
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, locationName]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setLocationName(searchQuery);
      setSearchQuery("");
    }
  };

  const convertTemperature = (temp) => (isC ? ((temp - 32) * 5) / 9 : temp);

  const getWeatherIcon = (description) => {
    const lowerDescription = description.toLowerCase();
    if (lowerDescription.includes("rain")) return "rainy";
    if (lowerDescription.includes("cloud")) return "cloudy";
    return new Date().getHours() >= 6 && new Date().getHours() < 18
      ? "sunny"
      : "moon";
  };

  if (isLoading)
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading weather data...</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  const noData = !weatherData || !hourlyData.length;

  return (
    <View style={styles.overlay}>
      <TextInput
        style={styles.input}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        value={searchQuery}
        placeholder="Enter Location"
        placeholderTextColor="#ccc"
      />
      <View style={[styles.content]}>
        {noData ? (
          <Text style={styles.loadingText}>No data available</Text>
        ) : (
          <>
            <Text style={styles.city}>{locationName}</Text>
            <View style={styles.weatherInfo}>
              <Ionicons
                name={getWeatherIcon(weatherData.weather[0].description)}
                size={48}
                color="white"
              />
              <Text style={styles.temperature}>
                {convertTemperature(weatherData.main.temp).toFixed(1)}°
                {isC ? "C" : "F"}
              </Text>
              <Text style={styles.description}>
                {weatherData.weather[0].description}
              </Text>
              <Text style={styles.feelsLike}>
                Feels like{" "}
                {convertTemperature(weatherData.main.feels_like).toFixed(1)}°
                {isC ? "C" : "F"}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setIsC(!isC)}
            >
              <Text style={styles.toggleText}>{isC ? "°C" : "°F"}</Text>
            </TouchableOpacity>
            <ScrollView horizontal style={styles.hourlyForecast}>
              {hourlyData.slice(0, 6).map((item, index) => {
                const hour = new Date(item.dt * 1000).getHours();
                const temp = convertTemperature(item.main.temp);
                return (
                  <View key={index} style={styles.hourlyItem}>
                    <Text style={styles.hourlyTime}>{hour}:00</Text>
                    <Text style={styles.hourlyTemp}>
                      {temp.toFixed(1)}°{isC ? "C" : "F"}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    padding: 12,
    color: "white",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
    textAlign: "center",
    fontSize: 16,
  },
  city: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  weatherInfo: {
    alignItems: "center",
  },
  temperature: {
    fontSize: 72,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 24,
    color: "white",
    textTransform: "capitalize",
  },
  feelsLike: {
    fontSize: 18,
    color: "white",
  },
  toggleButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 20,
    alignSelf: "center",
  },
  toggleText: {
    color: "white",
    fontWeight: "bold",
  },
  hourlyForecast: {
    marginTop: 20,
  },
  hourlyItem: {
    alignItems: "center",
    marginRight: 20,
  },
  hourlyTime: {
    color: "white",
    fontSize: 16,
  },
  hourlyTemp: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingText: {
    color: "white",
    fontSize: 45,
    textAlign: "center",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Homepage;
