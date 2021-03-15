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




function SignIn({ navigation }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState("")

    const getToken = async () => {
        try {
            const tok = await AsyncStorage.getItem('@jwt')
            if (tok !== null) {
                console.log("Setting token")
                setToken(tok)
            }
        } catch (e) {
            console.log('Failed to fetch the data from storage ', e)
        }
    }

    /**
     * Send request to sign in user and move to homescreen if login is successful
     * @param {} username 
     * @param {*} password 
     */
    function signInButton(username, password) {
        signInUser(username, password);
        getToken()
        if (token) {
            console.log('moving to home');
            navigation.navigate("Home Screen")
        }
        else {
            console.log("Token is not set " + token)
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Username</Text>
            <TextInput placeholder="Username" onChangeText={user => setUsername(user)}></TextInput>
            <Text>Password</Text>
            <TextInput secureTextEntry={true} placeholder="Password" onChangeText={pass => setPassword(pass)} ></TextInput>
            <Button title="Sign In" onPress={() => signInButton(username, password)}></Button>
        </View>
    );
};

export default SignIn