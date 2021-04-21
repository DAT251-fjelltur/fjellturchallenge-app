import { getIsDrawerOpenFromState } from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';
import { startActivity, endActivity } from '../services/trip';
import { current, updateLocation, getDuration} from '../services/trip';


function StartActivity({ navigation }) {

    const [tripID, setTripID] = useState(null);
    const [duration, setDuration] = useState("");
    
    //repeating API call to update trip info
    const MINUTE_MS = 5000;
    useEffect(() => {
        const interval = setInterval(() => {
            if (tripID != null){
                console.log('send repeating request');
                updateLocation();     //Er det en grunn til at vi ikke gjør dette?
                var duration = getDuration(tripID).then(value =>{
                    setDuration(value);
                });
            }
        }, MINUTE_MS);
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [tripID])

    useEffect(() => {
        current().then(json => {
            //after user info is fetched, update page
            console.log('checks if trip is ongoing...');
            setTripID(json["tripId"]);
            console.log('current trip ongoing: ', json['ongoing']);
            console.log('trip id: ', tripID); //.substring(0,8));
        })
    }, [])

    /**
     * convert seconds to h and min
     */
    function convertSeconds(s) {
        var h = Math.floor(s/3600);
        var s = s%36000;
        var min = Math.floor(s/60);
        var s = s%60;
        return h+"h, "+min+"min and "+s+"s";
    }

    /**
     * end a ongoing trip and move to post trip view
     */
    function end() {
        if (!tripID) {
            console.error('No trip to end!');
        } else {
            console.log('Ending activity ' + tripID); //.substring(0,8));
            endActivity(tripID, 0, 0, 0);
            //TODO: potential error in ending activity
            setTripID(null);
            setDuration(0);
            navigation.navigate("After Trip", { id: tripID })
        }

    }
    /**
     * Starts a trip and update state
     */
    async function start() {
        if (tripID) {
            console.error('An activity is already in progress, cant start trip');
            return;
        }
        console.log('starting a new trip');
        var json = await startActivity(0, 0, 0)
        console.log('started a trip with id ', json['id']);
        currentJson = await current()
        //after current activity id is fetched, update page
        setTripID(json["id"])
    }

    if (tripID) {
        //if activity has started, show 'end trip' and trip info
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Trip is in progess</Text>
                { tripID !== null ? <Button title="end trip" onPress={() => end()}></Button> :
                    <Text>LOADING</Text>
                }
                <Button title="send coor" onPress={() => updateLocation()} />
                <Text>Duration: {convertSeconds(duration)}</Text>
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