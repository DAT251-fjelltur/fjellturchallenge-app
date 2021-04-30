import { getIsDrawerOpenFromState } from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity
} from 'react-native';
import { startTrip, endTrip } from '../services/trip';
import { current, updateLocation, getDistance, getDuration, getScore } from '../services/trip';
import MapView, { Polyline, Marker, Polygon } from 'react-native-maps';
import { tekst,button } from '../assets/styles'
import { convertSeconds } from '../services/utils';
import {ActiveMap, map} from '../components/ActiveMap';

function trip({ navigation }) {

    const [tripID, setTripID] = useState(null);
    const [duration, setDuration] = useState("");
    const [score, setScore] = useState(0);
    const [distance, setDistance] = useState("");
    const [markers, setMarkers] = useState([]);

    //function to run every 5s
    const MINUTE_MS = 5000;
    useEffect(() => {
        const interval = setInterval(() => {
            update();
        }, MINUTE_MS);
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [tripID])

    //update if trip is ongoing on page load
    useEffect(() => {
        current().then(json => {
            //after user info is fetched, update page
            // console.log('checks if trip is ongoing...');
            setTripID(json["tripId"]);
            console.log('current trip ongoing: ', json['ongoing']);
            // console.log('trip id: ', tripID.substring(0,6)); //
        })
    }, [])

    /**
     * send frequent requests to update position and update trip info
     */
    function update() {
        if (tripID != null) {
            // console.log('send repeating request');
            updateLocation();
            getDistance(tripID).then(value => {
                setDistance(value);
            });
            getScore(tripID).then(value => {
                setScore(value);
            });
            getDuration(tripID).then(value => {
                setDuration(value);
            });
            //update the map markers
            current().then(json => {
                console.log('updates markers');
                locationsinfo = json['locations'];
                longlat = []
                locationsinfo.forEach(info => {
                    pos = { longitude: info['longitude'], latitude: info['latitude'] };
                    longlat.push(pos)
                });
                // longlat.shift(); to remove first buggy pos
                // console.log('recieved coors:', longlat);
                setMarkers(longlat);
                // setMarkers(markers.concat(longlat));
            })

        }
    }


    /**
     * end a ongoing trip and move to post trip view
     */
    function end() {
        if (!tripID) {
            console.error('No trip to end!');
        } else {
            console.log('Ending trip ' + tripID.substring(0, 6));
            endTrip();
            //TODO: handle potential error in ending trip
            setTripID(null);
            setDuration(0);
            setDistance(0);
            setMarkers([]);
            navigation.navigate("After Trip", { tripId: tripID, markers:markers })
        }

    }
    /**
     * Starts a trip and update state
     */
    async function start() {
        if (tripID) {
            console.error('A trip is already in progress, cant start trip');
            return;
        }
        console.log('starting a new trip');
        startTrip(setTripID).then(val => {
            current().then(json => {
                //after user info is fetched, update page
                setTripID(json["tripId"]);
            });
        });
    }

    if (tripID) {
        //if trip has started, show 'end trip' and trip info
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                <ActiveMap
                    markers={markers}
                />

                { tripID !== null ?
                    <TouchableOpacity style={button.primaryButton} onPress={() => end()} >
                        <Text >End trip</Text>
                    </TouchableOpacity> :
                    <Text>LOADING</Text>
                }
                <Text style={tekst.textbox}>Duration: {convertSeconds(duration)}</Text>
                <Text style={tekst.textbox}>Score: {score}</Text>
                <Text style={tekst.textbox}>Distance: {distance/1000} km</Text>
            </View>
        );
    }
    else {
        //if trip has not started, show 'start trip' page
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Here you can start your trip</Text>
                <TouchableOpacity style={button.primaryButton} onPress={() => start()} >
                    <Text >Start trip</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

export default trip