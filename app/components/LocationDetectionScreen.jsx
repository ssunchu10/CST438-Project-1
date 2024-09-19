// LocationDetectionScreen.jsx
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { View, Text, StyleSheet } from 'react-native';

const LocationDetectionScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      setIsLoading(true);

      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setIsLoading(false);
        return;
      }

      try {
        // Get current location
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        setIsLoading(false);

        // Navigate to homepage with detected coordinates
        navigation.navigate('HomePage', {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude
        });
      } catch (error) {
        setErrorMsg('Error fetching location');
        setIsLoading(false);
      }
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Detecting your location...</Text>
      ) : errorMsg ? (
        <Text>{errorMsg}</Text>
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
});

export default LocationDetectionScreen;
