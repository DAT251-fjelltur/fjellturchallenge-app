
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';
import { endActivity } from '../services/trip';
import { current } from '../services/trip';



function AfterActivity({ route, navigation }) {
    //get activity id from previous page
    const { activity } = route.params;
    console.log(activity);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Activity is finished, id {activity}</Text>
            <Button title="go to home" onPress={() => {
                navigation.pop()
                navigation.navigate('Home Screen')
            }}></Button>
        </View>
    );
};

export default AfterActivity