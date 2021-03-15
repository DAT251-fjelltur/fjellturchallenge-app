import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';

function SignUp({ navigation }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function createUser() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "username": username,
            "password": password
        })

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://fjellturchallenge-backend-dev.herokuapp.com/api/v1/accounts/register", requestOptions)
            .then(result => {
                if (result.status === 200) {
                    console.log('Success')
                    navigation.navigate("Sign In")
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Username</Text>
            <TextInput placeholder="Username" onChangeText={user => setUsername(user)}></TextInput>
            <Text>Password</Text>
            <TextInput secureTextEntry={true} placeholder="Password" onChangeText={pass => setPassword(pass)} ></TextInput>
            <Button title="REGISTER" onPress={() => createUser()}></Button>
            <Text>Already have an account? </Text>
            <Text onPress={() => navigation.navigate("Sign In")}>Sign in here</Text>
        </View>
    );
};

export default SignUp