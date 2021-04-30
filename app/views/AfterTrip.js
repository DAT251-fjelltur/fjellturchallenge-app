
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
import { getDistance, getDuration, getScore } from '../services/trip';
import { convertSeconds } from '../services/utils';

function AfterTrip({ route, navigation }) {
    //get trip id from previous page
    const { tripId, markers } = route.params;

    const [duration, setDuration] = useState("");
    const [distance, setDistance] = useState("");
    const [score, setScore] = useState(0);

    useEffect(() => {
        getDistance(tripId).then(value => {
            setDistance(value);
        });
        getDuration(tripId).then(value => {
            setDuration(value);
        });
        getScore(tripId).then(value => {
            setScore(value);
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
            <Text>Score: {score} points</Text>
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