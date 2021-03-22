import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react/cjs/react.development";
import { me } from '../services/account';
import { current } from '../services/activity';


function HomeScreen({ navigation }) {
    
    const [user, setUser] = useState("");
    const [activity, setActivity] = useState("");

    useEffect(()=>{
        me().then(json => {
            //after user info is fetched, update page
            setUser(json['username']);
        })
        current().then(json => {
            //after user info is fetched, update page
            setActivity(json["id"]);
        })
    })


    /**
     * Send request to start trip page
     */
    function startActivity() {
        if (activity !== null){
            console.log('An activity is already in progress');
            navigation.navigate("During Activity");
        } else {
            console.log('moving to start activity');
            navigation.navigate("Start Activity");
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{user}</Text>
            <Button title="Activity" onPress={() => startActivity()}></Button>
        </View>
    )
}

export default HomeScreen