import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';

function SignIn({navigation}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function createUser() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": username,
            "password": password
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://fjellturchallenge-backend-dev.herokuapp.com/api/v1/accounts/login", requestOptions)
            .then(response => response.status)
            .then(result => {
                if (result === 200) {
                    navigation.navigate("Home Screen")
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Username</Text>
            <TextInput placeholder="Username" onChangeText={user => setUsername(user)}></TextInput>
            <Text>Password</Text>
            <TextInput secureTextEntry={true} placeholder="Password" onChangeText={pass => setPassword(pass)} ></TextInput>
            <Button title="Sign In" onPress={() => createUser()}></Button>
        </View>
    );
};

export default SignIn