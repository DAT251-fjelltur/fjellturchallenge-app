import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';
import {createUser} from '../services/account';

function SignUp({ navigation }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Username</Text>
            <TextInput placeholder="Username" onChangeText={user => setUsername(user)}></TextInput>
            <Text>Password</Text>
            <TextInput secureTextEntry={true} placeholder="Password" onChangeText={pass => setPassword(pass)} ></TextInput>
            <Button title="REGISTER" onPress={() => createUser(username, password)}></Button>
            <Text>Already have an account? </Text>
            <Text onPress={() => navigation.navigate("Sign In")}>Sign in here</Text>
        </View>
    );
};

export default SignUp