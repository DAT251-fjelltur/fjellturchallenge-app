import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';
import { startActivity, endActivity } from '../services/activity';
import { current } from '../services/activity';



function StartActivity({ navigation }) {

    const [activityID, setActivityID] = useState(null);

    useEffect(() => {
        current().then(json => {
            //after user info is fetched, update page
            console.log('checks if trip is ongoing...');
            setActivityID(json["tripId"]);
            console.log('current json', json);
            console.log('trip id is now ', activityID);
        })
    }, [])
    /**
     * end a ongoing trip
     */
    function end() {
        if (!activityID) {
            console.log('------No activity in progress--------');
            //navigation.navigate("Start Activity");
        } else {
            console.log('Ending activity ' + activityID);
            endActivity(activityID, 0, 0, 0);
            setActivityID(null);
            navigation.navigate("After Activity", { id: activityID })
        }

    }
    /**
     * Starts a trip
     */
    async function start() {
        if (activityID) {
            console.log('An activity is already in progress, cant start trip');
            return;
        }
        console.log('starting activity');
        json = await startActivity(0, 0, 0)

        console.log('activity ', json);
        currentJson = await current()
        //after current activity id is fetched, update page
        setActivityID(json["id"]);
        console.log('func start: id is now ', activityID);
    }

    if (activityID) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Trip is in progess</Text>
                { activityID !== null ? <Button title="end trip" onPress={() => end()}></Button> :
                    <Text>LOADING</Text>
                }
            </View>
        );
    }
    else {
        //if activity has not started, show 'start activity' page
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Here you can start your activity</Text>
                <Button title="start trip" onPress={() => start()}></Button>
            </View>
        );
    }
};

export default StartActivity