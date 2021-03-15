import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button
} from 'react-native';
import { signUpOrIn } from "../services/apiCalls"

function SignIn() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Username</Text>
            <TextInput placeholder="Username" onChangeText={user => setUsername(user)}></TextInput>
            <Text>Password</Text>
            <TextInput secureTextEntry={true} placeholder="Password" onChangeText={pass => setPassword(pass)} ></TextInput>
            <Button title="Sign In" onPress={() => signUpOrIn("login", username, password)}></Button>
        </View>
    );
};

export default SignIn