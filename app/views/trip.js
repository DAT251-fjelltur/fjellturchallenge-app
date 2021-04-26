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
import { startTrip, endActivity } from '../services/trip';
import { current, updateLocation, getDistance, getDuration } from '../services/trip';
import MapView, { Polyline, Marker, Polygon } from 'react-native-maps';
import { button } from '../assets/styles'
import { convertSeconds } from '../services/utils';

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
            getDuration(tripID).then(value => {
                setDuration(value);
            });
            //update the map markers
            current().then(json => {
                console.log('updates markers');
                console.log(json);
                locationsinfo = json['locations'];
                longlat = []
                locationsinfo.forEach(info => {
                    pos = { longitude: info['longitude'], latitude: info['latitude'] };
                    longlat.push(pos)
                });
                // longlat.shift(); to remove first buggy pos
                console.log('recieved coors:', longlat);
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
            console.log('Ending activity ' + tripID.substring(0, 6));
            endActivity(tripID, 0, 0, 0);
            //TODO: handle potential error in ending activity
            setTripID(null);
            setDuration(0);
            setDistance(0);
            setMarkers([]);
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
        startTrip(setTripID).then(val => {
            current().then(json => {
                //after user info is fetched, update page
                setTripID(json["tripId"]);
            });
        });
    }

    if (tripID) {
        //if activity has started, show 'end trip' and trip info
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.container}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            //TODO sett region automatisk
                            latitude: 60.3913,
                            longitude: 5.3221,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Polyline
                            coordinates={markers}
                            strokeColor="#0aa"
                            strokeWidth={6}
                        />

                        {markers.length > 0 ?
                            <Marker
                                key={1}
                                coordinate={markers[markers.length - 1]}
                            />
                            :
                            <View />
                        }{markers.length > 1 ?
                            <Marker
                                key={0}
                                coordinate={markers[0]}
                            />
                            :
                            <View />
                        }

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