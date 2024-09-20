import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Login2 = ({ onLoginSuccess }) => {
  const handleLogin = () => {
    // Simulate a successful login
    const userInfo = { name: 'Test User' }; // Mock user info
    onLoginSuccess(userInfo);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Login2;
