import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SearchResults({ searchResults, iconUrl }) {
    console.log("searchResults: " + searchResults);
    if (!searchResults) {
        return <Text style={styles.header}>no search results found</Text>
    }

    return (
        <View style={styles.container}>
          <Text style={styles.header}>Weather Info:</Text>
          <Text>{`Location: ${searchResults.name}`}</Text>
          <Text>{`Temperature: ${searchResults.main.temp}°F`}</Text>
          {iconUrl && (
            <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
          )}
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    weatherIcon: {
      width: 50,
      height: 50,
      marginTop: 10,
    },
  });
  
