import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext'

function SignUp({ navigation }) {
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { state, signup } = useContext(AuthContext);


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Username</Text>
            <TextInput placeholder="Username" onChangeText={user => setUsername(user)}></TextInput>
            <Text>Password</Text>
            <TextInput secureTextEntry={true} placeholder="Password" onChangeText={pass => setPassword(pass)} ></TextInput>
            <Button title="REGISTER" onPress={() => { signup({ userName, password, navigation }) }}></Button>
            <Text>Already have an account? </Text>
            <Text onPress={() => navigation.navigate("Sign In")}>Sign in here</Text>
        </View>
    );
};

export default SignUp