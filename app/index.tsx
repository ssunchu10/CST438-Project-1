import { Text, View, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  const goToHomePage = () => {
    router.push("/homepage");
  };

  return (
    <View style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="Go to Home Page" onPress={goToHomePage} />
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
