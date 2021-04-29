import React, { useState, useEffect } from 'react';
import MapView, { Polyline, Marker, Polygon } from 'react-native-maps';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ActivityIndicator,
    Button,
    TouchableOpacity
} from 'react-native';
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: "100%",
        // justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export function ActiveMap(props) {
    return (
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
                    coordinates={props.markers}
                    strokeColor="#0aa"
                    strokeWidth={6}
                />

                {props.markers.length > 0 ?
                    <Marker
                        key={1}
                        coordinate={props.markers[props.markers.length - 1]}
                    />
                    :
                    <View />
                }{props.markers.length > 1 ?
                    <Marker
                        key={0}
                        coordinate={props.markers[0]}
                    />
                    :
                    <View />
                }
            </MapView>
        </View>);
}