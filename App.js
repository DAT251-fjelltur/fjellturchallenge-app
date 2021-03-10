/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import HomeScreen from "./components/HomeScreen"


const Stack = createStackNavigator()

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="Home Screen" component={HomeScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
