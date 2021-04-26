
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
} from 'react-native';
import { button } from '../assets/styles'
import { getDistance, getDuration } from '../services/trip';
import { convertSeconds } from '../services/utils';



function AfterTrip({ route, navigation }) {
    //get trip id from previous page
    const { tripId } = route.params;
    
    const [duration, setDuration] = useState("");
    const [distance, setDistance] = useState("");

    useEffect(() => {
        getDistance(tripId).then(value => {
            setDistance(value);
        });
        getDuration(tripId).then(value => {
            setDuration(value);
        });
    });
    

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Trip is finished, id {tripId}</Text>
            <Text>Duration: {convertSeconds(duration)}</Text>
            <Text>Distance: {distance}</Text>
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