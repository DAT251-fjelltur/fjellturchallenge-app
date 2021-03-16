import { View, Text } from "react-native";
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react/cjs/react.development";
import {me} from '../services/account';


function HomeScreen() {
    
    const [user, setUser] = useState("no name");

    useEffect(()=>{
        me().then(json => {
            //after info is fetched, update page
            setUser(json['username']);
        })
        console.log('set username to ',me().then(json => json['username']));
    })

    return (
        <View>
            <Text>{user}</Text>
        </View>
    )
}

export default HomeScreen