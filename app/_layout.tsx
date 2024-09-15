import { Stack } from "expo-router";
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Menu, Provider } from 'react-native-paper';

export default function RootLayout() {

  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Provider>
      <Stack>
       
        <Stack.Screen
          name="index"
          options={{
            title: "Weather",
          }}
        />

        
        <Stack.Screen
          name="homepage"
          options={{
            headerTitle: () => <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome User</Text>,
            headerStyle: { backgroundColor: 'white' },
            headerTintColor: '#fff',
            headerRight: () => (
              <View style={styles.headerIcons}>

                <TouchableOpacity onPress={() => alert('Search')}>
                  <AntDesign name="search1" size={20} color="black" style={styles.headerIcon} />
                </TouchableOpacity>

                <Menu
                  visible={menuVisible}
                  onDismiss={closeMenu}
                  anchor={
                    <TouchableOpacity onPress={openMenu}>
                      <AntDesign name="user" size={20} color="black" style={styles.headerIcon} />
                    </TouchableOpacity>
                  }>
                  <Menu.Item onPress={() => {}} title="View Profile" />
                  <Menu.Item onPress={() => {}} title="Settings" />
                  <Menu.Item onPress={() => {}} title="Logout" />
                </Menu>

              </View>
            ),
          }}
        />
      </Stack>
    </Provider>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
