import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';
import React, { Component } from 'react';
import { useState, useEffect, useContext } from "react/cjs/react.development";
import { me } from '../services/account';
import { current } from '../services/activity';
import {Context as AuthContext} from '../context/AuthContext'


function HomeScreen({ navigation }) {
    const {state, signout} = useContext(AuthContext);
    const [activityID, setActivityID] = useState("");


    useEffect(()=>{
        current().then(json => {
            //after user info is fetched, update page
            setActivityID(json["tripId"]);
        })
    }, [])


    /**
     * go to ongoing activity or start a new activity 
     */
    function startActivity() {
        navigation.navigate('Trip')
        return;
        if (activityID !== null){
            //console.log('An activity is already in progress');
            navigation.navigate("During Activity");
        } else {
            //console.log('moving to start activity');
            navigation.navigate("Start Activity");
        }
    }


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>logged in as {state.userName}</Text>
            <Button title="start new or continue trip" onPress={() => startActivity()}></Button>
            <Button title="LOG OUT" onPress={() => signout()}></Button>
        </View>
    )
}

export default HomeScreen