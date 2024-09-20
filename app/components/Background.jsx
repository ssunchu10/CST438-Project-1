import React from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';

const Background = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assetss/background.jpg')}
        style={styles.backgroundImage}
      >
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default Background;
