import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Login from "./components/login";
import Search from "./components/search";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = (userInfo) => {
    setIsLoggedIn(true);
    console.log("User Info:", userInfo);
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn ? <Login onLoginSuccess={handleLoginSuccess} /> : <Search />}
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
