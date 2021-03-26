import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInUser } from '../services/account';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { getToken } from '../services/utils';
import { Context as AuthContext } from '../context/AuthContext'


function SignIn({ navigation }) {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { state, signin } = useContext(AuthContext);


    /**
     * Send request to sign in user and move to homescreen if login is successful
     * @param {} username 
     * @param {*} password 
     */

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Username</Text>
            <TextInput placeholder="Username" onChangeText={setUsername}></TextInput>
            <Text>Password</Text>
            <TextInput secureTextEntry={true} placeholder="Password" onChangeText={setPassword} ></TextInput>
            <Button title="Sign In" onPress={() => { signin({ userName, password }) }}></Button>
        </View>
    );
};

export default SignIn