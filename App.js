/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
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
import { getToken } from "./app/services/utils"

const Stack = createStackNavigator()


function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    getToken().then(result => {
      if (result) {
        setLoggedIn(true)
      }
    })
  }, [])
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!loggedIn ?
          <>
            <Stack.Screen name="Sign Up" component={SignUp} />
            <Stack.Screen name="Sign In" component={SignIn} initialParams={{ setLoggedIn: setLoggedIn }} />
          </>
          :
          <>
            <Stack.Screen name="Home Screen" component={HomeScreen} initialParams={{ setLoggedIn: setLoggedIn }} />
            <Stack.Screen name="Trip" component={trip} />
            <Stack.Screen name="After Activity" component={AfterActivity} />
          </>
        }


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
