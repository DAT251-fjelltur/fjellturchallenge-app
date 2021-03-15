import { View, Text } from "react-native";
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function getToken() {
    console.log(AsyncStorage.getItem('@jwt').then(v => v));
    
}

function HomeScreen() {
    return (
        <View>
            <Text>{getToken()}</Text>
        </View>
    )
}

export default HomeScreen