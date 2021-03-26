/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

import SignUp from "./app/views/SignUp"
import trip from './app/views/trip'
import SignIn from "./app/views/SignIn"
import HomeScreen from "./app/views/HomeScreen"
import AfterActivity from "./app/views/AfterActivity"
import { Provider as AuthProvider } from './app/context/AuthContext.js';
import { Context as AuthContext } from './app/context/AuthContext';

const Stack = createStackNavigator()


function App() {
  const { state } = useContext(AuthContext);

  useEffect(() => {
    console.log("TOKEN: ", state.token)
  }, [state.token])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.token === null ?
          <>
            <Stack.Screen name="Sign Up" component={SignUp} />
            <Stack.Screen name="Sign In" component={SignIn} />
          </>
          :
          <>
            <Stack.Screen name="Home Screen" component={HomeScreen} />
            <Stack.Screen name="Trip" component={trip} />
            <Stack.Screen name="After Activity" component={AfterActivity} />
          </>
        }


      </Stack.Navigator>
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
