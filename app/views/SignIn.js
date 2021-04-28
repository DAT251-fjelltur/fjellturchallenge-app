import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ActivityIndicator,
    Button,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInUser } from '../services/account';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { getToken } from '../services/utils';
import { Context as AuthContext } from '../context/AuthContext'
import Loading from '../components/Loading'
import { button, general } from '../assets/styles'

function SignIn({ navigation }) {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { state, signin } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    /**
     * Send request to sign in user and move to homescreen if login is successful
     * @param {} username 
     * @param {*} password 
     */

    return (
        <>
            {loading ?
                <Loading></Loading>
                :
                <View style={general.center}>
                    <Text>Username</Text>
                    <TextInput placeholder="Username" onChangeText={setUsername}></TextInput>
                    <Text>Password</Text>
                    <TextInput secureTextEntry={true} placeholder="Password" onChangeText={setPassword} ></TextInput>
                    <View style={{ marginBottom: 10 }}>
                        {error && <Text style={{ color: "red" }}>{error}</Text>}
                    </View>
                    <TouchableOpacity style={button.primaryButton} onPress={() => { signin({ userName, password, setLoading, setError }) }} >
                        <Text >Sign In</Text>
                    </TouchableOpacity>
                </View>
            }
        </>
    );
};

export default SignIn