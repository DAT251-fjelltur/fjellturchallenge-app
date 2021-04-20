/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';


import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Button
} from 'react-native';

import SignUp from "./app/views/SignUp"
import trip from './app/views/trip'
import SignIn from "./app/views/SignIn"
import HomeScreen from "./app/views/HomeScreen"
import AfterActivity from "./app/views/AfterActivity"
import { Provider as AuthProvider } from './app/context/AuthContext.js';
import { Context as AuthContext } from './app/context/AuthContext';
import Loading from './app/components/Loading'
import Leaderboard from './app/views/Leaderboard';
//import { color } from 'react-native-reanimated';

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

function TripStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false}} >
      <Stack.Screen name="Trip" component={trip} />
      <Stack.Screen name="After Activity" component={AfterActivity} />
    </Stack.Navigator>
  )
}

function App() {
  const { state } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerStyle={{
        backgroundColor: "#FFC24B", color: "white"
      }} 
        drawerContentOptions={{
          activeTintColor: "white",
          inactiveTintColor: "white"
      }}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#FFC24B",
          color: "white"
        },
        headerTintColor: "white"
      }}
      >
        {state.token === null ?
          <>
            <Drawer.Screen name="Sign Up" component={SignUp} />
            <Drawer.Screen name="Sign In" component={SignIn} />
          </>
          :
          <>
            <Drawer.Screen name="Home Screen" component={HomeScreen} />
            <Drawer.Screen name="Trip" component={TripStack} />
            <Drawer.Screen name="Leaderboard" component={Leaderboard} />

          </>
        }
      </Drawer.Navigator>
    </NavigationContainer>
  );
};



export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
