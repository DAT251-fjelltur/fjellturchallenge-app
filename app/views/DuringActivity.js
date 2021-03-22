import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';
import { endActivity } from '../services/activity';
import { current } from '../services/activity';



function DuringActivity({ navigation }) {
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
     * End current activity
     */
    function end() {
        console.log("Activity: " + activity);
        if (activity === null){
            console.log('No activity in progress');
            navigation.navigate("Start Activity");
        } else {
            console.log('Ending activity ' + activity);
            endActivity(activity, 0, 0, 0);
            navigation.navigate("During Activity")
        }

    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Here you can stop your activity</Text>
            <Button title="end" onPress={() => end()}></Button>
        </View>
    );
};

export default DuringActivity