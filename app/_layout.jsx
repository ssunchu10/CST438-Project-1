import { Stack } from 'expo-router';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Menu } from 'react-native-paper';
import { useRouter } from "expo-router";
export default function RootLayout() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const renderHeaderRight = () => (
    <View style={styles.headerIcons}>
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
