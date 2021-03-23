import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';
import { endActivity, current, getInfo } from '../services/activity';


function DuringActivity({ navigation }) {
    const [activityID, setActivityID] = useState("");

    useEffect(()=>{
        current().then(json => {
            //after current activity id is fetched, update page
            setActivityID(json["id"]);
        })

    })

    console.log("EndActivity ID: " + activityID);

    /**
     * End current activity
     */
    function end() {
        if (activityID === null){
            console.log('------No activity in progress--------');
            navigation.navigate("Start Activity");
        } else {
            console.log('Ending activity ' + activityID);
            endActivity(activityID, 0, 0, 0);
            navigation.navigate("After Activity", {id: activityID})
        }

    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Trip is in progess</Text>
            <Button title="end trip" onPress={() => end()}></Button>
        </View>
    );
};


export default DuringActivity