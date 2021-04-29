
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
} from 'react-native';
import { Marker } from 'react-native-maps';
import { button } from '../assets/styles'
import { ActiveMap } from '../components/ActiveMap';
import { getDistance, getDuration } from '../services/trip';
import { convertSeconds } from '../services/utils';

function AfterTrip({ route, navigation }) {
    //get trip id from previous page
    const { tripId, markers } = route.params;

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

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
            <ActiveMap
                markers={markers}
            />
            <Text>Trip is finished</Text>
            <Text>Duration: {convertSeconds(duration)}</Text>
            <Text>Distance: {distance / 1000} km</Text>
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