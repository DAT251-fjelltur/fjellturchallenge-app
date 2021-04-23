
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
} from 'react-native';
import { endActivity } from '../services/trip';
import { current } from '../services/trip';
import { button } from '../assets/styles'



function AfterTrip({ route, navigation }) {
    //get trip id from previous page
    const { trip } = route.params;
    console.log(trip);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Trip is finished, id {trip}</Text>
            <TouchableOpacity style={button.primaryButton} onPress={() => {
                navigation.pop()
                navigation.navigate('Home Screen')
            }} >
                <Text >Go to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AfterTrip