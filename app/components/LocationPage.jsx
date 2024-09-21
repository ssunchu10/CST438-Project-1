// LocationPage.jsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { getLocationNameFromCoords } from '../API/api.jsx';

const LocationPage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);  // Show loading spinner

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied. Please enable location permissions in settings.');
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const locationData = await getLocationNameFromCoords(latitude, longitude); // Fetch location name
        if (locationData) {
          const locationName = locationData.name;
          navigation.navigate('HomePage', { locationName });
        } else {
          setErrorMsg('Unable to fetch location name. Please check your connection or try again later.');
        }
      } catch (error) {
        setErrorMsg('Error fetching location: ' + error.message + '. Ensure that location services are enabled in your device settings.');
      }

      setLoading(false);  // Hide loading spinner
    })();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Detecting your location...</Text>
        </>
      ) : errorMsg ? (
        <>
          <Text style={styles.error}>{errorMsg}</Text>
          <Button title="Retry" onPress={() => setLoading(true)} />
        </>
      ) : (
        <Text>Location detected!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default LocationPage;