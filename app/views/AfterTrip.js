
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';
import { endActivity } from '../services/trip';
import { current } from '../services/trip';



function AfterTrip({ route, navigation }) {
    //get trip id from previous page
    const { trip } = route.params;
    console.log(trip);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Trip is finished, id {trip}</Text>
            <Button title="go to home" onPress={() => {
                navigation.pop()
                navigation.navigate('Home Screen')
            }}></Button>
        </View>
    );
};

export default AfterTrip