import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import { general } from '../assets/styles'


function Loading() {
    return (
        <View style={general.center}>
            <Text>LOADING...</Text>
        </View>
    )
}

export default Loading