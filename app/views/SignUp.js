import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput
} from 'react-native';
import { Button } from '../components/styledComponents'
import { signUpOrIn } from "../services/apiCalls"

function SignUp({ navigation }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Username</Text>
            <TextInput placeholder="Username" onChangeText={user => setUsername(user)}></TextInput>
            <Text>Password</Text>
            <TextInput secureTextEntry={true} placeholder="Password" onChangeText={pass => setPassword(pass)} ></TextInput>
            <Button onPress={() => signUpOrIn("register", username, password)}>
                <Text>Register</Text>
            </Button>
            <Text>Already have an account? </Text>
            <Text onPress={() => navigation.navigate("Sign In")}>Sign in here</Text>
        </View>
    );
};

export default SignUp