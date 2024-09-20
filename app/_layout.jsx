import { Stack } from 'expo-router';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Menu, Provider } from 'react-native-paper';
import { useRouter } from "expo-router";
import { Provider as ReduxProvider } from 'react-redux';
import store from '../app/Redux/store'; // Adjust this import based on your store location

export default function RootLayout() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // Header layout for the HomePage, with search icon and menu
  const renderHeaderRight = () => (
    <View style={styles.headerIcons}>
      <TouchableOpacity onPress={() => router.push('./components/search')}>
        <AntDesign name="search1" size={20} color="black" style={styles.headerIcon} />
      </TouchableOpacity>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <AntDesign name="user" size={20} color="black" style={styles.headerIcon} />
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={() => {}} title="View Profile" />
        <Menu.Item onPress={() => {}} title="Settings" />
        <Menu.Item onPress={() => {}} title="Logout" />
      </Menu>
    </View>
  );

  return (
    <ReduxProvider store={store}>
      <Provider>
        <Stack>
          {/* Login Page with "Weather" as the title */}
          <Stack.Screen
            name="components/login2"
            options={{
              headerTitle: () => <Text style={styles.headerTitle}>Weather</Text>,
              headerStyle: { backgroundColor: 'white' },
              headerTintColor: '#000',
              headerRight: null,  // No icons for the login page
            }}
          />

          {/* HomePage with the custom header bar */}
          <Stack.Screen
            name="index"  // Assuming this is your HomePage
            options={{
              headerTitle: () => <Text style={styles.headerTitle}>Welcome User</Text>,
              headerStyle: { backgroundColor: 'white' },
              headerTintColor: '#000',
              headerRight: () => renderHeaderRight(),  // Show the search icon and menu here
            }}
          />

          {/* Search Page with "Search" as the title */}
          <Stack.Screen
            name="components/search"
            options={{
              headerTitle: () => <Text style={styles.headerTitle}>Search</Text>,
              headerStyle: { backgroundColor: 'white' },
              headerTintColor: '#000',
              headerRight: null,  // No icons for the search page
            }}
          />
        </Stack>
      </Provider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  headerIcon: {
    marginLeft: 15,
  },
});
