import React, { useState, useEffect } from 'react';
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
import {getToken} from '../services/utils';



function SignIn({ route, navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    var token = '';
    const { setLoggedIn } = route.params


    /**
     * Send request to sign in user and move to homescreen if login is successful
     * @param {} username 
     * @param {*} password 
     */
    function signInButton(username, password, setLoggedIn) {
        signInUser(username, password, setLoggedIn);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Username</Text>
            <TextInput placeholder="Username" onChangeText={user => setUsername(user)}></TextInput>
            <Text>Password</Text>
            <TextInput secureTextEntry={true} placeholder="Password" onChangeText={pass => setPassword(pass)} ></TextInput>
            <Button title="Sign In" onPress={() => signInButton(username, password, setLoggedIn)}></Button>
        </View>
    );
};

export default SignIn