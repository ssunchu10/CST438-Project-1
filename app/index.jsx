import { StyleSheet, ImageBackground, Button, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import App from "./App";
import BackgroundWrapper from './components/Background'; // Adjust the path as needed


export default function Index() {
  return (
    <Provider store={store}>
      <BackgroundWrapper>
        <App />
      </BackgroundWrapper> 

      
    </Provider>
    
  );
}

