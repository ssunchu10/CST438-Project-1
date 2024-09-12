import { StyleSheet, ImageBackground, Button, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import App from "./App";

export default function Index() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <ImageBackground
          source={require('./assets/background.jpg')}
          style={styles.backgroundImage}
        >
          <App/>        
        </ImageBackground>  
      </View>
    </Provider>
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

