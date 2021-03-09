import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';


function SignUp() {
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

        fetch("https://fjellturchallenge-backend-dev.herokuapp.com/api/v1/accounts/register", requestOptions)
            .then(response => response.status)
            .then(result => {
                if (result === 200) {
                    
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <View>
            <Text>Username</Text>
            <TextInput placeholder="Username" onChangeText={user => setUsername(user)}></TextInput>
            <Text>Password</Text>
            <TextInput secureTextEntry={true} placeholder="Password" onChangeText={pass => setPassword(pass)} ></TextInput>
            <Button title="REGISTER" onPress={() => createUser()}></Button>
        </View>
    );
};

export default SignUp