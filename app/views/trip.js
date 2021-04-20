import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';
import { startActivity, endActivity } from '../services/trip';
import { current, updateLocation } from '../services/trip';



function StartActivity({ navigation }) {

    const [activityID, setActivityID] = useState(null);

    useEffect(() => {
        current().then(json => {
            //after user info is fetched, update page
            console.log('checks if trip is ongoing...');
            setActivityID(json["tripId"]);
            console.log('current trip ongoing: ', json['ongoing']);
            console.log('trip id: ', activityID); //.substring(0,8));
        })
    }, [])
    /**
     * end a ongoing trip and move to post trip view
     */
    function end() {
        if (!activityID) {
            console.error('No trip to end!');
        } else {
            console.log('Ending activity ' + activityID); //.substring(0,8));
            endActivity(activityID, 0, 0, 0);
            //TODO: potential error in ending activity
            setActivityID(null);
            navigation.navigate("After Activity", { id: activityID })
        }

    }
    /**
     * Starts a trip and update state
     */
    async function start() {
        if (activityID) {
            console.error('An activity is already in progress, cant start trip');
            return;
        }
        console.log('starting a new trip');
        json = await startActivity(0, 0, 0)
        console.log('started a trip with id ', json['id']);
        currentJson = await current()
        //after current activity id is fetched, update page
        setActivityID(json["id"])
    }

    if (activityID) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Trip is in progess</Text>
                { activityID !== null ? <Button title="end trip" onPress={() => end()}></Button> :
                    <Text>LOADING</Text>
                }
                <Button title="send coor" onPress={()=> updateLocation()} />
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