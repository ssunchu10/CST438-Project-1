import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Login2 from "./components/login2";
import Search from "./components/search";
import HomePage from "./components/homepage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = (userInfo) => {
    setIsLoggedIn(true);
    console.log("User Info:", userInfo);
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn ? <Login2 onLoginSuccess={handleLoginSuccess} /> : <HomePage />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
