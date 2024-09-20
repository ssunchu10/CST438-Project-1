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
          <Stack.Screen
            name="index"
            options={{
              headerTitle: () => <Text style={styles.headerTitle}>Welcome User</Text>,
              headerStyle: { backgroundColor: 'white' },
              headerTintColor: '#000',
              headerRight: () => renderHeaderRight(),
            }}
          />
        
          <Stack.Screen
            name="homepage"
            options={{
              headerShown: false,
            }}
          />
          
          <Stack.Screen
            name="search"
            options={{
              headerTitle: () => <Text style={styles.headerTitle}>Welcome User</Text>,
              title: 'Search', 
              headerStyle: { backgroundColor: 'white' },
              headerTintColor: '#000',
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
