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
import { startActivity, endActivity } from '../services/trip';
import { current, updateLocation, getDistance, getDuration } from '../services/trip';
import { convertSeconds } from '../services/utils';
import MapView from 'react-native-maps';
import Marker from 'react-native-map';
import { button } from '../assets/styles'

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

function StartActivity({ navigation }) {

    const [tripID, setTripID] = useState(null);
    const [duration, setDuration] = useState("");
    const [distance, setDistance] = useState("");
    const [markers, setMarker] = useState([]);

    //function to run every 5s
    const MINUTE_MS = 10000;
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
            console.log('checks if trip is ongoing...');
            setTripID(json["tripId"]);
            console.log('current trip ongoing: ', json['ongoing']);
            console.log('trip id: ', tripID); //
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
            getDuration(tripID).then(value => {
                setDuration(value);
            });
        }
    }
    

    /**
     * end a ongoing trip and move to post trip view
     */
    function end() {
        if (!tripID) {
            console.error('No trip to end!');
        } else {
            console.log('Ending activity ' + tripID.substring(0, 6));
            endActivity(tripID, 0, 0, 0);
            //TODO: handle potential error in ending activity
            setTripID(null);
            setDuration(0);
            setDistance(0);
            navigation.navigate("After Trip", { tripId: tripID })
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
        //currentJson = await current()
        //after current activity id is fetched, update page
        setTripID(json["id"])
    }

    if (tripID) {
        //if activity has started, show 'end trip' and trip info
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 60.3913,
                            longitude: 5.3221,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {markers.map((marker, index) => (
                            <Marker
                                key={index}
                                coordinate={marker.latlng}
                                title={marker.title}
                                description={marker.description}
                            />
                        ))}
                    </MapView>
                </View>



                <Text>Trip is in progess</Text>
                { tripID !== null ?
                    <TouchableOpacity style={button.primaryButton} onPress={() => end()} >
                        <Text >End trip</Text>
                    </TouchableOpacity> :
                    <Text>LOADING</Text>
                }
                <Text>Duration: {convertSeconds(duration)}</Text>
                <Text>Distance: {distance}</Text>
            </View>
        );
    }
    else {
        //if activity has not started, show 'start activity' page
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Here you can start your activity</Text>
                <TouchableOpacity style={button.primaryButton} onPress={() => start()} >
                    <Text >Start trip</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

export default StartActivity