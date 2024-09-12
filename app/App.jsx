import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Login from "./components/login";
import Search from "./components/search";
import { useRouter } from "expo-router";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const goToHomePage = () => {
    router.push("/homepage");
  };

  const handleLoginSuccess = (userInfo) => {
    setIsLoggedIn(true);
    console.log("User Info:", userInfo);
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Button title="Go to Home Page" onPress={goToHomePage} />
      )}
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Search/>
      )}
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
