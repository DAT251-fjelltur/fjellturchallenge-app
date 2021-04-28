import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity
} from 'react-native';
import React, { Component } from 'react';
import { useState, useEffect, useContext } from "react/cjs/react.development";
import { me } from '../services/account';
import { current } from '../services/trip';
import { Context as AuthContext } from '../context/AuthContext'
import { button, general } from '../assets/styles'


function HomeScreen({ navigation }) {
    const { state, signout } = useContext(AuthContext);
    const [tripID, setTripID] = useState("");


    useEffect(() => {
        current().then(json => {
            //after user info is fetched, update page
            setTripID(json["tripId"]);
        })
    }, [])


    /**
     * go to ongoing trip or start a new trip 
     */
    function startTrip() {
        navigation.navigate('Trip')
        return;
        // if (tripID !== null) {
        //     //console.log('An trip is already in progress');
        //     navigation.navigate("Trip");
        // } else {
        //     //console.log('moving to start trip');
        //     navigation.navigate("Trip");
        // }
    }


    return (
        <View style={general.center}>
            <Text>logged in as {state.userName}</Text>
            <TouchableOpacity style={button.secondaryButton} onPress={() => startTrip()} >
                <Text >Start new or continue trip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={button.primaryButton} onPress={() => signout()} >
                <Text >LOG OUT</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen