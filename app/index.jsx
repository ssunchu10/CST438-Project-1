import { StyleSheet, ImageBackground, View } from "react-native";
import App from "./App";


export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/background.jpg')}
        style={styles.backgroundImage}
      >
        <App/>        
      </ImageBackground>  
    </View>
  );
}

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