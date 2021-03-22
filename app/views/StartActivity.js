import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';
import { startActivity } from '../services/activity';
import { current } from '../services/activity';



function StartActivity({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    var token = '';

    const [activity, setActivity] = useState("");

    useEffect(()=>{
        current().then(json => {
            //after user info is fetched, update page
            setActivity(json["id"]);
        })
    })


    /**
     * Starts a trip
     */
    function start() {
        console.log("Activity: " + activity);
        if (activity !== null){
            console.log('An activity is already in progress');
            navigation.navigate("During Activity");
        } else {
            console.log('starting activity');
            startActivity(0, 0, 0);
            navigation.navigate("During Activity")
        }


    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Here you can start your activity</Text>
            <Button title="start" onPress={() => start()}></Button>
        </View>
    );
};

export default StartActivity